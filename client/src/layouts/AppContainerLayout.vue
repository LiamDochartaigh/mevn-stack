<template>
  <v-app>
    <NotificationBanner
    v-if="notificationActive"
    :icon="notificationIcon"
    :message="notificationMessage"
    :actionMessage="notificationActionMessage"
    :action="notificationAction" />
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
          <RegisterForm />
        </v-dialog>
        <v-dialog v-model="loginDialog" transition="scale-transition" width="500">
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

    <v-main class="main">
      <slot></slot>
    </v-main>
    <v-footer>
      <v-row justify="center" no-gutters>
        <v-col class="py-2 text-center" cols="12">
          {{ new Date().getFullYear() }} — Company Name
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { MoveRoute, RouteIdentifier } from "../router";
import logo from "../assets/Logo.png";
import userService from "../services/userService";
import { useAuthStore } from "../store";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import NotificationBanner from "../components/NotificationBanner.vue";

const loginDialog = ref(false);
const signUpDialog = ref(false);
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

//Notification Banner
const notificationActive = ref(false);
const notificationMessage = ref("");
const notificationActionMessage = ref("");
const notificationAction = ref(() => {});
const notificationIcon = ref("");

const logOutAction = async function () {
  const loggedOut = await userService.logOutUser();
  if (loggedOut) {
    MoveRoute(RouteIdentifier.Home);
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

.main {
  min-height: 100vh;
}
</style>