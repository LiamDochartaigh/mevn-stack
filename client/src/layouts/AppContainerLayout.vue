<template>
  <v-app>
    <NotificationBanner v-if="user?.email_confirmed === false" icon="mdi-alert-circle"
      :message="`Please activate your account to access all features. We've sent an activation email to ${user.email}.`"
      actionMessage="Resend Activation" actionFinishedMessage="Email Sent" :action="notificationAction" />

    <v-app-bar clipped-left app class="pl-3 pr-3">
      <slot name="prepend"></slot>
      <router-link :to="RouteIdentifier.Home.path">
        <v-img alt="Logo" class="shrink" contain :src="logo" transition="scale-transition" width="40" />
      </router-link>

      <v-spacer></v-spacer>

      <template v-if="!isLoggedIn">
        <v-dialog transition="scale-transition" width="500">
          <template v-slot:activator="{ props }">
            <v-btn class="hvr-shrink bg-primary mr-2" rounded v-bind="props">
              <span>Sign Up</span>
            </v-btn>
          </template>
          <RegisterForm />
        </v-dialog>
        <v-dialog v-model="authStore.loginPrompt" transition="scale-transition" width="500">
          <template v-slot:activator="{ props }">
            <v-btn class="hvr-shrink bg-primary mr-2" rounded v-bind="props" target="_blank">
              <span>Log In</span>
            </v-btn>
          </template>

          <LoginForm />
        </v-dialog>
      </template>
      <template v-else-if="isLoggedIn">
        <v-menu offset-x offset-y>
          <template v-slot:activator="{ props }">
            <div>
              <v-btn icon v-bind="props">
                <v-avatar>
                  <v-img transition="scale-transition" :src="userAvatar" />
                </v-avatar>
              </v-btn>
            </div>
          </template>

          <v-list min-width="200px">
            <v-list-item v-for="(item, index) in menuDropdown" :key="index" @click="item.action">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main class="main">
      <v-container class="mt-4 mb-4">
        <slot></slot>
      </v-container>
    </v-main>
    <v-footer>
      <v-row justify="center" no-gutters>
        <v-col class="py-2 text-center" cols="12">
          {{ new Date().getFullYear() }} — {{ organizationName }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { MoveRoute, RouteIdentifier } from "../router";
import logo from "../assets/Logo.png";
import defaultAvatar from "../assets/default_avatar.webp";
import userService from "../services/userService";
import { useUserStore } from "../store";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import NotificationBanner from "../components/NotificationBanner.vue";

const organizationName = import.meta.env.VITE_APP_ORGANIZATION_NAME;
const authStore = useUserStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

const userAvatar = computed(() => {
  if (user.value?.user_avatar_URL) {
    return user.value.user_avatar_URL;
  }
  return defaultAvatar;
});

const logOutAction = async function () {
  const loggedOut = await userService.logOutUser();
  if (loggedOut) {
    MoveRoute(RouteIdentifier.Home);
  }
};

const notificationAction = async function () {
  return await userService.sendActivationEmail();
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

.main {
  min-height: 100vh;
}
</style>