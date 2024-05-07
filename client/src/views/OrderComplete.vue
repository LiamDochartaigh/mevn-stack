<template>
    <DefaultLayout>
        <v-row class="text-center">
            <v-col cols="12"></v-col>
            <v-col class="mb-4 mt-15">
                <h1 class="text-h3 font-weight-bold mb-3">Order Completed</h1>
                <p>Thank you. Your order has been completed</p>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Product
                            </th>
                            <th class="text-left">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from '../router';
import { GetOrder } from "../services/orderService";


onMounted(async() => {
    const sessionID = router.currentRoute.value.params.session_id;
    if(!sessionID && typeof sessionID !== 'string'  || Array.isArray(sessionID)) return;
    const order = await GetOrder(sessionID);
});

</script>