import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateTableDto {
    
    @IsNotEmpty()
    @IsString()
    readonly Version: string;

    @IsNotEmpty()
    @IsString()
    readonly Color: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly Wide: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly Long: number;

    @IsNotEmpty()
    @IsNumber()
    readonly High: number;

    @IsNotEmpty()
    @IsNumber()
    readonly Weight: number;

}
