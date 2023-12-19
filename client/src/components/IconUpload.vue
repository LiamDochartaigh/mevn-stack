<template>
    <div>
        <div class="hex-icon-upload pa-2 justify-center">
            <input class="hex-icon-upload-input" @input="FileSelected" ref="uploadIcon" accept="image/*" type="file">
            <div class="hex-icon-upload-inner" @click="UploadIcon">
                <v-img contain :src="uploadedIcon" v-if="uploadedIcon.length > 0"></v-img>
                <v-row v-else class="text-center">
                    <v-icon class="upload-items">mdi-upload</v-icon>
                    <span class="upload-items text-caption">Max Size {{ `${maxFileSize/1000000}mb`}}</span>
                </v-row>
            </div>
            <div class="hex-icon-upload-cancel">
                <v-btn v-if="uploadedIcon.length > 0" color="primary" icon @click="ClearIconUpload">
                    <v-icon>fa-solid fa-circle-xmark</v-icon>
                </v-btn>
            </div>
        </div>
        <span class="v-messages error--text">{{ currentError }}</span>
    </div>
</template>

<script setup lang="ts">

import { ref, defineEmits } from "vue";

const uploadedIcon = ref("")
const uploadIcon = ref();
const currentError = ref("");
const maxFileSize = 2000000;

function UploadIcon() {
    uploadIcon.value.click();
}

function ClearIconUpload() {
    uploadedIcon.value = "";
    emit('updated', uploadedIcon.value);
}

function FileSelected(event: any) {
    const newFile: File = event.target.files[0];
    if (newFile && newFile.size < maxFileSize) {
        uploadedIcon.value = URL.createObjectURL(newFile);
        currentError.value = "";
        emit('updated', uploadedIcon.value);
    }
    else {
        uploadedIcon.value = "";
        currentError.value = "File Size Too Large. Max Upload 2mb."
    }
}

const emit = defineEmits(['updated']);

</script>

<style scoped>
.hex-icon-upload {
    width: 200px;
    height: 100px;
    display: flex;
    border: 1px rgb(78, 78, 78);
    border-style: dashed;
    position: relative;
    background-color: var(--v-bgSecondary-base);
    transition: 0.3s;
}

.hex-icon-upload-cancel {
    right: 0;
    top: 0;
    position: absolute;
}

.hex-icon-upload-input {
    opacity: 0;
    width: 0;
    pointer-events: none;
}

.hex-icon-upload:hover {
    cursor: pointer;
    background-color: var(--v-bgLighten-base);
    transition: 0.3s;
}

.hex-icon-upload-inner {
    display: flex;
    flex-grow: 1;
    justify-content: center;
}

.upload-items{
    flex: 0 0 100%;
}
</style>