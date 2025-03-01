import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'reset_tokens' })
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expireDAte: Date;

  @Column()
  createAt: Date;   
}
