import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

	signup() {
	}

	signin() {
		return {
			message: 'signin'
		};
	}
}
