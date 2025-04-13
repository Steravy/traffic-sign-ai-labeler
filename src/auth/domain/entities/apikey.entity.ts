import { ApiKeyData, Status, UserType } from '../../../auth/application/misc/types';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('api_keys')
@Unique(['email'])
@Unique(['key'])
export class ApiKey extends BaseEntity {

    constructor(data: ApiKeyData) {
        super()
        Object.assign(this, data);
    }

    @Column({ name: "owner" })
    public owner: string;

    @Column({ name: "email" })
    public email: string;

    @Column({ name: "key" })
    public key: string;

    @Column({ type: "enum", enum: UserType, default: UserType.DEVELOPER, name: 'user_type' })
    public userType: UserType;

    @Column({ default: Status.ACTIVE, enum: Status, type: "enum", name: 'status' })
    public status: Status;

    @Column({ type: 'int', default: 0, name: 'usage_count' })
    public usageCount: number;

};
