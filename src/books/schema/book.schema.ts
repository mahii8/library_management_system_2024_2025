import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true }) // Include timestamps for createdAt and updatedAt
export class Book {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({
    required: true,
    min: 1000,
    max: new Date().getFullYear(),
  })
  publicationYear: number;

  @Prop({ required: true, trim: true })
  author: string;

  @Prop({ required: true, trim: true })
  publisher: string;

  @Prop({ required: true, min: 0, default: 0 })
  quantity: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
