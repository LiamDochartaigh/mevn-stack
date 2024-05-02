<template>
    <v-app-bar clipped-left flat app class="notification-banner">
        <v-row class="align-center justify-center">
            <v-icon class="mr-2">{{ icon }}</v-icon>
            <span class="mr-4">{{message}}</span>
            <v-btn
            :disabled="buttonDisabled"
            @click="ExecuteAction"
            class="hvr-shrink bg-primary mr-4"
            rounded target="_blank">
                <span>{{ actionComplete === true ? actionFinishedMessage : actionMessage }}</span>
            </v-btn>
        </v-row>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    icon: String,
    message: String,
    actionMessage: String,
    actionFinishedMessage: String,
    action: Function
})

const buttonDisabled = ref(false);
const actionComplete = ref(false);

async function ExecuteAction() {
    if(props.action){
        buttonDisabled.value = true;
        const response = await props.action();
        if(!response){
            buttonDisabled.value = false;
        }
        else{actionComplete.value = true;}
    }
}
</script>

<style scoped>
.notification-banner {
    background: rgb(69, 208, 240) !important;
    background: linear-gradient(90deg, rgba(69, 208, 240, 1) 0%, rgba(122, 44, 211, 1) 100%) !important;

}
</style>