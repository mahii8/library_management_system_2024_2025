import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/books/schema/book.schema';
import {
  BorrowedBooks,
  BorrowedBooksDocument,
} from './schema/borrowed_books.schema';
import { BorrowedBooksDto } from './dto/borrowed_books.dto';

@Injectable()
export class BorrowedBooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(BorrowedBooks.name)
    private borrowedBookModel: Model<BorrowedBooksDocument>,
  ) {}
  async borrowBook(dto: BorrowedBooksDto, borrowerId: string) {
    const book = await this.bookModel.findById(dto.bookId).exec();

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.quantity < 1) {
      throw new BadRequestException('Book cannot be borrowed');
    }

    book.quantity -= 1;
    await book.save();

    const borrowedBook = new this.borrowedBookModel({
      borrowerId,
      bookId: dto.bookId,
      borrowedDate: new Date(),
    });
    await borrowedBook.save();
    
  }

  async getAllBorrowedBooks(borrowerId: string) :Promise<object> {
    // Step 1: Find all borrowed books by the borrower ID
    const borrowedBooks = await this.borrowedBookModel
      .find({ borrowerId })
      .exec();

    if (borrowedBooks.length === 0) {
      throw new NotFoundException('No borrowed books found for this user');
    }

    // Step 2: Map through borrowed books and fetch each book's details
    const borrowedBooksWithDetails = [];
    for (const borrowedBook of borrowedBooks) {
      const bookId = borrowedBook.bookId;

      // Fetch book details by bookId
      const book = await this.bookModel.findById(bookId).exec();
      if (book) {
        // Map and include borrowed book details with book details
        borrowedBooksWithDetails.push({
          bookId: borrowedBook.bookId,
          borrowerId: borrowedBook.borrowerId,
          borrowedDate: borrowedBook.borrowedDate,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          publicationYear: book.publicationYear,
        });
      }
    }

    // Step 3: Return the array of book details along with borrowed book information
    return borrowedBooksWithDetails;
  }

  async returnBook(id: string) {
    const borrowedBook = await this.borrowedBookModel.findById(id).exec();
    if (!borrowedBook) {
      throw new NotFoundException('Borrowed book record not found');
    }

    const bookId = borrowedBook.bookId;

    const book = await this.bookModel.findById(bookId).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    book.quantity += 1;
    await book.save();
    await this.borrowedBookModel.findByIdAndDelete(id).exec();

    return { message: 'Book returned successfully' };
  }

  async returnAllBooks(borrowerId: string) {
    const borrowedBooks = await this.borrowedBookModel
      .find({ borrowerId })
      .exec();

    if (borrowedBooks.length === 0) {
      throw new NotFoundException('No borrowed books found for this user');
    }

    for (const borrowedBook of borrowedBooks) {
      const bookId = borrowedBook.bookId;

      const book = await this.bookModel.findById(bookId).exec();
      if (book) {
        book.quantity += 1;
        await book.save();
      }
    }

    await this.borrowedBookModel.deleteMany({ borrowerId }).exec();

    return { message: 'All books returned successfully' };
  }
}
