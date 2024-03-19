import * as redis from "redis";
import { Property } from "../scraper/ListingScraper";
import { performance } from "node:perf_hooks";

// such a painful type
type Redis = redis.RedisClientType<redis.RedisModules, redis.RedisFunctions, redis.RedisScripts>;

export enum StateSet {
  NEW = "properties:new",
  HIDDEN = "properties:hidden",
  SAVED = "properties:saved"
}

export class ListingStorage {
  constructor(private readonly redisUrl: string) {}

  private _client: Redis | undefined;

  async getClient(): Promise<Redis> {
    if (!this._client) {
      this._client = await redis.createClient({url: this.redisUrl })
      .on("error", err => console.error("Redis client had error", err))
      .connect(); 
    }

    return this._client!;
  }

  /**
   * 
   * @param property the property obj
   * @returns true if a new property is added to storage, else false
   */
  public async addListingIfNotExists(property: Property): Promise<boolean> {
    console.log("Trying to add listing");
    const client = await this.getClient();
    const key = this.getPropertyKey(property.id);
    if (await client.exists(key)) {
      return false;
    }

    await client.sAdd(StateSet.NEW, key);

    // @ts-ignore
    await client.set(key, JSON.stringify(property));
    console.log("Inserted property " + property.id, JSON.stringify(Object.entries(property)));
    return true;
  }

  // how does this work?
  // all properties are stored as hashes against their property id
  // the ids are stored in sets, one for each state: new, hidden, saved

  /**
   * Get listings for a state
   * @param state 
   */
  public async getListings(state: StateSet): Promise<Property[]> {
    const telemetryStart = performance.now();

    const client = await this.getClient();
    // docs say don't call this, not worried about perf here tbh
    const ids = await client.sMembers(state);
    // wow beautiful
    const properties = ((await client.mGet(ids)).filter((value) => value != undefined) as string[]).map((value) => JSON.parse(value) as Property);


    const telemetryEnd = performance.now();
    console.log(`FETCHTIME: Fetched ${properties.length} in ${telemetryEnd - telemetryStart}ms`);

    return properties;
  }

  public async setListingState(propertyId: string, state: StateSet): Promise<void> {
    const client = await this.getClient();
    const key = this.getPropertyKey(propertyId);
    if (await client.exists(key)) {
      throw new Error("Set state failed, property does not exist" + key)
    }

    let sourceSet = StateSet.NEW; // new is / should be default state
    if (await client.sIsMember(StateSet.HIDDEN, key)) {
      sourceSet = StateSet.HIDDEN;
    } else if (await client.sIsMember(StateSet.SAVED, key)) {
      sourceSet = StateSet.SAVED;
    }

    // if source is same as desired, do nothing
    if (sourceSet === state) {
      console.error("Not setting state on object, state set is same as desired" + JSON.stringify({key, sourceSet, state}));
      return;
    }

    // otherwise call smove
    // This will fail if the member isn't part of the new set
    await client.sMove(sourceSet, state, key);
  }

  private getPropertyKey(id: string): string {
    return `property:${id}`;
  }
}
