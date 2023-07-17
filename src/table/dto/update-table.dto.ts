import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTableDto {
    
    @IsOptional()
    @IsString()
    readonly Version: string;

    @IsOptional()
    @IsString()
    readonly Color: string;
    
    @IsOptional()
    @IsNumber()
    readonly Wide: number;
    
    @IsOptional()
    @IsNumber()
    readonly Long: number;

    @IsOptional()
    @IsNumber()
    readonly High: number;

    @IsOptional()
    @IsNumber()
    readonly Weight: number;

}
