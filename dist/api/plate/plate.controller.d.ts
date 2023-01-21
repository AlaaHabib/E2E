import { PlateService } from './../../application/plate/plate.service';
import { PaginationResult } from 'src/domain/interfaces/pagination.result.interface';
import { CreatePlateDto, ExchangePlateDto, UpdatePlateDto } from 'src/domain/dtos/plate';
import { Response } from 'express';
export declare class PlateController {
    private service;
    constructor(service: PlateService);
    create(dto: CreatePlateDto): Promise<{
        id: number;
        number: string;
        from: string;
        date: string;
        enterType: string;
        plateType: string;
        exchange: boolean;
        exchange_date: string;
        exchange_to: string;
        execution_committee: boolean;
    }>;
    update({ id }: {
        id: any;
    }, dto: UpdatePlateDto, response: Response, user: any): Promise<void>;
    exchange({ id }: {
        id: any;
    }, dto: ExchangePlateDto, response: Response): Promise<void>;
    unExchange({ id }: {
        id: any;
    }, response: Response, user: any): Promise<void>;
    destroy(response: Response, { id }: any, user: any): Promise<void>;
    getPlateNumbersByType({ PlateTypeId }: any): Promise<import("../../domain/entities/plate").Plate[]>;
    getPlatesToday(params: any): Promise<PaginationResult>;
    getAll(params: any, query: any): Promise<PaginationResult>;
}
