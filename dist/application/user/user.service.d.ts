import { CreateUserDto } from 'src/domain/dtos/user';
import { UserRepository } from 'src/infrastructure/repositories';
export declare class UserService {
    private repo;
    constructor(repo: UserRepository);
    createUser(dto: CreateUserDto): Promise<import("../../domain/entities/user").User>;
    updateUser(id: any, data: any): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: any): Promise<import("typeorm").DeleteResult>;
    getAll(params: any): Promise<import("../../domain/interfaces").PaginationResult>;
    getUserById(id: any): Promise<import("../../domain/entities/user").User>;
}
