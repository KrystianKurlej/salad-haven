<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="configurator-step-view">
      <div class="configurator-steps">
        <div class="configurator-step"><span>Wybierz bazę</span></div>
        <div class="configurator-step"><span>Owoce i warzywa</span></div>
        <div class="configurator-step"><span>Proteiny</span></div>
        <div class="configurator-step"><span>Dressing</span></div>
        <div class="configurator-step"><span>Dodatki</span></div>
        <div class="configurator-step active">
          <h1>
            <RightChevron width="24" height="24" class="title-decor"/>
            Gotowe!
          </h1>
          <p>Teraz możesz cieszyć się swoją spersonalizowaną sałatką, która idealnie odpowiada Twoim preferencjom. Smacznego!</p>
          <div class="buttons">
            <router-link title="Dodatki" to="dodatki" class="btn-link">
              <button-component size="large" variant="secondary">
                Wróć
              </button-component>
            </router-link>
            <button-component size="large">
              Dodaj do koszyka
              <CartIco width="24" height="24"/>
            </button-component>
          </div>
        </div>
      </div>
      
      <div class="configurator-summary">
        <h2>Twoje zamówienie</h2>
        <ul>
          <li v-if="selectedIngredients.length > 0">
            <strong>Wybrane składniki:</strong>
            <ul>
              <li v-for="ingredientId in selectedIngredients" :key="ingredientId">
                {{ ingredientId }}
              </li>
            </ul>
          </li>
          <li v-else>
            Brak wybranych składników.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { API_URL } from '@src/main.js';
import RightChevron from '@components/icons/RightChevron.vue';
import CartIco from '@components/icons/CartIco.vue';
</script>

<script>
export default {
  data() {
    return {
      localStorage: window.localStorage
    };
  },
  async created() {
      try {
        const response = await fetch(API_URL + '/ingredients');
        if (!response.ok) {
          throw new Error('API response was not ok');
        }
        const data = await response.json();
        this.ings = data;

        const selectedIngIds = JSON.parse(localStorage.getItem('selectedIngredients') || '[]');
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      } catch (error) {
        console.error('Problem z pobieraniem danych o Sałatkach: ', error)
      }
    },
  computed: {
    selectedIngredients() {
      // Pobranie wszystkich kluczy localStorage i sprawdzenie, czy rozpoczynają się od "selected"
      const keys = Object.keys(this.localStorage);
      const selectedKeys = keys.filter(key => key.startsWith('selected'));
      // Pobranie wartości (czyli listy składników) dla każdego klucza
      const selectedIngredients = selectedKeys.flatMap(key => JSON.parse(this.localStorage.getItem(key) || '[]'));
      return selectedIngredients;
    }
  },
  methods: {
    clearLocalStorage() {
      localStorage.clear();
      this.refreshPage();
    },
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>

<style>
/* Stylizacja komponentu */
</style>
