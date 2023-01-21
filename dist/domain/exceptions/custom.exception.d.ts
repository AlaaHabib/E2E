export declare class CustomException extends Error {
    friendlyMsg: string;
    error: Error;
    status: string;
    typeError: string;
    constructor(error: Error, friendlyMsg: string);
}
