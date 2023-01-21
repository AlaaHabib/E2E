import { Plate } from './plate.entity';
import { BaseRecord } from '../base-tables/base-record';
export declare class EnterType extends BaseRecord {
    id?: number;
    name: string;
    plates?: Plate[];
}
