import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthResultDto } from 'src/domain/dtos/auth';
import { DataSource } from 'typeorm';
export declare class AuthService {
    private dataSource;
    private configService;
    private jwtService;
    constructor(dataSource: DataSource, configService: ConfigService, jwtService: JwtService);
    login(dto: AuthDto, refresh?: boolean, userId?: number): Promise<{
        token: AuthResultDto;
        role: string;
    }>;
    private generateTokens;
    refreshToken(refreshToken: string): Promise<{
        token: AuthResultDto;
        role: string;
    }>;
}
