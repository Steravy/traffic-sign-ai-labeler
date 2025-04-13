import { ApiProperty } from '@nestjs/swagger';

export class PharmacyScheduleResponse {
    @ApiProperty({ description: 'The date of duty', example: '2024-12-01T00:00:00.000Z' })
    date: Date;

    @ApiProperty({ description: 'The day of the week', example: 'Domingo' })
    dayOfWeek: string;

    @ApiProperty({ description: 'The name of the pharmacy', example: 'São João Baptista' })
    name: string;

    @ApiProperty({ description: 'The pharmacy phone number', example: '2221393' })
    phone: string;

    @ApiProperty({ description: 'A lowercase identifier for the region', example: 'porto-novo' })
    searchableRegion: string;

    @ApiProperty({ description: 'The full name of the region', example: 'Porto Novo' })
    region: string;

    @ApiProperty({ description: 'The address of the pharmacy (optional)', example: 'Main Street, Porto Novo', required: false })
    address?: string;
};
