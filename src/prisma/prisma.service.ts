import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(private readonly config: ConfigService) {
		super({
			datasources: {
				db: {
					url: "postgres://tomek:KKKemot7901$@localhost:5431/dave-nestjs"
				}
			}
		})
	}
}
