import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IPharmacySchedule } from '../utils/types';

@Entity('pharmacies_schedule')
export class PharmacySchedule {

    constructor(data: IPharmacySchedule) {
        Object.assign(this, data);
    };

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 50, name: 'day_of_week' })
    dayOfWeek: string;

    @Column({ name: 'availability_date' })
    date: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'address' })
    address?: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'phone' })
    phone?: string; // Optional field

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'notes' })
    notes?: string; // Optional field for additional information

    @Column({ type: 'varchar', length: 255, name: 'searchable_region' })
    searchableRegion: string;

    @Column({ type: 'varchar', length: 255, name: 'region' })
    region: string;
};
