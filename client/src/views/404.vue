<template>
    <DefaultLayout>
        <div class="text-center py-12">
            <h1 class="text-h1 font-weight-bold mb-3">404</h1>
            <h2 class="text-h2 font-weight-bold mb-8">Page Not Found</h2>
            <router-link :to="RouteIdentifier.Home.path">
                <v-btn class="hvr-shrink pl-5 pr-5 bg-primary" size="x-large" rounded>
                    Go Home
                </v-btn>
            </router-link>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { RouteIdentifier } from '../router';
</script>