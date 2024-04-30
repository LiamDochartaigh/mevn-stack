export interface IBanner_Notification{
    message: string,
    actionMessage: string,
    actionFunction: Function,
    notificationIcon: string
}

export class Banner_Notification implements IBanner_Notification{
    message: string;
    actionMessage: string;
    actionFunction: Function;
    notificationIcon: string;

    constructor(message: string, actionMessage: string, actionFunction: Function, notificationIcon: string){
        this.message = message;
        this.actionMessage = actionMessage;
        this.actionFunction = actionFunction;
        this.notificationIcon = notificationIcon;
    }
}