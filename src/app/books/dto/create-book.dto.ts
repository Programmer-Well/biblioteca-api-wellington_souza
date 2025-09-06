import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class CreateBookDto {
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()   
    author: string;

    @IsString()
    @IsNotEmpty()   
    category: string;

    @IsBoolean()
    @IsOptional()
    available?: boolean;
}
