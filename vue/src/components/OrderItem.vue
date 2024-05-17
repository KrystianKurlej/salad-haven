<template>
    <li class="order">
        <h4 class="title">{{ order.products.length }} sałatki</h4>
        <p>Data zamówienia: {{ order.date }}</p>
        <p>{{ calculateTotalPrice(order.products) }} zł</p>
        <button-component variant="secondary" @click="toggleProductsList" id="expand" :class="{ active: isProductsListExpanded }">
            <DownChevron width="20" height="20" />
        </button-component>
        <ul class="products-list" v-show="isProductsListExpanded">
        <li class="product" v-for="(product, productIndex) in order.products" :key="productIndex">
            <div class="product-header">
            <h6 class="title">{{ product.title }}</h6>
            <span class="price">{{ product.price.toFixed(2) }} zł</span>
        </div>
        <p class="description">{{ product.shortDescription }}</p>
        </li>
        </ul>
    </li>
</template>
  
<script setup>
import DownChevron from '@components/icons/DownChevron.vue';
</script>

<script>
export default {
name: 'OrderItem',
props: {
    order: {
    type: Object,
    required: true
    },
    calculateTotalPrice: {
    type: Function,
    required: true
    }
},
data() {
    return {
    isProductsListExpanded: false
    };
},
methods: {
    toggleProductsList() {
    this.isProductsListExpanded =!this.isProductsListExpanded;
    }
}
}
</script>