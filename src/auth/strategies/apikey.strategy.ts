import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {

    constructor(private readonly authService: AuthService) {
        super({ header: 'x-api-key', prefix: '' }, false);
    }

    public async validate(apiKey: string) {
        const isValidKey = await this.authService.validateKey(apiKey);
        if (!isValidKey) throw new UnauthorizedException('Invalid API key');
        return isValidKey;
    }
}