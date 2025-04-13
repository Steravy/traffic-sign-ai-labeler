import { Injectable } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class AuthService {

    constructor(
        private apiKeyService: ApiKeyService
    ) { }

    async validateKey(key: string): Promise<boolean> {
        return this.apiKeyService.verifyKey(key);
    }
}
