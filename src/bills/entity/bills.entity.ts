import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'bills' }) // Map this entity to the 'bills' table
export class Bills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_id: number;

    @Column()
    name: string;

    @Column('numeric')
    amount: number;
}