import express, {Express, Request, Response} from "express";

import { ListingStorage, StateSet } from "../storage/ListingStorage";
import { Property } from "../scraper/ListingScraper";

export interface BaseResponse<T> {
    data?: T,
    message: string;
}

// replace me with nest or something nicer
export class PropertiesController {
    constructor(private readonly storage: ListingStorage, private readonly port: number) {}

    public start() {
        const app: Express = express();
        app.get("/listing/:state", this.getListings);
        app.post("/listing/move", this.moveProperty);

        app.listen(this.port, () => {
            console.log(`api up on ${this.port}`);
        });
    }

    private static validateState(state: string): boolean {
        return !!state && Object.values(StateSet).findIndex((val) => val === state) !== -1;
    }

    public getListings = (async (request: Request, response: Response) => {
        const result: BaseResponse<Property[]> = {
            message: "something went wrong"
        };

        let code = 500;

        const state = request.params.state;

        if (!PropertiesController.validateState(state)) {
            result.message = "invalid value passed for state property - allowed values [properties:hidden, properties:new, properties:saved]";
            code = 400;
        } else {
            try {
                const properties = await this.storage.getListings(state as StateSet);
                code = 200;
                result.data = properties;
                result.message = "ok";
            } catch(e) {
                console.error("Get listings threw error", e);
            }
        }

        response.statusCode = code;
        response.json(result);
    });

    public moveProperty = (async (request: Request, response: Response) => {
        let code = 500;
        const result: BaseResponse<void> = {
            message: "something went wrong"
        };

        const propertyId: string = request.body.propertyId;
        const state = request.body.state;
        if (!propertyId || propertyId.length < 1 || !PropertiesController.validateState(state)) {
            code = 400;
            result.message = "Invalid post body, must fit: " + JSON.stringify({
                propertyId: "somepropertyid",
                state: "somevalue // one of [\"properties:hidden\", \"properties:new\", \"properties:saved\"]" 
            });
        } else {
            await this.storage.setListingState(propertyId, state);
            code = 200;
            result.message = "ok";
        }

        response.statusCode = code;
        response.json(result);
    });
}