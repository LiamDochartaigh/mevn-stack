<template>
  <v-text-field
    :value="props.value"
    :key="textFieldKey"
    v-on:change="UpdateTextField"
    hide-details
    class="ma-0 pa-0"
    solo
  >
    <template v-slot:append>
      <v-menu
        v-model="menu"
        top
        nudge-bottom="105"
        nudge-left="16"
        :close-on-content-click="false"
        v-on:input="ValidateColor"
      >
        <template v-slot:activator="{on}">
          <div :style="swatchStyle" v-on="on" />
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-color-picker :value="props.value"  v-on:input="localColor = $event" flat />
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref} from 'vue';

let menu = false;

const props = defineProps({
  value: { type: String, required: true }
});

const localColor = ref("");

let swatchStyle = computed(() => {
    return {
        backgroundColor: props.value,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
    }
});

const emit = defineEmits(['input']);

let textFieldKey = ref(1);

function UpdateTextField(newColor: string){
  localColor.value = newColor; 
  ValidateColor(); 
}

function ValidateColor(){
  if(localColor.value.split('')[0] != "#"
  || !(/^#[0-9A-F]{6}$/i.test(localColor.value))){
    localColor.value = "#FFFFFF";
    textFieldKey.value++;
  }
  emit("input", localColor.value);
}
</script>
