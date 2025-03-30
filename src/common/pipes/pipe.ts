// import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
// import { userServices } from "src/user/user.service";
// import { User } from "../entities/users.entity";

// @Injectable()
// export class UserByIdPipe implements PipeTransform{
//     constructor(private readonly UserSerivice:userServices){}

//     async transform(value: number, metadata: ArgumentMetadata) {
//         const findUser=await this.UserSerivice.findOne(value)
//         if(!findUser){
//             throw new NotFoundException('user is not found');
//         }
//         return findUser
//     }

// }