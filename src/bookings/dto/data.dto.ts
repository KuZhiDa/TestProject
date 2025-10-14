import { IsInt, IsNotEmpty } from '@nestjs/class-validator';

export class DtoData {
  @IsNotEmpty({ message: 'Поле event_id должно быть заполнено.' })
  @IsInt({ message: 'Поле event_id должно быть числом' })
  event_id: number;

  @IsNotEmpty({ message: 'Поле user_id должно быть заполнено.' })
  @IsInt({ message: 'Поле user_id должно быть строкой' })
  user_id: string;
}
