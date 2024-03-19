import { useEffect, useState } from "react";
import { api } from "../data/PropertiesApi";
import { Property } from "../data/model/Property";

export enum State {
  NEW,
  SAVED,
  HIDDEN
}

const useListings = (state: State) => {
  const [listings, setListings] = useState<Property[]>(undefined);

  useEffect(() => {
    const fetchListings = async () => {
      console.log("will fetch data");
      let data: Property[];

      switch (state) {
        case State.SAVED:
          data = (await api.getPropertiesSaved()).data;
        case State.HIDDEN:
          data = (await api.getPropertiesHidden()).data;
        case State.NEW:
        default:
          data = (await api.getPropertiesNew()).data;
      }

      console.log("fetched data " + data.length)
      setListings(data)
    };

    fetchListings().catch((error) => {
      console.error("Failed to fetch list", error);
    })

  }, [setListings]);

  return listings;
};

export default useListings;
