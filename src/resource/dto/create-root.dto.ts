import { IsString } from "class-validator";

export class CreateRootDto {
    @IsString()
    name: string

    @IsString()
    resource: string

    @IsString()
    resourceParentId: string
}
