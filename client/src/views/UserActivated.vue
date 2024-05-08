<template>
    <DefaultLayout>
        <v-row v-if="!isLoading" class="text-center justify-center">
            <v-col v-if="accountActivated">
                <h1 class="text-h3 font-weight-bold mb-3">Account Activated</h1>
                <p>Your account has been activated. You can now login to your account.</p>
            </v-col>
            <v-col v-else>
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
import router from "../router";

const isLoading = ref(true);
const accountActivated = ref(false);

onMounted(async () => {
    isLoading.value = true;
    const token = router.currentRoute.value.query.token?.toString() || '';
    const response = await userService.activateUser(token);
    isLoading.value = false;
    if (response) {
        accountActivated.value = true;
    } else {
        accountActivated.value = false;
    }
})
</script>