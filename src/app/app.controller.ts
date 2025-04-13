import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/application/guards/apikey.guard';

@ApiTags('Health Checker')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard)
  @Get('is-private')
  isPrivate() {
    return "i should be private"
  }
}
