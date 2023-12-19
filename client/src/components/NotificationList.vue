<template>
    <div class="d-inline-block mr-5 notification-list-wrap" :style="{ paddingTop: listPaddingTop }">
        <div class="mt-3">
            <TransitionGroup name="slideX">
                <div v-for="(item) in props.notificationsList?.slice().reverse()" :key="item.uniqueHash" :value="item"
                   class="mb-3 d-flex justify-end notification-item">
                    <div class="pl-3 pb-3 pt-3 pr-3 d-inline-block rounded-lg"  :class="GetNotificationColor(item.type)">
                        {{ item.message }}
                        <v-icon right> {{ GetNotificationIcon(item.type) }}</v-icon>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang=ts>
import { notificationTypes, Hexeum_Notification } from '../services/notificationService';
import { defineProps, onMounted, PropType, ref} from 'vue';

const props = defineProps({
    notificationsList: Array as PropType<Hexeum_Notification[]>
})

const listPaddingTop = ref('');

function GetNotificationColor(color: string) {
    if (color == notificationTypes.error) {
        return 'error';
    }
    else if (color == notificationTypes.success) {
        return 'success';
    }
    else return '';
}

function GetNotificationIcon(color: string) {
    if (color == notificationTypes.error) {
        return 'mdi-alert-circle-outline';
    }
    else if (color == notificationTypes.success) {
        return 'mdi-check-circle';
    }
    else return '';
}

onMounted(() => {
    listPaddingTop.value = document.querySelector('main')?.style.paddingTop ?? '';
})

</script>

<style scoped>
.notification-list-wrap {
    z-index: 4;
    position: fixed;
    right: 0;
    top: 0;
}

.notification-item{
    position: relative;
}

.slideX-enter-active,
.slideX-leave-active{
    transition: all 0.5s ease;
}

.slideX-enter,
.slideX-leave-to {
    transform: translateX(50px);
    opacity: 0;
}

</style>