import { defineStore } from 'pinia';
import { Hexeum_Notification } from "../services/notificationService";
import { User } from '../services/userService';

export interface State {
    notifications: Hexeum_Notification[],
    isLoading: boolean
}

export const useUIStore = defineStore({
    id: 'store',
    state: (): State => ({
        notifications: [],
        isLoading: false,
    }),
    actions: {
        async addNotification(notification: Hexeum_Notification) {
            this.notifications.push(notification);
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.removeNotification(notification);
        },
        removeNotification(notification: Hexeum_Notification) {
            if (notification.uniqueHash) {
                const notifPos = this.notifications.map(notif => {
                    return notif.uniqueHash;
                })
                    .indexOf(notification.uniqueHash);
                this.notifications.splice(notifPos, 1);
            }
        },
        showLoading() {
            this.isLoading = true;
        },
        hideLoading() {
            this.isLoading = false;
        }
    }
});

export const useAuthStore = defineStore({
    id: 'userAuth',
    state: () => ({
        isAuthenticated: false,
        user: <User | null>null,
    }),
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        getUser: (state) => state.user
    },
    actions: {
        async logOut() {
            this.user = null;
            this.isAuthenticated = false;
        },
        async logIn(user: User) {
            this.user = user;
            this.isAuthenticated = true;
        }
    }
});