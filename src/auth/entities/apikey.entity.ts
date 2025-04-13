import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiKeyData, Status, UserType } from '../misc/types';
import { BaseEntity } from '../../app/entities/base.entity';

@Entity('api_keys')
@Unique(['email'])
@Unique(['key'])
export class ApiKey extends BaseEntity {

    constructor(data: ApiKeyData) {
        super()
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public key: string;

    @Column({ type: "enum", enum: UserType, default: UserType.DEVELOPER })
    public userType: UserType;

    @Column({ default: Status.ACTIVE, enum: Status, type: "enum" })
    public status: Status;

    @Column({ type: 'int', default: 0, name: 'usage_count' })
    usageCount: number;

};
