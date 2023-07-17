import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";
import { Category } from "../schemas/book.schemas";
import { User } from "src/auths/schemas/user.schema";

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
    
    @IsNotEmpty()
    @IsString()
    readonly author: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category,' })
    readonly category: Category;

    readonly user: User
}

