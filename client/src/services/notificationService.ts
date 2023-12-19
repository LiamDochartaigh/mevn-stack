import { nanoid } from "nanoid"

export interface IHexeum_Notification{
    type: notificationTypes,
    message: string,
    uniqueHash: string
}

export class Hexeum_Notification implements IHexeum_Notification{
    type: notificationTypes;
    message: string;
    uniqueHash: string;

    constructor(type: notificationTypes, message: string){
        this.type = type;
        this.message = message;
        this.uniqueHash = nanoid();
    }
}

export enum notificationTypes{
    success = 'success',
    error = 'error'
}

export default{
    notificationTypes,
}
