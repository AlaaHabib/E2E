import { PlateTypes } from 'src/domain/entities/enums';
export declare class CreatePlateDto {
    date: Date;
    type: PlateTypes;
    number: string;
    plateTypeId: number;
    enterTypeId: number;
    from: string;
    receiver_name: string;
}
