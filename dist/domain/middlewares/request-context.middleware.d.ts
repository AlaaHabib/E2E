import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: any): void;
    validateToken(token: string, type: 'refresh' | 'access'): string | import("jsonwebtoken").JwtPayload;
}
