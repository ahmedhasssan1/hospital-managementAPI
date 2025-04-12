import { IsNotEmpty, IsNumber } from "class-validator"

export class updateAdminDto{
    @IsNotEmpty()
    @IsNumber()
    id:number
    name:string
    email:string
}