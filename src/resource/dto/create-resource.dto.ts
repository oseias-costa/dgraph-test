import { IsString } from "class-validator"

export class CreateResourceDto {
    @IsString()
    resourceName: string
    
    @IsString()
    resourceType: string

    @IsString()
    resourceParentType: string

    @IsString()
    resourceParentId: string
}