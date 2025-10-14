import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoData } from 'src/event/dto/data.dto';
import { Events } from 'src/model/events.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Events) private eventModel: typeof Events) {}

  async createEvent(req: DtoData): Promise<{ message: string }> {
    const event = await this.eventModel.findOne({ where: { name: req.name } });
    if (event) {
      throw new BadRequestException('Данное мероприятие уже существует.');
    }
    await this.eventModel.create(req);
    return { message: 'Мероприятие успешно создано.' };
  }
}
