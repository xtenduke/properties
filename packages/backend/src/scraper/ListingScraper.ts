import puppeteer, {Page} from "puppeteer";
import { ListingStorage } from '../storage/ListingStorage';

interface Result {
  hasNextPage: boolean;
  properties: Property[];
}

export interface Property {
  id: string;
  title: string;
  link: string;
  subtitle: string;
  images: string[];
}

interface ScrapeConfig {
  maxPrice: number,
  bedroomsMax: number,
  bedroomsMin: number,
  bathroomsMin: number,
}

export const defaultConfig = {
  maxPrice: 1500000,
  bedroomsMax: 4,
  bedroomsMin: 3,
  bathroomsMin: 2
}

export class ListingScraper {
  constructor(private readonly storage: ListingStorage) {}

  private async scrape(config: ScrapeConfig = defaultConfig): Promise<Property[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const urlPrefix = "https://www.trademe.co.nz/a/property/residential/sale/auckland/north-shore-city/search";
    const params = `?price_max=${config.maxPrice}&bedrooms_max=${config.bedroomsMax}&bedrooms_min=${config.bedroomsMin}&bathrooms_min=${config.bathroomsMin}`;
    const url = urlPrefix + params;

    const properties: Property[] = [];
    let hasNext = true;
    let pageNum = 1;
    while(hasNext) {
      console.log(`Scraping page ${pageNum}`);
      const result = await this.scrapeResultsPage(`${url}&page=${pageNum}`, page);
      hasNext = result.hasNextPage;
      properties.concat(...result.properties);

      // insert
      await Promise.all(result.properties.map((property) => this.storage.addListingIfNotExists(property)));

      console.log(`Found ${result.properties.length} properties`);

      pageNum ++;
    }
    
    return properties;
  }

  private async scrapeResultsPage(url: string, page: Page): Promise<Result> {
    await page.goto(url);

    await page.setViewport({width: 1080, height: 1920});

    const hasNextPage = (await page.evaluate(() => {
      // @ts-ignore
      // ignore element not having outer text
      return Array.from(document.querySelectorAll('tg-pagination-link')).map((element) => element.outerText);
    })).find((value) => value === "next");

    const properties: Property[] = await page.evaluate(() => {
      // ignore first two non listing selectors
      return Array.from(document.querySelectorAll('tg-col')).map((element) => {
        const id = element.querySelector('a')?.getAttribute('href') ?? "unknown"
        const link = "https://trademe.co.nz" + id 
        const title = element.querySelector('tm-property-search-card-listing-title')?.textContent ?? "unknown";
        const subtitle = element.querySelector('tm-property-search-card-address-subtitle')?.textContent ?? "unknown";
        // first image is probably the agents image
        let images = Array.from(element.getElementsByTagName('img')).map((imgElement) => imgElement.currentSrc);
        if (images.length > 1) {
          images = images.slice(1);
        }

        return {
          id: link,
          title: title,
          link: link,
          subtitle,
          images
        }
      }).filter((element) => element.id !== "undefined");
    });

    return {
      hasNextPage,
      properties
    }
  }

  public async start(): Promise<void> {
    const properties = await this.scrape();
  }
}
