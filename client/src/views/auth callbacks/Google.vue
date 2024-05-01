<template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../../router';
import {loginGoogleUser} from '../../services/userService';

onMounted(async () => {
    const code = router.currentRoute.value.query.code;
    if (code && (typeof code === 'string')) {
        await loginGoogleUser(code);
        router.push({ name: 'home' });
    }
})

</script>