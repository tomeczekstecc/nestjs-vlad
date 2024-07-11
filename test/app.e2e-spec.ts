import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as module from 'node:module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {
	let app: INestApplication;

	beforeAll(async () => {

		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		}));

	});

	it.todo('should pass');

	afterAll(() => {
		app.close();
	});
});
