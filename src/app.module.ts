import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		BookmarksModule,
		PrismaModule,
		ConfigModule.forRoot({})
	]
})
export class AppModule {}
