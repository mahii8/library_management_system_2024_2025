import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowedBooksDocument = HydratedDocument<BorrowedBooks>;

@Schema({ timestamps: true }) // Include timestamps for createdAt and updatedAt
export class BorrowedBooks {
  @Prop({ required: true, trim: true })
  borrowerId: string;

  @Prop({ required: true, trim: true })
  bookId: string;

  @Prop({ required: true })
  borrowedDate: Date;
}

export const BorrowedBooksSchema = SchemaFactory.createForClass(BorrowedBooks);
