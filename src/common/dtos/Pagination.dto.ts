import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'Number of items to return',
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number) // Esto sería similar a cuando incluimos en el proyecto de Pokemon el enableImpliciConversions: true
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Number of items to skip',
    })    
    @IsOptional()
    @Type( () => Number) // Esto sería similar a cuando incluimos en el proyecto de Pokemon el enableImpliciConversions: true
    offset?: number;
}