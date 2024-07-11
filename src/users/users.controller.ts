import {Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import {JwtGuard} from '../auth/guards/jwt.guard';
import {GetUser} from "../auth/decorators";
import {User} from '@prisma/client'

@Controller('users')
export class UsersController {
    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@GetUser() user: User) {

        return user;
    }

    @UseGuards(JwtGuard)
    @Patch('edit')
    async editUser(@GetUser() user: User) {

        return user;
    }
}
