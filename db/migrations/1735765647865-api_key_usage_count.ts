import { MigrationInterface, QueryRunner } from "typeorm";

export class ApiKeyUsageCount1735765647865 implements MigrationInterface {
    name = 'ApiKeyUsageCount1735765647865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "usageCount" bigint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "usageCount"`);
    }

}
