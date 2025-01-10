import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDetailsUpdateDto } from './dto/quantity.dto';
import { BookDto } from './dto/book.dto';
import { Book, BookDocument } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async addBook(dto: BookDto): Promise<Book> {
    const createdBook = new this.bookModel(dto);
    return createdBook.save(); // Save the book instance to the database
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec(); // Retrieve all books
  }

  async updateQuantity(id: string, dto: BookDetailsUpdateDto): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (dto.isStocking) {
      book.quantity += dto.quantity;
    } else {
      if (book.quantity - dto.quantity < 0) {
        throw new Error('Quantity cannot be less than zero');
      }
      book.quantity -= dto.quantity;
    }

    return book.save();
  }

  async removeBook(id: string): Promise<{ message: string }> {
    const result = await this.bookModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('Book not found');
    }

    return { message: 'Book successfully deleted' };
  }
}

@Injectable()
export class BookService {}
