import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { BookModule } from './book.module';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookModule>,
  ) {}
  create(createBookInput: CreateBookInput) {
    return new this.bookModel(createBookInput).save();
  }

  async findAll() {
    return this.bookModel.find().exec();
  }

  async findOne(title: string) {
    return this.bookModel
      .findOne({
        title,
      })
      .exec();
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
