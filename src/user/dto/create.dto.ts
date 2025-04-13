import { IsOptional } from "class-validator";

export class createDto {
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

  contact_info:string

  @IsOptional()
  roomID:number

  @IsOptional()
  doctorID:number;
}

export class createPatientDto{
    name:string
    contact_info:boolean
    
}
