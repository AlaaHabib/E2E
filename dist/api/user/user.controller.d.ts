import { PaginationResult } from 'src/domain/interfaces/pagination.result.interface';
import { Response } from 'express';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos/user';
import { UserService } from 'src/application/user/user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    create(dto: CreateUserDto): Promise<import("../../domain/entities/user").User>;
    getById({ id }: {
        id: any;
    }): Promise<import("../../domain/entities/user").User>;
    update({ id }: {
        id: any;
    }, dto: UpdateUserDto, response: Response): Promise<void>;
    destroy(response: Response, { id }: any): Promise<void>;
    getUsers(params: any): Promise<PaginationResult>;
}
