import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Headers,
  Param,
} from '@nestjs/common';
import { BorrowedBooksService } from './borrowed_books.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { BorrowedBooksDto } from './dto/borrowed_books.dto';
import { TokenService } from './token.service';
import { PublicRoute } from 'src/auth/decorators/public.decorators';

@Controller('books/borrowed')
export class BorrowedBooksController {
  constructor(
    private borrowedBooksService: BorrowedBooksService,
    private tokenService: TokenService,
  ) {}
  @Post()
  @Roles(Role.USER)
  async borrowBook(
    @Headers('authorization') authHeader: string,
    @Body() dto: BorrowedBooksDto,
  ) {
    const token = authHeader.replace('Bearer ', '');
    const userId = this.tokenService.extractEmail(token);
    this.borrowedBooksService.borrowBook(dto, userId);
  }

  @Roles(Role.USER)
  @Get()
  async getAllBorrowedBooks(
    @Headers('authorization') authHeader: string,
  ): Promise<object> {
    const token = authHeader.replace('Bearer ', '');
    const userId = this.tokenService.extractEmail(token);
    return this.borrowedBooksService.getAllBorrowedBooks(userId);
  }

  @Roles(Role.USER)
  @Patch(':id')
  async returnBook(@Param('id') id: string) {
    this.borrowedBooksService.returnBook(id);
  }

  @Delete()
  @PublicRoute()// Correctly set role
  returnAllBooks(@Headers('authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    const userId = this.tokenService.extractEmail(token);
    this.borrowedBooksService.returnAllBooks(userId);
  }
}
