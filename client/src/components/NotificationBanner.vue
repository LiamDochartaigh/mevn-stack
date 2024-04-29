<template>
    <v-app-bar clipped-left flat app class="pl-3 notification-banner">
        <v-row class="align-center justify-center">
            <v-icon class="mr-2">{{ icon }}</v-icon>
            <span class="mr-4">{{message}}</span>
            <v-btn @click="action" class="hvr-shrink bg-primary mr-4" rounded target="_blank">
                <span>{{ actionMessage }}</span>
            </v-btn>
        </v-row>
    </v-app-bar>
</template>

<script setup lang="ts">

defineProps({
    icon: String,
    message: String,
    actionMessage: String,
    action: Function
})
</script>

<style scoped>
.notification-banner {
    background: rgb(69, 208, 240) !important;
    background: linear-gradient(90deg, rgba(69, 208, 240, 1) 0%, rgba(122, 44, 211, 1) 100%) !important;

}
</style>