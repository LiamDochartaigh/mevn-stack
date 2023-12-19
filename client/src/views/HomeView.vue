<template>
  <DefaultLayout>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>
      <v-col class="mb-4">
        <h1 class="text-h3 font-weight-bold mb-3">Home Page</h1>
        <p class="text-subtitle-1 font-weight-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <router-link :to="RouteIdentifier.Dashboard.path">
          <v-card elevation="2" max-width="400px" class="rounded-xl hvr-shrink">
            <v-img class="align-end" src="">
            </v-img>
            <v-card-title>Page 1</v-card-title>
            <v-card-subtitle>Page Description Here</v-card-subtitle>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { RouteIdentifier } from "../router";
</script>