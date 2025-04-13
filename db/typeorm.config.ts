import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import databaseConfig from './database.config';

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
        }),
    ],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    dataSourceFactory: async (options) => new DataSource(options).initialize(),
};

export default typeOrmConfig;
