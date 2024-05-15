<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="account-panel">
      <nav class="account-menu">
        <span>Panel klienta</span>
        <ul class="menu-list">
          <li class="menu-item">
            <router-link title="Moje dane" to="/konto">Moje dane</router-link>
          </li>
          <li class="menu-item active">Historia zamówień</li>
          <span class="menu-divider"></span>
          <li class="menu-item">
            <button @click="logout">Wyloguj się</button>
          </li>
        </ul>
      </nav>

      <main>
        <h1>Historia zamówień</h1>

        <ul class="history">
          <li class="order" v-for="(order, index) in orders" :key="index">
            <h4 class="title">{{ order.products.length }} sałatki</h4>
            <p>Data zamówienia: {{ order.date }}</p>
            <p>{{ calculateTotalPrice(order.products) }} zł</p>
            <ul class="products-list" v-for="(product, productIndex) in order.products" :key="productIndex">
              <li class="product">
                <div class="product-header">
                  <h6 class="title">{{ product.title }}</h6>
                  <span class="price">{{ product.price.toFixed(2) }} zł</span>
                </div>
                <p class="description">{{ product.shortDescription }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import {API_URL} from '@src/main.js'

const router = useRouter();
const auth = getAuth();

const logout = () => {
  signOut(auth).then(() => {
    localStorage.removeItem('uid');
    router.push('/logowanie')
    console.log('Użytkownik wylogowany.');
  }).catch((error) => {
    console.error('Błąd podczas wylogowywania:', error);
  });
};
</script>
  
<script>
const clientId = localStorage.getItem('uid');

const calculateTotalPrice = (products) => {
    // Sprawdzamy, czy tablica produktów jest pusta
    if (!Array.isArray(products) ||!products.length) {
      return 0; // Zwracamy 0, jeśli tablica jest pusta lub nie jest tablicą
    }

    // Używamy reduce do obliczenia sumy cen
    return products.reduce((accumulator, product) => {
      // Sprawdzamy, czy produkt ma własność price
      if ('price' in product && typeof product.price === 'number') {
        return accumulator + product.price; // Dodajemy cenę produktu do akumulatora
      }
      return accumulator; // Jeśli produkt nie ma ceny, zwracamy akumulator bez zmian
    }, 0); // Akumulator startuje od 0
  }

export default {
    data() {
        return {
            orders: [],
        };
    },
    async created() {
        try {
            const response = await fetch(API_URL + '/orderHistory/' + clientId);
            if (!response.ok) {
                throw new Error('API response was not ok');
            }
            const data = await response.json();
            this.orders = data;
        } catch (error) {
            console.error('Problem z pobieraniem danych historii: ', error)
        }
    }
}
</script>
