<template>
    <v-card>
        <v-card-title class="text-h5  text-center bg-primary">
            Register
        </v-card-title>
        <v-form ref="signUpForm" v-model="signupValid" @submit.prevent="signUpSubmit">
            <v-card-text class="text-center">
                <v-row>
                    <v-col cols="12">
                        <v-alert v-if="registerError" type="error" dense dismissible @input="registerError = false">
                            This email address is already registered. If this is your email address, please log in or
                            reset
                            your
                            password.
                        </v-alert>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="signUpEmail" :rules="emailRules" label="Email" outlined
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field @click:append-inner="showSignUpPassword = !showSignUpPassword"
                            :type="showSignUpPassword ? 'text' : 'password'" v-model="signUpPassword"
                            :rules="passwordRules" :append-inner-icon="showSignUpPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            required label="Password" outlined></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn class="hvr-shrink pl-5 pr-5 bg-primary mb-2" size="x-large" type="submit" rounded>
                    Register
                </v-btn>
            </v-card-actions>
            <div class="d-flex py-3 justify-space-between align-center">
                <v-divider class="ml-8"></v-divider>
                <span class="pr-2 pl-2">OR</span>
                <v-divider class="mr-8"></v-divider>
            </div>
            <v-card-actions class="justify-center flex-column mb-2">
                <GoogleLoginButton :onClick="loginGoogle" />
            </v-card-actions>
        </v-form>
        <LoadingScreen v-if="sendingRequest" :contained="true" :dark="false"/>
    </v-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { VForm } from "vuetify/components";
import userService from "../services/userService";
import LoadingScreen from "../components/LoadingScreen.vue";
import GoogleLoginButton from "./GoogleLoginButton.vue";

const registerError = ref(false);
const signupValid = ref(false);
const sendingRequest = ref(false);

const signUpEmail = ref('');
const signUpPassword = ref('');
const showSignUpPassword = ref(false);
const signUpForm: Ref<InstanceType<typeof VForm> | null> = ref(null);

const emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
    (v: string) => !!v || "Password is required",
    (v: string) => v.length >= 8 || "Password must be at least 8 characters",
];

const signUpSubmit = async () => {
    const isValid = await signUpForm.value?.validate();
    if (isValid?.valid) {
        sendingRequest.value = true;
        const response = await userService.registerUser(signUpEmail.value, signUpPassword.value);
        sendingRequest.value = false;
        if (!response) { registerError.value = true; }
    }
};

const loginGoogle = async () => {
    const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL);
    const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');
    const responseType = 'code';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`;
    window.location.href = authUrl;
};

</script>
