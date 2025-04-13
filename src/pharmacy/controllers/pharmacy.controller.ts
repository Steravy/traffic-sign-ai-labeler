import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindPharmacy } from '../services/find-pharmacy.service';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RegionQueryParam } from '../utils/types';
import { PharmacyScheduleResponse } from '../dto/pharmacy-schedule-response.dto';
import { GetPharmacyByRegionQuery } from '../dto/pharmacy-on-duty-request.dto';

@ApiTags('PharmacySchedule')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly findPharmacy: FindPharmacy) { }

  @UseGuards(ApiKeyGuard)
  @ApiQuery({ name: 'region', enum: RegionQueryParam, description: 'Filters pharmacies on duty by specified regions.' })
  @ApiOkResponse({
    description: 'Successfully returns a list of pharmacies on duty, including details such as date, day of the week, name, phone, region, and optionally, the address',
    type: [PharmacyScheduleResponse],
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred during internal processing. Please try again later.',
    schema: {
      properties: {
        statusCode: { type: 'integer', example: 500 },
        message: { type: 'string', example: 'Internal server error. Please contact support if the issue persists.' },
        error: { type: 'string', example: 'InternalServerError' },
        timestamp: { type: 'string', example: '2024-12-01T00:00:00.000Z' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The request is invalid. This may be due to missing, incorrect, or malformed values in the URL query parameters.',
    schema: {
      properties: {
        statusCode: { type: 'integer', example: 400 },
        message: { type: 'string', example: 'Bad Request. Please check the query parameters and try again.' },
        error: { type: 'string', example: 'BadRequest' },
        timestamp: { type: 'string', example: '2024-12-01T00:00:00.000Z' },
      },
    },
  })

  @Get('on-duty')
  onDutyByRegion(@Query() query: GetPharmacyByRegionQuery) {

    const { region } = query;
    console.log(region)
    if (!region) throw new BadRequestException('YOU HAVE TO PROVIDE A REGION');
    return this.findPharmacy.onDutyByRegion(region);
  }

};