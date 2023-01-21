import { BaseRecord } from '../base-tables/base-record';
import { User } from './user.entity';
export declare class UserRole extends BaseRecord {
    id?: number;
    name: string;
    users?: User[];
}
