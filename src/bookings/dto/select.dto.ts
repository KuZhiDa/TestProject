import { IsOptional, Matches } from 'class-validator';

export class selectDto {
  @IsOptional()
  @Matches(/^([0-9]){4}-([0-9]){2}-([0-9]){2}$/)
  day?: string; //YYYY-MM-DD

  @IsOptional()
  @Matches(/^([0-9]){4}-([0-9]){2}$/)
  month?: string; //YYYY-MM

  @IsOptional()
  @Matches(/^([0-9]){4}$/)
  year?: string; //YYYY
}
