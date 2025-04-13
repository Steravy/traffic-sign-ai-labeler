import { Module, OnModuleInit } from '@nestjs/common';
import { PharmacyController } from './controllers/pharmacy.controller';
import { FindPharmacy } from './services/find-pharmacy.service';
import { Scraper } from './services/scraper.service';
import { PharmacyScheduleManager } from './services/pharmacy-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmacySchedule } from './entities/pharmacy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmacySchedule])],
  controllers: [PharmacyController],
  providers: [FindPharmacy, Scraper, PharmacyScheduleManager],
})
export class PharmacyModule implements OnModuleInit {

  constructor(
    private scraper: Scraper
  ) { }

  async onModuleInit() {
    // await this.scraper.execute();
  }
};
