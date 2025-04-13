import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as cheerio from 'cheerio';
import { buildUrl, getFetchOptions, parseAddressAndPhone, regions, toNormalizedDate, toReadableRegion } from "../utils/scraper.utils";
import { IPharmacySchedule } from "../utils/types";
import { PharmacyScheduleManager } from "./pharmacy-manager.service";

@Injectable()
export class Scraper {

    constructor(
        private pharmacyScheduleManager: PharmacyScheduleManager
    ) { }

    private region: string;

    async scrape(region: string) {
        const url = buildUrl(region);
        const options = getFetchOptions();

        this.region = toReadableRegion(region);

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new InternalServerErrorException('FAILED TO SCRAPE PHARMACY FROM WEB SITE.');
            }
            return response.text();
        } catch (error) {
            console.error('Error fetching the data:', error);
            return null;
        }
    };

    async execute(region: string): Promise<IPharmacySchedule[]> {

        const pageHTML = await this.scrape(region);
        const HTMLTablesToParse = await this.getTablesToParseFromHTML(pageHTML);

        // Initialize an array to store the parsed data
        const pharmacies: IPharmacySchedule[] = [];

        for (const HTMLTableToParse of HTMLTablesToParse.tables) {

            const $ = cheerio.load(HTMLTableToParse);

            $('tbody tr').each((index, row) => {

                // Skip the header row
                if (index === 0) return;

                let address: string;
                let phone: string;

                const dateString = $(row).find('td').eq(0).text().trim();
                const dayOfWeek = $(row).find('td').eq(1).text().trim();
                const name = $(row).find('td').eq(2).text().trim();
                phone = $(row).find('td').eq(3).text().trim();

                const date = dateString ? toNormalizedDate(dateString) : null;

                if (region === 'praia') {
                    const { location, telephone } = parseAddressAndPhone(phone);
                    phone = telephone;
                    address = location;
                }

                pharmacies.push({
                    date,
                    dayOfWeek,
                    name,
                    phone,
                    address,
                    searchableRegion: region,
                    region: this.region
                });
            });

        };

        // this.pharmacyScheduleManager.register(pharmacies);

        return pharmacies;
    };

    async getTablesToParseFromHTML(html: string) {

        const $ = cheerio.load(html);
        const tables: string[] = [];

        // Select all <table> elements
        const htmlTablesSelector = $('table');

        // Log the selected tables (in this case, both <table> elements)
        htmlTablesSelector.each((index, element) => {
            if (index !== 0) tables.push($.html(element));
        });

        return { tables, totalTables: tables.length };
    };
};
