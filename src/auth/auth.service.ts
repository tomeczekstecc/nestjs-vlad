import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import * as argon from "argon2"
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) {}

    async signup(dto) {

        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {email: dto.email, hash}
            })
            const {hash: pass, ...rest} = user

            return rest

        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {

                    throw new ForbiddenException('Email zajęty')
                }
            }
            throw new BadRequestException('Nie udało się zarejestrować')
        }
    }

    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (!user) throw new ForbiddenException('Nie udało sie zalogować')

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Nie udało sie zalogować')

        const {hash, ...rest} = user

        return rest
    }
}
