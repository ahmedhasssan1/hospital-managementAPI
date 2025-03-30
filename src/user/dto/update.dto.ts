import { IsOptional } from "class-validator";

export class updateDto {
  password: string;


}
export class updateUser{
    name:string;
    @IsOptional()
    major:string;
    @IsOptional()
    email: string;
    @IsOptional()
    password: string;
    role:string
    @IsOptional()
    shift:string
    @IsOptional()
    contact_info:string
    @IsOptional()
    roomID:number
    @IsOptional()
    doctorID:number;

}