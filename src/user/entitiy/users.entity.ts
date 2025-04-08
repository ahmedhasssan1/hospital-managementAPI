import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column({nullable:true})
  email: string;


  @Column({nullable:true})
  password: string;

  @Column({nullable:true})
  major:string

  @CreateDateColumn({type:'timestamp'}) 
  createAt: Date;

  @Column()
  role: string;


  @Column({nullable:true})
    shift:string;
  
  @Column({nullable:true})
  contact_info:string  

  @Column({ nullable: true })
  authStrategy: string;
}
