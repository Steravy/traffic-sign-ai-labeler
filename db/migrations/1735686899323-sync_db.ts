import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncDb1735686899323 implements MigrationInterface {
    name = 'SyncDb1735686899323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pharmacies_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "day_of_week" character varying(50) NOT NULL, "availability_date" TIMESTAMP NOT NULL, "address" character varying(255), "phone" character varying(50), "notes" character varying(255), "searchable_region" character varying(255) NOT NULL, "region" character varying(255) NOT NULL, CONSTRAINT "PK_76f15d9ac9faf6ac404baca1fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_keys"`);
        await queryRunner.query(`DROP TABLE "pharmacies_schedule"`);
    }

}
