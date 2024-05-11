<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <h1>Koszyk</h1>

    <div v-if="isEmpty" class="empty-cart">
      
      <p>Koszyk jest pusty.</p>
      <img src="/images/empty-icon.png" alt="Pusty koszyk" class="cart-icon">
    </div>
    <div v-else>
      <ul>
        <li v-for="product in cart" :key="product.id">
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
    
    <div class="empty-button">
      <button @click="proceedToOrder()">Przejdź do zamówienia</button>
      <router-link title="Order" to="/order" class="btn-link"></router-link>
      <button @click="continueShopping()">Kontynuuj zakupy</button>
    </div>
  </div>
</template>

<script setup>
import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
import { API_URL } from '@src/main.js';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
</script>


<script>
export default {
  data() {
    return {
      cart: [] 
    };
  },
  computed: {
    isEmpty() {
      return this.cart.length === 0; 
    }
  },
  methods: {
    addItemToCart(item) {
      // Jeśli item jest przekazany, dodaj go do koszyka
      if (item) {
        this.cart.push(item);
      } else {
        // Domyślnie dodaj jakiś produkt do koszyka
        const defaultProduct = { id: 1, name: 'Domyślny produkt', price: 10 };
        this.cart.push(defaultProduct);
      }
    },
    proceedToOrder() {
      // Przekazujemy cały koszyk jako argument do metody addItemToCart
      this.addItemToCart(this.cart); 
      // Tutaj można dodać kod odpowiedzialny za przekierowanie do strony zamówienia
    },
    continueShopping() {
      // Tutaj można dodać kod odpowiedzialny za kontynuowanie zakupów
    }
  }
};
</script>
