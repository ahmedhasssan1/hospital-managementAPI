import { IsDateString } from "class-validator"

export class updateAppointmentDto{
    id:number
    status:string
    description:string
    @IsDateString({strict:true},{message:"must to be in format yyyy-mm-dd"})
    date:string
}