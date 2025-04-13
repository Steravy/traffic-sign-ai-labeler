import { MigrationInterface, QueryRunner } from "typeorm";

export class ApiKeyUsageCountType1735767977931 implements MigrationInterface {
    name = 'ApiKeyUsageCountType1735767977931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "usageCount"`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "usageCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "usageCount"`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "usageCount" bigint NOT NULL DEFAULT '0'`);
    }

}
