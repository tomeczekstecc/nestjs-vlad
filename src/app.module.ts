import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [AuthModule, UsersModule, BookmarksModule],
})
export class AppModule {}
