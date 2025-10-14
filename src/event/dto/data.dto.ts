import { IsInt, IsNotEmpty, IsString, Length } from '@nestjs/class-validator';

export class DtoData {
  @IsNotEmpty({ message: 'Поле name не должно быть пустым.' })
  @IsString({ message: 'Поле name должно быть строкой.' })
  @Length(1, 100, { message: 'Длина name должно иметь от 1 до 100 символов.' })
  name: string;

  @IsNotEmpty({ message: 'Поле total_seats не должно быть пустым.' })
  @IsInt({ message: 'Поле total_seats должно быть числом.' })
  total_seats: number;
}
