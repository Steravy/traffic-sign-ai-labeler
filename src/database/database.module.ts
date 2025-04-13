import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import typeOrmConfig from '../../db/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmConfig as TypeOrmModuleAsyncOptions),
    ],
})
export class DatabaseModule { }