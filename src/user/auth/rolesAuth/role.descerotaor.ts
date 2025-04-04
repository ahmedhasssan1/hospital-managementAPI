import { SetMetadata } from "@nestjs/common";
import { USerRole } from "src/common/enum/Role.enum";

export const Roles=(...roles:USerRole[])=>SetMetadata('roles',roles)