<template>
  <DefaultLayout>
    <div class="text-center">
      <h1 class="text-h3 font-weight-bold mb-3">Home Page</h1>
      <p class="text-subtitle-1 font-weight-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <v-row class="justify-center text-center mt-3">
      <v-card v-for="product in products" :key="product._id" elevation="2" max-width="400px"
        @click="BuyProduct(product)" class="rounded-xl hvr-shrink">
        <v-img class="align-end" :src="product.image_URL">
        </v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>{{ product.description }}</v-card-subtitle>
      </v-card>
    </v-row>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { onMounted, ref } from 'vue';
import { Product, getProducts } from "../services/productService";
import { initiateStripePurchase } from "../services/paymentService";
import { useUserStore, useUIStore } from "../store";

const uiStore = useUIStore();
const products = ref<Product[] | undefined>([]);
const userStore = useUserStore();

async function BuyProduct(product: Product) {
  const products = [product];
  uiStore.showLoading();
  const stripeCheckoutURL = await initiateStripePurchase(products);
  uiStore.hideLoading();
  if (stripeCheckoutURL) { window.location.href = stripeCheckoutURL; }
  else {
    userStore.promptLogin();
  }
}

onMounted(async () => {
  products.value = await getProducts();
});
</script>