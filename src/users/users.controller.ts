import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
	@UseGuards(JwtGuard)
	@Get('me')
	async getMe(@Req() req: any) {

		return req.user;
	}
}
