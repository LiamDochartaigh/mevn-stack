<template>
    <DefaultLayout>
        <v-card v-if="!isLoading">
            <v-card-title class="text-h5  text-center bg-primary">
                Change Your Password
            </v-card-title>

            <v-form ref="passwordResetForm" v-model="passwordResetValid" @submit.prevent="passwordChangeSubmit">
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
                            <v-text-field @click:append-inner="showNewPassword = !showNewPassword"
                                :type="showNewPassword ? 'text' : 'password'" v-model="newPassword"
                                :rules="passwordRules" autocomplete="current-password"
                                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'" required
                                label="New Password" outlined></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field @click:append-inner="showPasswordConfirmation = !showPasswordConfirmation"
                                :type="showPasswordConfirmation ? 'text' : 'password'" v-model="confirmPassword"
                                :rules="confirmPasswordRules" autocomplete="current-password"
                                :append-inner-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'" required
                                label="Confirm New Password" outlined></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="hvr-shrink pl-5 pr-5 bg-primary mb-2" size="x-large" rounded type="submit">
                        Reset Password
                    </v-btn>
                </v-card-actions>
            </v-form>
            <LoadingScreen v-if="sendingRequest" :contained="true" :dark="false" />
        </v-card>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import router from "../router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import userService from "../services/userService";
import { VForm } from "vuetify/components";
import LoadingScreen from "../components/LoadingScreen.vue";

const isLoading = ref(true);

const passwordResetValid = ref(false);

const showNewPassword = ref(false);
const showPasswordConfirmation = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const passwordResetForm: Ref<InstanceType<typeof VForm> | null> = ref(null);
const token = ref('');
const error = ref(false);
const sendingRequest = ref(false);

const passwordRules = [
    (v: string) => !!v || "Password is required",
    (v: string) => v.length >= 8 || "Password must be at least 8 characters",
];

const confirmPasswordRules = [
    (v: string) => v === newPassword.value || "Passwords do not match",
];

const passwordChangeSubmit = async () => {
    sendingRequest.value = true;
    const isValid = await passwordResetForm.value?.validate();

    if (!(isValid?.valid)) { sendingRequest.value = false; return; }

    const response = await userService.passwordChange(token.value, newPassword.value);
    sendingRequest.value = true;
    if (!response) { error.value = true; }
    else {
        router.push({ name: 'login' })
    }
};

onMounted(async () => {
    isLoading.value = true;
    token.value = router.currentRoute.value.query.token?.toString() || '';
    const response = await userService.validatePasswordResetToken(token.value);
    isLoading.value = false;
    if (!response) {
        router.replace({ name: 'password-recovery', query: { error: "invalidToken" } });
    }
})
</script>