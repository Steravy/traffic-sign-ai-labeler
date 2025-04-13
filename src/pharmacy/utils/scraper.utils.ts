import { BadRequestException } from "@nestjs/common";
import { Region } from "./types";

const getFetchOptions = () => {
    return {
        method: 'GET',
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'cookie': '92cfb519a66901fcb5b12d1b4bbbfbc0=fc78c46d5a1423c00534712800d6e41f; _ga=GA1.1.684192448.1735594177; _ga_TXJSQSZL2E=GS1.1.1735594176.1.1.1735594334.0.0.0',
            'pragma': 'no-cache',
            'priority': 'u=0, i',
            'referer': 'https://www.eris.cv/index.php/institucional-eris/42-setor-farmaceutico/farmacias-de-servico/349-farmacias-de-servico-regime-de-chamadas',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
    } as const;
};

const buildUrl = (regionKey: string): string => {
    const baseUrl = process.env.PHARMACY_SOURCE_BASE_URL;
    if (!baseUrl) {
        throw new Error('BASE URL NOT PROVIDED');
    }

    const region = regions.find(region => region[regionKey]);
    const regionPath = region ? region[regionKey] : null;

    if (!regionPath) throw new BadRequestException(`The request is invalid. This may be due to missing, incorrect, or malformed values in the URL query parameters.`);

    return `${baseUrl}/${regionPath}`;
};

const regions: Region[] = [
    { praia: '586-farmacias-de-servico-praia' },
    { 'santa-catarina': '587-farmacias-de-servico-santa-catarina' },
    { mindelo: '588-farmacias-de-servico-mindelo' },
    { 'porto-novo': '659-farmacias-de-servico-porto-novo' },
    { 'espargos': '589-farmacias-de-servico-espargos' },
];

const toReadableRegion = (key: string): string => {
    // Find the region object that contains the key
    const region = regions.find(region => region[key]);

    if (region) {
        const regionKey = Object.keys(region)[0];
        // Capitalize the first letter and replace hyphens with spaces
        return regionKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return null; // Return null if key is not found
};

const toNormalizedDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
};

const parseAddressAndPhone = (input: string): { location: string; telephone: string } => {
    const segments = input.split(" - ");
    const telephone = segments.pop()?.trim() || ""; // Extract the last part as the telephone number
    const location = segments.join(" - ").trim(); // Join the remaining parts as the location
    return { location, telephone };
};

export {
    getFetchOptions,
    buildUrl,
    regions,
    toReadableRegion,
    toNormalizedDate,
    parseAddressAndPhone
};