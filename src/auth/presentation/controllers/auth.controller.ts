import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from '../../../auth/application/services/api-key.service';
import { ApiKeyResponse } from '../../../auth/domain/dtos/api-key-response.dto';
import { CreateApiKeyDto } from '../../../auth/domain/dtos/create-api-key.dto';

@ApiTags('Api Key')
@Controller('auth')
export class AuthController {
  constructor(private readonly apiKeyService: ApiKeyService) { }

  @Post('api-key')
  @ApiOkResponse({
    description: 'Successfully generated the API key.',
    type: ApiKeyResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred while processing your request. Please try again later.',
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
    description: 'The request is invalid. This may be due to missing, incorrect, or malformed values.',
    schema: {
      properties: {
        statusCode: { type: 'integer', example: 400 },
        message: { type: 'string', example: 'Bad Request. Please check your input values and try again.' },
        error: { type: 'string', example: 'BadRequest' },
        timestamp: { type: 'string', example: '2024-12-01T00:00:00.000Z' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'An API key already exists for the provided email. Please use a different email address.',
    schema: {
      properties: {
        statusCode: { type: 'integer', example: 409 },
        message: { type: 'string', example: 'You have an active API key with the given email.' },
        error: { type: 'string', example: 'ConflictException' },
        timestamp: { type: 'string', example: '2024-12-01T00:00:00.000Z' },
      },
    },
  })
  async createApiKey(@Body() createApiKeyDto: CreateApiKeyDto): Promise<ApiKeyResponse> {
    return this.apiKeyService.generateApiKey(createApiKeyDto);
  }
};
