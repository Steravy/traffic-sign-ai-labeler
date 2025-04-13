import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueFields1735767231298 implements MigrationInterface {
    name = 'UniqueFields1735767231298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" ADD CONSTRAINT "UQ_8799872612bda846a62d8dbf7bd" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849"`);
        await queryRunner.query(`ALTER TABLE "api_keys" DROP CONSTRAINT "UQ_8799872612bda846a62d8dbf7bd"`);
    }

}
