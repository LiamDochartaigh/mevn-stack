<template>
    <DefaultLayout>
        <v-row v-if="!isLoading" class="text-center justify-center">
            <v-col cols="12"></v-col>
            <v-col cols="8" v-if="accountActivated" class="mb-4 mt-15">
                <h1 class="text-h3 font-weight-bold mb-3">Account Activated</h1>
                <p>Your account has been activated. You can now login to your account.</p>
            </v-col>
            <v-col v-else class="mb-4 mt-15">
                <h1 class="text-h3 font-weight-bold mb-3">Whoops!</h1>
                <p>Either the provided activation token is invalid or this account has already been activated.</p>
                <p>Login to your account and please contact Support if you experience any issues accessing your account.</p>
            </v-col>
        </v-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import userService from "../services/userService";

const isLoading = ref(true);
const accountActivated = ref(false);

const props = defineProps({
    token: String
})

onMounted(async () => {
    isLoading.value = true;
    const response = await userService.activateUser(props.token || '');
    isLoading.value = false;
    if (response) {
        accountActivated.value = true;
    } else {
        accountActivated.value = false;
    }
})
</script>