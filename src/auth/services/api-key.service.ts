import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiKey } from '../entities/apikey.entity';
import { CreateApiKeyDto } from '../dtos/create-api-key.dto';
import { ApiKeyResponse } from '../dtos/api-key-response.dto';
import { Status } from '../misc/types';

@Injectable()
export class ApiKeyService {
    constructor(
        @InjectRepository(ApiKey)
        private apiKeyRepository: Repository<ApiKey>,
    ) { }

    async generateApiKey(createApiKeyDto: CreateApiKeyDto): Promise<ApiKeyResponse> {

        await this.verifyIfShouldCreatApiKey(createApiKeyDto);

        const apiKeyHash = crypto.createHash('sha256').update(createApiKeyDto.email).digest('hex');

        const apiKey = new ApiKey({
            ...createApiKeyDto,
            key: apiKeyHash,
        });

        return this.apiKeyRepository.save(apiKey)
            .then(data => ({ key: data.key }))
    };

    private async verifyIfShouldCreatApiKey({ email }: CreateApiKeyDto) {

        const existingKey = await this.apiKeyRepository.findOne({ where: { email, status: Status.ACTIVE } });

        if (existingKey) throw new ConflictException(`You have an active api key with the given email: ${email}`)
    };

    private async findByKeyValue(key: string) {
        return this.apiKeyRepository.findOne({ where: { key, status: Status.ACTIVE } });
    };

    async verifyKey(key: string): Promise<boolean> {
        const isKeyPresentAndActive = await this.findByKeyValue(key);

        if (isKeyPresentAndActive) {
            const newCount = isKeyPresentAndActive.usageCount += 1;
            this.incrementUsage(isKeyPresentAndActive.id, newCount)
            return true;
        };

        return false;
    }

    async incrementUsage(keyId: string, usageCount: number) {
        this.apiKeyRepository.update(keyId, { usageCount });
    }
};
