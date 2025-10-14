import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Events } from './events.model';

interface BookingsInterface {
  event_id: number;
  user_id: string;
}

@Table({
  tableName: 'bookings',
  updatedAt: false,
})
export class Bookings extends Model<Bookings, BookingsInterface> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Events)
  @Column({ type: DataType.INTEGER, validate: { min: 0 } })
  declare event_id: number;

  @Column({ type: DataType.STRING(1000) })
  declare user_id: string;
}
