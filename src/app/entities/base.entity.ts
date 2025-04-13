import { DeleteDateColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class BaseEntity {

    @Column({ name: 'name' })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
};