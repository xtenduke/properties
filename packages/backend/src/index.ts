import { PropertiesController } from "./api/PropertiesApi";
import { ListingScraper } from "./scraper/ListingScraper";
import { ListingStorage } from "./storage/ListingStorage";

const storage = new ListingStorage(process.env.REDIS_URL ?? "redis://localhost:6379");
const api = new PropertiesController(storage, process.env.PORT as unknown as number ?? 3000);
api.start();

const scraper = new ListingScraper(storage);
scraper.start().then(() => {
  console.log("Done");
}).catch((error: any) => {
  console.error("An error occurred", error);
});