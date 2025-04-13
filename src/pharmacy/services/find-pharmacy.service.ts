import { Injectable } from '@nestjs/common';
import { Scraper } from './scraper.service';
import { PaginateQuery } from 'nestjs-paginate';


@Injectable()
export class FindPharmacy {

  constructor(
    private scraper: Scraper
  ) {}

  async onDutyByRegion(region: string) {
    return this.scraper.execute(region);
  }

  async all(query: PaginateQuery) {

    
  }

};
