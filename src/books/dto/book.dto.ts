import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
