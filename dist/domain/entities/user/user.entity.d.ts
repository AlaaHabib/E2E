import { BaseRecord } from '../base-tables/base-record';
import { UserRole } from './user-role.entity';
export declare class User extends BaseRecord {
    id: number;
    email: string;
    passwordHash: string;
    salt: string;
    refreshToken?: string;
    isActive: boolean;
    userRole: UserRole;
}
