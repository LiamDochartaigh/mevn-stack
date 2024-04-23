<template>
    <DefaultLayout>
        <v-row v-if="!isLoading" class="text-center justify-center">
            <v-col cols="12"></v-col>
            <v-col cols="8" class="mb-4 mt-15">
                <v-card>
                    <v-card-title class="text-h5  text-center bg-primary">
                        Reset Your Password
                    </v-card-title>

                    <v-form ref="passwordResetForm" v-model="passwordResetValid" @submit.prevent="passwordResetSubmit">
                        <v-card-text class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    <v-alert v-if="error" type="error" dense dismissible>
                                        Password reset link is invalid or has expired.
                                    </v-alert>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="accountEmail" :rules="emailRules" autocomplete="email"
                                        label="Email" outlined required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" rounded type="submit">
                                Reset Password
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { VForm } from "vuetify/components";
import router from "../router";
import { userInfo } from "os";
import userService from "../services/userService";

const isLoading = ref(true);

const passwordResetValid = ref(false);
const error = ref(false);

const accountEmail = ref('');
const passwordResetForm: Ref<InstanceType<typeof VForm> | null> = ref(null);

const emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordResetSubmit = async () => {
    const isValid = await passwordResetForm.value?.validate();
    if (isValid?.valid) {
        //const response = await userService.loginUser(accountEmail.value, newPassword.value);
        //if (!response) { passwordResetError.value = true; }
        //If there is no valid token, show the error message and ask for email again with a reset password button?
    }
};

onMounted(async () => {
    isLoading.value = true;
    if (router.currentRoute.value.query.error) {
        error.value = true;
        //const response = await userService.validatePasswordResetToken(router.currentRoute.value.query.token);
        //if (!response) { error.value = true; }
    }
    //Validate the token here, get from the props
    //const response = await userService.activateUser(props.token || '');
    isLoading.value = false;
})
</script>