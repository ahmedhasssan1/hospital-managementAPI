import { IsDateString, IsNotEmpty , IsNumber } from "class-validator"

export class createAppointementDto{
    @IsNotEmpty()
    @IsNumber()
    patient_id:number;
    @IsDateString({strict:true},{message:"must to be in format yyyy-mm-dd"})
    date:string  
    
    status:string

    description:string
}