import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model, Schema as MongooSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(limit: number, skip: number) {
    return this.userModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(email: string) {
    const user = await this.userModel
      .findOne({
        email: email,
      })
      .exec();
    console.log(user);
    return user;
  }

  async update(email: string, updateUserInput: UpdateUserInput) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          email,
        },
        updateUserInput,
      )
      .populate('books')
      .exec();

    return user;
  }

  async remove(email: string) {
    return this.userModel
      .findOneAndRemove({
        email,
      })
      .exec();
  }
}
