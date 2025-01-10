import { IsString, IsNotEmpty, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class BookDetailsUpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  isStocking : boolean

  @IsNumber()
  @Min(0)
  quantity: number;
}
