import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from 'src/model/events.model';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [SequelizeModule.forFeature([Events])],
})
export class EventModule {}
