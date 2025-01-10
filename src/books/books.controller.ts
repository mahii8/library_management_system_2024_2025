import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { BookDetailsUpdateDto } from './dto/quantity.dto';
import { Book } from './schema/book.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Post()
  @Roles(Role.LIBRARY_ADMIN)
  async addBook(@Body() dto: BookDto): Promise<Book> {
    return this.bookService.addBook(dto);
  }

  @Get()
  @Roles(Role.LIBRARY_ADMIN, Role.USER)
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Patch(':id')
  @Roles(Role.LIBRARY_ADMIN)
  async updateQuantity(
    @Param('id') id: string,
    @Body() dto: BookDetailsUpdateDto,
  ): Promise<Book> {
    return this.bookService.updateQuantity(id, dto);
  }

  @Roles(Role.LIBRARY_ADMIN)
  @Delete(':id')
  async removeBook(@Param('id') id: string): Promise<{ message: string }> {
    return this.bookService.removeBook(id);
  }
}
