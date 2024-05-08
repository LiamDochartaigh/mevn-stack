<template>
    <DefaultLayout>
        <template v-if="!orderError">
            <div class="text-center">
                <h1 class="text-h3 font-weight-bold mb-3">Order Completed</h1>
                <p class="mb-3">Thank you. Your order has been completed</p>
            </div>
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
                    <tr v-for="item in order?.products" :key="item.product_ID">
                        <td>{{ item.name }}</td>
                        <td>{{ `$${item.unit_Price / 100}` }}</td>
                    </tr>
                </tbody>
            </v-table>
        </template>
        <template v-else>
            <div class="text-center">
                <h1 class="text-h3 font-weight-bold mb-3">Order Not Found</h1>
                <p class="mb-3">Sorry, we could not find your order</p>
                <span>Please contact support <a :href='`mailto:${supportEmail}`'>{{ supportEmail }}</a></span>
            </div>
        </template>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from '../router';
import { GetOrder, Order } from "../services/orderService";
import { useUIStore } from "../store";

const order = ref<Order>();
const orderError = ref(false);
const uiStore = useUIStore();
const supportEmail = import.meta.env.VITE_APP_SUPPORT_EMAIL;

onMounted(async () => {
    const sessionID = router.currentRoute.value.query.session_id;
    if (!sessionID && typeof sessionID !== 'string' || Array.isArray(sessionID)) return;

    let retries = 0;
    const maxRetries = 4;
    let retrieveOrder = null;
    uiStore.showLoading();

    while (retries < maxRetries && !retrieveOrder) {
        retrieveOrder = await GetOrder(sessionID);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    uiStore.hideLoading();

    if (retrieveOrder) {
        order.value = retrieveOrder;
    }
    else {
        orderError.value = true;
        console.error('Failed to retrieve order');
    }
});

</script>