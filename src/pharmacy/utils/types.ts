type Region = {
    [key: string]: string;
};

interface IPharmacySchedule {
    date: Date; // Adjust the type if it's a Date object or another type
    dayOfWeek: string; // You could use a specific union type like 'Monday' | 'Tuesday' if you want to restrict it
    name: string;
    phone: string;
    region: string;
    searchableRegion: string;
    address?: string;
};

enum RegionQueryParam {
    PRAIA = 'praia',
    MINDELO = 'mindelo',
    PORTO_NOVO = 'porto-novo',
    SANTA_CATARINA = 'santa-catarina',
    ESPARGOS = 'espargos'
}

export {
    Region,
    IPharmacySchedule,
    RegionQueryParam,

};