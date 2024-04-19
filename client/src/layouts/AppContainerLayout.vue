<template>
  <v-app>
    <v-app-bar clipped-left app class="pl-3">
      <slot name="prepend"></slot>
      <router-link :to="RouteIdentifier.Home.path">
        <v-img alt="Logo" class="shrink" contain :src="logo" transition="scale-transition" width="40" />
      </router-link>

      <v-spacer></v-spacer>

      <template v-if="!isLoggedIn">
        <v-dialog v-model="signUpDialog" transition="scale-transition" width="500">
          <template v-slot:activator="{ props }">
            <v-btn class="hvr-shrink bg-primary mr-2" rounded v-bind="props" target="_blank">
              <span>Sign Up</span>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5  text-center bg-primary">
              Register
            </v-card-title>
            <v-form ref="signUpForm" v-model="signupValid" @submit.prevent="signUpSubmit">
              <v-card-text class="text-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="signUpEmail" :rules="emailRules" label="Email" outlined
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field @click:append-inner="showSignUpPassword = !showSignUpPassword"
                      :type="showSignUpPassword ? 'text' : 'password'" v-model="signUpPassword" :rules="passwordRules"
                      :append-inner-icon="showSignUpPassword ? 'mdi-eye-off' : 'mdi-eye'" required label="Password"
                      outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" type="submit" rounded>
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="loginDialog" transition="scale-transition" width="500">
          <template v-slot:activator="{ props }">
            <v-btn class="hvr-shrink bg-primary mr-2" rounded v-bind="props" target="_blank">
              <span>Log In</span>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5  text-center bg-primary">
              Log In
            </v-card-title>

            <v-form ref="loginForm" v-model="loginValid" @submit.prevent="loginSubmit">
              <v-card-text class="text-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="emailRules" label="Email" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field @click:append-inner="showLoginPassword = !showLoginPassword"
                      :type="showLoginPassword ? 'text' : 'password'" v-model="loginPassword" :rules="passwordRules"
                      :append-inner-icon="showLoginPassword ? 'mdi-eye-off' : 'mdi-eye'" required label="Password"
                      outlined></v-text-field>
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
        </v-dialog>
      </template>
      <template v-else-if="isLoggedIn">
        <v-menu offset-x offset-y>
          <template v-slot:activator="{ props }">
            <div>
              <v-btn icon v-bind="props">
                <v-avatar>
                  <v-img transition="scale-transition" />
                </v-avatar>
              </v-btn>
            </div>
          </template>

          <v-list min-width="200px">
            <v-list-item v-for="(item, index) in menuDropdown" :key="index" @click="item.action">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <slot></slot>
    <v-footer padless app>
      <v-row justify="center" no-gutters>
        <v-col class="py-2 text-center" cols="12">
          {{ new Date().getFullYear() }} — Company Name
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
  
<script setup lang="ts">
import { Ref, ref, computed} from "vue";
import { MoveRoute, RouteIdentifier } from "../router";
import logo from "../assets/Logo.png";
import { VForm } from "vuetify/components";
import userService from "../services/userService";
import { useAuthStore } from "../store";

const loginDialog = ref(false);
const signUpDialog = ref(false);
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

const signupValid = ref(false);
const signUpEmail = ref('');
const signUpPassword = ref('');
const showSignUpPassword = ref(false);
const signUpForm: Ref<InstanceType<typeof VForm> | null> = ref(null);

const loginValid = ref(false);
const loginEmail = ref('');
const loginPassword = ref('');
const showLoginPassword = ref(false);
const loginForm: Ref<InstanceType<typeof VForm> | null> = ref(null);

const logOutAction = async function () {
  const loggedOut = await userService.logOutUser();
  if (loggedOut) {
    MoveRoute(RouteIdentifier.Home);
  }
};

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
    userService.registerUser(signUpEmail.value, signUpPassword.value);
  }
};

const loginSubmit = async () => {
  const isValid = await loginForm.value?.validate();
  if (isValid?.valid) {
    //Send to API
  }
};

const menuDropdown = [
  { title: "Log Out", icon: "mdi-logout", action: logOutAction },
];
</script>
  
<style>
.app {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
</style>