<template>
  <DashboardLayout>
    <template v-if="!loadBlock">
      <v-row align="center" class="text-center">
        <v-col cols="6">
          <v-subheader>
            <span class="pr-3">Font Size</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <v-icon right color="primary" v-bind="props">
                  mdi-information-outline
                </v-icon>
              </template>
              <span>Size of text used for usernames</span>
            </v-tooltip>
          </v-subheader>
        </v-col>
        <v-col cols="6">
          <v-slider max="24" min="4">
            <template v-slot:append>
              <v-text-field class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
            </template></v-slider>
        </v-col>
      </v-row>
    </template>
    <v-overlay v-else :opacity="1" :value="true">
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { ref, onMounted } from "vue";
const loadBlock = ref(true);

onMounted(async () => {
  loadBlock.value = false;
});
</script>

<style></style>