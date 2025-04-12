import { User } from "src/user/entitiy/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'receptionists'})
export class receptionist{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    shift:string

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' ,onUpdate:'CASCADE'})
    user: User;
    
}