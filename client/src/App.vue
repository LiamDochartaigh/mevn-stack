<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style>
a {
  color: rgba(var(--v-theme-primary));
  text-decoration: none;
}

.hvr-shrink {
  -webkit-transition-duration: 0.3s !important;
  transition-duration: 0.3s !important;
  -webkit-transition-property: transform !important;
  transition-property: transform !important;
}

.hvr-shrink:hover,
.hvr-shrink:focus,
.hvr-shrink:active {
  -webkit-transform: scale(0.9) !important;
  transform: scale(0.9) !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0f0f0f;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #2CB4D3;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #20788b;
}
</style>