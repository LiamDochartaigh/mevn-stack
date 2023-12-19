<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="800" style="{max-height: 600px;}">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="hvr-shrink pl-5 pr-5" x-large rounded color="primary" v-bind="attrs" v-on="on">
          Choose Icon
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h4 justify-center">
          Icon Picker
        </v-card-title>
        <v-card-subtitle>
          <v-text-field @input="SearchIcons" class="pl-12 pr-12" label="Search"></v-text-field>
        </v-card-subtitle>
        <v-card-text>
          <v-row dense class="pa-4" justify="center">
            <v-col cols="auto" align="center" v-for="(item, index) in filteredIcons" v-bind:key="index">
              <v-btn class="pa-1" @click="NewIconSelected(item)" depressed width="100" 
              height="100">
                <v-icon size="70">
                  {{ item.mdi }}
                </v-icon></v-btn>
            </v-col>
          </v-row></v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits} from "vue";
import Fuse from "fuse.js";
import {AppIcon, panelIcons} from '../util/AppIcons'

const dialog = ref(false);

const fuse = new Fuse(panelIcons.map(icon => icon.tag));

const filteredIcons = ref(panelIcons);

function SearchIcons(query: string) {
  const filteredIconbyTag = fuse.search(query);
  const newFilteredIcons: AppIcon[] = [];

  if (query) {
    filteredIconbyTag.forEach(tag => {
      newFilteredIcons.push(panelIcons[tag.refIndex]);
    })
    filteredIcons.value = newFilteredIcons;
  }
  else{
    filteredIcons.value = panelIcons;
  }
}

function NewIconSelected(newIcon: AppIcon) {
  dialog.value = false;
  emit("updated", newIcon);
}

const emit = defineEmits(['updated']);

</script>

<style></style>