import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number) // Esto sería similar a cuando incluimos en el proyecto de Pokemon el enableImpliciConversions: true
    limit?: number;

    @IsOptional()
    @Type( () => Number) // Esto sería similar a cuando incluimos en el proyecto de Pokemon el enableImpliciConversions: true
    offset?: number;
}