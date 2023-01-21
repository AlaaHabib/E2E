"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_plate_dto_1 = require("./create-plate.dto");
class UpdatePlateDto extends (0, swagger_1.PartialType)(create_plate_dto_1.CreatePlateDto) {
}
exports.UpdatePlateDto = UpdatePlateDto;
//# sourceMappingURL=update-plate.dto.js.map