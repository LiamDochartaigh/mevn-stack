<template>
    <DefaultLayout>
        <h1 class="text-h3 font-weight-bold mb-3">Page Not Found</h1>
        <router-link :to="RouteIdentifier.Home.path">
            <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" rounded>
                Go Home
            </v-btn>
        </router-link>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { RouteIdentifier } from '../router';
</script>