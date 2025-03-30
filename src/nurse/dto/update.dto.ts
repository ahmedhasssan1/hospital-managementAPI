import { IsOptional } from "class-validator"

export class updateNurseDto{
    name:string
    shift:string
    @IsOptional()
    docotor:number   
}