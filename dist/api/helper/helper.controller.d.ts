import { HelperService } from 'src/application/helper/helper.service';
export declare class HelperController {
    private service;
    constructor(service: HelperService);
    getPlateType(): Promise<import("../../domain/entities/plate").PlateType[]>;
    getEnterType(): Promise<import("../../domain/entities/plate").EnterType[]>;
}
