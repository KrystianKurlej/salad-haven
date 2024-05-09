<template>
  <div class="wrapper">
    <h1>Twoja sałatka to:</h1>
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

    
    <button size="large" variant="secondary" @click="clearLocalStorage">Wyczyść localStorage i odśwież stronę</button> 
    <!-- dodaj do koszyka to co mamy w tablicy 
    i wyczyść locacl storage to trzeba to dorobić-->

      <button-component  size="large" variant="secondary">
    <router-link title="Konfigurator" to="/konfigurator/" class="btn-link">
      Edytuj
      <ArrowRightIco width="24" height="24"/>
    </router-link>
  </button-component>
  </div>
</template>

<script setup>
import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
import { API_URL } from '@src/main.js';
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
