import { ApiProperty } from "@nestjs/swagger";

export class ApiKeyResponse {
    @ApiProperty({ description: 'The generated apiKey that you should use to make requests', example: 'gyusc7tefu3bqwyeigqecb8hcneycg8qo3urbc13yc' })
    key: string;
};