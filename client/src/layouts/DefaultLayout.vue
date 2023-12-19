<template>
  <AppContainerLayout>
    <v-row>
      <v-main>
        <slot></slot>
      </v-main>
    </v-row>
  </AppContainerLayout>
</template>

<script setup lang="ts">
import AppContainerLayout from './AppContainerLayout.vue';
</script>
