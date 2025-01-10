import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { BooksModule } from './books/books.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { BorrowedBooksModule } from './borrowed_books/borrowed_books.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/library_db'),
    BooksModule,
    BorrowedBooksModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JWT Auth Guard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply Roles Guard globally
    },
  ],
})
export class AppModule {}
