import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class ArabicValidation implements ValidatorConstraintInterface {
    validate(number: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
