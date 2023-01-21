"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidation = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../entities/enums");
const helpers_1 = require("../../../helpers");
let NumberValidation = class NumberValidation {
    validate(number, args) {
        if (JSON.parse(JSON.stringify(args.object)).type === enums_1.PlateTypes.Number) {
            var regexp = new RegExp('^[1-9][0-9]{0,5}$');
            (0, helpers_1.CustomLogger)(JSON.parse(JSON.stringify(args.object)).type, regexp.test(number), number);
            return regexp.test(number);
        }
        else {
            regexp = new RegExp('^[1-9][0-9]{0,2} ([\u0600-\u06FF ]+){0,2}$');
            (0, helpers_1.CustomLogger)(JSON.parse(JSON.stringify(args.object)).type, regexp.test(number), number);
            return regexp.test(number);
        }
    }
    defaultMessage(args) {
        if (JSON.parse(JSON.stringify(args.object)).type === enums_1.PlateTypes.Number) {
            return 'Enter a valid number.';
        }
        else {
            return 'Enter a valid number with char .';
        }
    }
};
NumberValidation = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NumberValidation', async: false })
], NumberValidation);
exports.NumberValidation = NumberValidation;
//# sourceMappingURL=number.validation.js.map