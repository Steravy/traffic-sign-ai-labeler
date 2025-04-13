import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../../auth/application/misc/types';

export class CreateApiKeyDto {
    @ApiProperty({
        description: 'The email address that will be associated with the API key',
        type: String,
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The name of the user or organization requesting the API key',
        type: String,
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: `The type of user, eg: ${Object.values(UserType).join(', ')}`,
        enum: UserType,
        example: 'developer',
    })
    @IsEnum(UserType)
    userType: UserType;
}
