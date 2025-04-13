import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ApiKeyGuard } from './guards/apikey.guard';
import { ApiKeyStrategy } from './strategies/apikey.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/apikey.entity';
import { ApiKeyService } from './services/api-key.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyGuard, ApiKeyStrategy, ApiKeyService],
})
export class AuthModule { }
