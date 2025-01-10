import { Module } from '@nestjs/common';
import { BorrowedBooksController } from './borrowed_books.controller';
import { BorrowedBooksService } from './borrowed_books.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BorrowedBooks,
  BorrowedBooksSchema,
} from './schema/borrowed_books.schema';
import { Book, BookSchema } from 'src/books/schema/book.schema';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowedBooks.name, schema: BorrowedBooksSchema },
    ]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [BorrowedBooksController],
  providers: [BorrowedBooksService, TokenService],
})
export class BorrowedBooksModule {}
