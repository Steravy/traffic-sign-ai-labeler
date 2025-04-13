import { MigrationInterface, QueryRunner } from "typeorm";

export class ApiKeyUsageCountName1735768048790 implements MigrationInterface {
    name = 'ApiKeyUsageCountName1735768048790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" RENAME COLUMN "usageCount" TO "usage_count"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" RENAME COLUMN "usage_count" TO "usageCount"`);
    }

}
