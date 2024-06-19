import { IsString } from "class-validator"

export class CreateResourceDto {
    @IsString()
    resourceName: string
    
    @IsString()
    resourceType: 'ROOT' | 'ORGANIZATION' | 'ENVIRONMENT'

    @IsString()
    resourceParentId?: string
}