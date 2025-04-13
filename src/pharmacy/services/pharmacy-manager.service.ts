import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IPharmacySchedule } from "../utils/types";
import { PharmacySchedule } from "../entities/pharmacy.entity";

@Injectable()
export class PharmacyScheduleManager {

    constructor(
        @InjectRepository(PharmacySchedule)
        private repository: Repository<PharmacySchedule>
    ) { };

    async register(data: IPharmacySchedule[]) {

        for (const rawPharmacyData of data) {
            this.repository.save(new PharmacySchedule(rawPharmacyData));
        };
    }
};
