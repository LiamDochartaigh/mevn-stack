<template>
    <DefaultLayout>
        <v-row class="text-center justify-center">
            <v-col cols="12"></v-col>
            <v-col cols="8" class="mb-4 mt-15">
                <LoginForm />
            </v-col>
        </v-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
import DefaultLayout from "../layouts/DefaultLayout.vue";
</script>

<style></style>