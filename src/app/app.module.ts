import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { CODE } from './common/constant';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        let code = CODE[`${error.extensions.code}`];
        return {
          message: error.message,
          code,
        };
      },
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
    BookModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
