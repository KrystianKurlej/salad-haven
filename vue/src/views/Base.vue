<template>
  <div class="wrapper">
    <h1>Baza</h1>
    <p>Wybrane składniki: {{ selectedCount }} / 1 </p>
    <div v-for="ing in selectedIngs" :key="ing.id">
      <p>{{ ing.name }}</p>
    </div>
  </div>

  <section id="employees" class="home-section">
    <div class="slider">
      <div class="employees">
        <div v-for="i in filteredIngs" :key="i.id" class="employee-card" @click="toggleSelectedIngredient(i)">
          <img :src="i.imgSrc" :alt="'Zdjęcie ' + i.name" :class="{ 'selected': isSelectedIngredient(i) }">
          <h3 class="title">{{ i.name }}</h3>
          <p class="role">{{ i.id }}</p>
        </div>
      </div>
    </div>
    <button-component v-if="selectedCount > 0" size="large" variant="secondary">
    <router-link title="Konfigurator" to="/konfigurator/vegie" class="btn-link">
      Dalej
      <ArrowRightIco width="24" height="24"/>
    </router-link>
  </button-component>
  </section>
</template>

<script setup>
  import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
  import { API_URL } from '@src/main.js';
  import { useRouter } from 'vue-router';
</script>

<script>
  export default {
    data() {
      return {
        ings: [],
        selectedIngs: [],
        selectedCount: 0
      };
    },
    computed: {
      filteredIngs() {
        return this.ings.filter(ing => ing.category === 'base');
      }
    },
    async created() {
      try {
        const response = await fetch(API_URL + '/ingridients');
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
    methods: {
      toggleSelectedIngredient(ingredient) {
        const selectedIngIds = JSON.parse(localStorage.getItem('selectedIngredients') || '[]');
        const index = selectedIngIds.indexOf(ingredient.id);

        // Sprawdzenie czy liczba wybranych składników nie przekracza 2
        if (this.selectedCount >= 1 && index === -1) {
          // Jeśli już wybrano maksymalną ilość składników i próba dodania nowego, zakończ funkcję
          return;
        }

        // Dodawanie lub usuwanie składnika z listy wybranych składników
        if (index !== -1) {
          selectedIngIds.splice(index, 1);
        } else {
          selectedIngIds.push(ingredient.id);
        }

        // Zapisanie zmian w local storage i aktualizacja stanu komponentu
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngIds));
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      },
      isSelectedIngredient(ingredient) {
        return this.selectedIngs.some(ing => ing.id === ingredient.id);
      }
    }
  }
</script>

<style scoped>
  .employee-card {
    cursor: pointer;
  }
  .employee-card img.selected {
    border: 5px solid green;
  }
</style>




  