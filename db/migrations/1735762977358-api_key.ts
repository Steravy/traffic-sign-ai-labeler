import { MigrationInterface, QueryRunner } from "typeorm";

export class ApiKey1735762977358 implements MigrationInterface {
    name = 'ApiKey1735762977358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."api_keys_usertype_enum" AS ENUM('developer', 'company', 'student')`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "userType" "public"."api_keys_usertype_enum" NOT NULL DEFAULT 'developer'`);
        await queryRunner.query(`CREATE TYPE "public"."api_keys_status_enum" AS ENUM('active', 'disabled')`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD "status" "public"."api_keys_status_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."api_keys_status_enum"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "userType"`);
        await queryRunner.query(`DROP TYPE "public"."api_keys_usertype_enum"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP COLUMN "created_at"`);
    }

}
