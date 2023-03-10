"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArabicValidation = void 0;
const class_validator_1 = require("class-validator");
const helpers_1 = require("../../../helpers");
let ArabicValidation = class ArabicValidation {
    validate(number, args) {
        let regexp = new RegExp('^[\u0621-\u064A\u0660-\u0669 ]+$');
        (0, helpers_1.CustomLogger)(JSON.parse(JSON.stringify(args.object)).type, regexp.test(number), number);
        return regexp.test(number);
    }
    defaultMessage(args) {
        return 'Enter arabic char only  .';
    }
};
ArabicValidation = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'ArabicValidation', async: false })
], ArabicValidation);
exports.ArabicValidation = ArabicValidation;
//# sourceMappingURL=arabic.validation.js.map