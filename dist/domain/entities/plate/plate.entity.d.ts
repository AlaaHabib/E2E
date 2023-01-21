import { BaseRecord } from '../base-tables/base-record';
import { PlateType } from './plate-type.entity';
import { EnterType } from './enter-type.entity';
export declare class Plate extends BaseRecord {
    id: number;
    date: string;
    number: string;
    from: string;
    receiver_name: string;
    exchange: boolean;
    exchange_date?: string;
    exchange_to?: string;
    execution_committee: boolean;
    version: number;
    plateType: PlateType;
    enterType: EnterType;
    parent?: Plate;
}
