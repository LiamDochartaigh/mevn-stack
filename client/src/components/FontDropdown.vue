<template>
    <v-row align="center">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link :href="fontsString" rel="stylesheet" />
        <v-col cols="12" sm="6">
            <strong>Font</strong>
        </v-col>
        <v-col cols="12" sm="6">
            <v-select :items="googleFonts" :value="value" @input="$emit('input', GetFont($event))" item-text="family">
                <template #item="{ item, on, attrs }">
                    <v-list-item :style="{ fontFamily: `${item.family}, ${item.category}` }" v-bind="attrs" v-on="on">
                        {{ item.family }}
                    </v-list-item>
                </template>
                <template #selection="{ item }">
                    <span :style="{ fontFamily: `${item.family}, ${item.category}` }">
                        {{ item.family }}
                    </span>
                </template>
            </v-select>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import fonts from "../assets/fonts.json";
import { defineEmits, defineProps, onMounted, ref } from "vue";
const googleFonts = fonts.map((font) => ({ family: font.family, category: font.category, variants: font.variants }));

const fontsString = ref("");

function GetFont(fontFamily: string) {
    return googleFonts.filter(font => {
        return font.family === fontFamily;
    })[0];
}

function GetAllFonts() {
    let fontAggregate = `https://fonts.googleapis.com/css2?family=${googleFonts[0].family}`;
    googleFonts.forEach(font => {
        fontAggregate += `&family=${font.family}`
    });
    fontsString.value = fontAggregate;
}

onMounted(() => {
    GetAllFonts();
    emit("input", GetFont(googleFonts[0].family));
})

defineProps({
    value: String
})
const emit = defineEmits({
    input: Object
})
</script>

<style scoped></style>