import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
    'database',
    (): PostgresConnectionOptions => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        entities: [
            path.resolve(`${__dirname}/../src/**/**/**.entity{.ts,.js}`),
        ],
        migrations: [path.resolve(`${__dirname}/migrations/*{.ts,.js}`)],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        synchronize: false,
    }),
);