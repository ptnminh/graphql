import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  findAllUser() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Args('email', { type: () => String }) email: string) {
    console.log(email);
    return this.userService.findOne(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.email, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('email', { type: () => String }) email: string) {
    return this.userService.remove(email);
  }
}
