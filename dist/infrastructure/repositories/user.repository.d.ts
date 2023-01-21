import { DataSource } from 'typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { CustomRepository } from 'src/domain/repository/CustomBaseRepository';
import { CreateUserDto } from 'src/domain/dtos/user';
export declare class UserRepository extends CustomRepository<User> {
    private _dataSource;
    constructor(dataSource: DataSource);
    Register(dto: CreateUserDto): Promise<User>;
}
