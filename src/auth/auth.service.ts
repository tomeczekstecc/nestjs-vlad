import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	Req
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly config: ConfigService
	) {
	}

	async signup(dto) {
		const hash = await argon.hash(dto.password);

		try {
			const user = await this.prisma.user.create({
				data: { email: dto.email, hash }
			});

			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Email zajęty');
				}
			}
			throw new BadRequestException('Nie udało się zarejestrować');
		}
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});
		if (!user) throw new ForbiddenException('Nie udało sie zalogować');

		const pwMatches = await argon.verify(user.hash, dto.password);

		if (!pwMatches) throw new ForbiddenException('Nie udało sie zalogować');

		return this.signToken(user.id, user.email);
	}

	async signToken(
		userId: string,
		email: string
	): Promise<{ access_token: string }> {
		const token = await this.jwt.signAsync(
			{ sub: userId, email },
			{
				expiresIn: '1h',
				secret: this.config.get('JWT_SECRET')
			}
		);

		return { access_token: token };
	}
}
