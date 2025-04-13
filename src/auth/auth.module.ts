import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './application/guards/apikey.guard';
import { ApiKeyStrategy } from './application/strategies/apikey.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { ApiKeyService } from './application/services/api-key.service';
import { ApiKey } from './domain/entities/apikey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyGuard, ApiKeyStrategy, ApiKeyService],
})
export class AuthModule { }
