export declare abstract class BaseInsert {
    createdBy?: string;
    createdAt?: Date;
    addUser?(): void;
}
export declare abstract class BaseUpdate extends BaseInsert {
    updatedBy?: string;
    updatedAt?: Date;
    UpdateUser?(): void;
}
export declare abstract class BaseRecord extends BaseUpdate {
    deletedAt?: Date;
}
