<template>
    <v-overlay
    :persistent="true"
    :contained="contained"
    class="justify-center align-center loading-overlay"
    :class="dark ? 'dark-loading-overlay' : 'light-loading-overlay'"
    :model-value="true" absolute>
        <v-progress-circular indeterminate size="64" width="7" color="blue"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">

defineProps({
    contained: {
        type: Boolean,
        default: false
    },
    dark: {
        type: Boolean,
        default: true
    }
})

</script>

<style>
.loading-overlay .v-overlay__scrim .dark-loading-overlay{
    background-color: rgba(0, 0, 0);
    opacity: 1;
}

.loading-overlay .v-overlay__scrim .light-loading-overlay{
    background-color: rgb(83, 83, 83);
    opacity: 0.5;
}
</style>