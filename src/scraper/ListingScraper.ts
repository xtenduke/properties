import puppeteer, {Page} from "puppeteer";

interface Result {
  hasNextPage: boolean;
  properties: Property[];
}

interface Property {
  id: string;
  title: string;
  link: string;
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
        const link = "https://trademe.co.nz" + element.querySelector('a')?.getAttribute('href') ?? "unknown"
        const title = element.querySelector('tm-property-search-card-listing-title')?.textContent ?? "unknown";

        return {
          id: link,
          title: title,
          link: link,
        }
      })
    });

    return {
      hasNextPage,
      properties
    }
  }

  public async start(): Promise<void> {
    await this.scrape();
  }
}
