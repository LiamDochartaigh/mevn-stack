<template>
    <DefaultLayout>
        <v-row v-if="!isLoading" class="text-center">
            <v-col cols="12"></v-col>
            <v-col class="mb-4 mt-15">
                <h1 class="text-h3 font-weight-bold mb-3">Thank You For Activating Your Account</h1>
                <router-link :to="RouteIdentifier.Home.path">
                    <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" rounded>
                        Go Home
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { RouteIdentifier } from '../router';
import userService from "../services/userService";

const isLoading = ref(true);
const props = defineProps({
    token: String
})

onMounted(async() => {
    console.log(props.token);
    const response = await userService.activateUser(props.token || '');
    if(response) {
        console.log('User activated');
    } else {
        console.log('User already activated or token expired');
    }
    //Add loading spinner whilst waiting for response
    //Handle user activation and when user is already activated or token expired
})

</script>