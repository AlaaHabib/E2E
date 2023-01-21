import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class NumberValidation implements ValidatorConstraintInterface {
    validate(number: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): "Enter a valid number." | "Enter a valid number with char .";
}
