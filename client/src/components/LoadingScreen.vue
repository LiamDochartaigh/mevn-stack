<template>
    <v-overlay :opacity="1" :persistent="true" class="justify-center align-center loading-overlay" :model-value="true" absolute>
        <v-progress-circular indeterminate size="64" width="7" color="blue"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
</script>

<style>
.loading-overlay .v-overlay__scrim{
    background-color: rgba(0, 0, 0);
    opacity: 1;
}
</style>