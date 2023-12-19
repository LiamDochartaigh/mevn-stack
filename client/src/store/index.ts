import { defineStore } from 'pinia';
import { Hexeum_Notification} from "../services/notificationService";

export interface State{
    notifications: Hexeum_Notification[]
}
const store = defineStore({
    id: 'store',
    state:(): State => ({
        notifications: []
    }),
    actions: {
        async addNotification(notification: Hexeum_Notification){
            this.notifications.push(notification);
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.removeNotification(notification);
        },
        removeNotification(notification: Hexeum_Notification){
            if(notification.uniqueHash){
                const notifPos = this.notifications.map(notif => {
                    return notif.uniqueHash;
                })            
                .indexOf(notification.uniqueHash);
                this.notifications.splice(notifPos, 1);
            }
        }
    }
});

export default store;