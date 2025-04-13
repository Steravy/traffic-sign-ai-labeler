import { MigrationInterface, QueryRunner } from "typeorm";

export class DbSync1744510498182 implements MigrationInterface {
    name = 'DbSync1744510498182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."api_keys_user_type_enum" AS ENUM('developer', 'company', 'student')`);
        await queryRunner.query(`CREATE TYPE "public"."api_keys_status_enum" AS ENUM('active', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "owner" character varying NOT NULL, "email" character varying NOT NULL, "key" character varying NOT NULL, "user_type" "public"."api_keys_user_type_enum" NOT NULL DEFAULT 'developer', "status" "public"."api_keys_status_enum" NOT NULL DEFAULT 'active', "usage_count" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key"), CONSTRAINT "UQ_8799872612bda846a62d8dbf7bd" UNIQUE ("email"), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_keys"`);
        await queryRunner.query(`DROP TYPE "public"."api_keys_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."api_keys_user_type_enum"`);
    }

}
