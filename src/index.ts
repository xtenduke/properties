import { ListingScraper } from "./scraper/ListingScraper";

const scraper = new ListingScraper();
scraper.start().then(() => {
  console.log("Done");
}).catch((error: any) => {
  console.error("An error occurred", error);
});
