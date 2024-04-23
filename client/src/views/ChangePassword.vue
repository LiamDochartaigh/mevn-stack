<template>
    <DefaultLayout>
        <v-row v-if="!isLoading" class="text-center justify-center">
            <v-col cols="12"></v-col>
            <v-col cols="8" class="mb-4 mt-15">
                <v-card>
                    <v-card-title class="text-h5  text-center bg-primary">
                        Change Your Password
                    </v-card-title>

                    <v-form ref="passwordResetForm" v-model="passwordResetValid" @submit.prevent="passwordResetSubmit">
                        <v-card-text class="text-center">
                            <v-row>
                                <v-col cols="12">
                                    <v-alert v-if="passwordResetError" type="error" dense dismissible
                                        @input="passwordResetError = false">
                                        Password reset link is invalid or has expired.
                                    </v-alert>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="accountEmail" :rules="emailRules" autocomplete="email"
                                        label="Email" outlined required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field @click:append-inner="showNewPassword = !showNewPassword"
                                        :type="showNewPassword ? 'text' : 'password'" v-model="newPassword"
                                        :rules="passwordRules" autocomplete="current-password"
                                        :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'" required
                                        label="New Password" outlined></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        @click:append-inner="showPasswordConfirmation = !showPasswordConfirmation"
                                        :type="showPasswordConfirmation ? 'text' : 'password'" v-model="confirmPassword"
                                        :rules="confirmPasswordRules" autocomplete="current-password"
                                        :append-inner-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                                        required label="Confirm New Password" outlined></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" rounded type="submit">
                                Login
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
import router from "../router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import userService from "../services/userService";
import { VForm } from "vuetify/components";

const isLoading = ref(true);

const passwordResetValid = ref(false);
const passwordResetError = ref(false);

const accountEmail = ref('');
const showNewPassword = ref(false);
const showPasswordConfirmation = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const passwordResetForm: Ref<InstanceType<typeof VForm> | null> = ref(null);

const emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
    (v: string) => !!v || "Password is required",
    (v: string) => v.length >= 8 || "Password must be at least 8 characters",
];

const confirmPasswordRules = [
    (v: string) => v === newPassword.value || "Passwords do not match",
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
    const response = await userService.validatePasswordResetToken(router.currentRoute.value.query.token?.toString() || '');
    if (!response) {
        router.replace({ name: 'password-recovery', query: { error: "invalidToken" } });
    }
    isLoading.value = false;
})
</script>