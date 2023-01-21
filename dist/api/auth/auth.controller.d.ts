import { AuthService } from 'src/application/auth/auth.service';
import { AuthDto } from 'src/domain/dtos/auth';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthDto): Promise<{
        token: import("src/domain/dtos/auth").AuthResultDto;
        role: string;
    }>;
}
