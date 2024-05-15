<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="configurator-step-view">
      <div class="configurator-steps">
        <div class="configurator-step"><span>Wybierz bazę</span></div>
        <div class="configurator-step active">
          <h1>
            <RightChevron width="24" height="24" class="title-decor"/>
            Owoce i warzywa
          </h1>
          <p>Dodaj świeże i kolorowe składniki - wybierz spośród różnorodnych warzyw, owoców i dodatków, aby nadać swojej sałatce smak i chrupkość.</p>
          <div class="buttons">
            <router-link title="Wybierz bazę" to="baza" class="btn-link">
              <button-component size="large" variant="secondary">
                Wróć
              </button-component>
            </router-link>
            <router-link title="Proteiny" to="proteiny" class="btn-link">
              <button-component size="large" :disabled="selectedCount < 1">
                Dalej
                <ArrowRightIco width="24" height="24"/>
              </button-component>
            </router-link>
          </div>
        </div>
        <div class="configurator-step"><span>Proteiny</span></div>
        <div class="configurator-step"><span>Dressing</span></div>
        <div class="configurator-step"><span>Dodatki</span></div>
        <div class="configurator-step"><span>Gotowe!</span></div>
      </div>

      <div class="configurator-ingredients">
        <p class="info-text">Wybierz maksymalnie 5 składników</p>

        <div class="ingredients">
          <div v-for="i in filteredIngs" :key="i.id" class="ingredient-card" @click="toggleSelectedIngredient(i)">
            <span class="checkmark" v-if="isSelectedIngredient(i)"><Check /></span>
            <img :src="i.imgSrc" :alt="'Zdjęcie ' + i.name" />
            <h3 class="title">{{ i.name }}</h3>
            <p class="price">{{ i.price.toFixed(2) }} zł</p>
          </div>
        </div>

        <ConfiguratorProgress />
      </div>
    </div>
  </div>
 
  <!-- <p>Wybrane składniki: {{ selectedCount }} / 5 </p>
    <div v-for="ing in selectedIngs" :key="ing.id">
      <p>{{ ing.name }}</p>
    </div>

  <section id="employees" class="home-section">
    

    <div style="display: flex; justify-content: center;">
      <router-link title="Baza sałatki" to="baza" class="btn-link">
        <button-component size="large" variant="secondary">
          <ArrowRightIco width="24" height="24" style="transform: rotate(180deg);"/>    
          Wstecz
        </button-component>
      </router-link>
      <router-link title="Proteiny" to="proteiny" class="btn-link">
        <button-component v-if="selectedCount > 0" size="large" variant="secondary">
          Dalej 
          <ArrowRightIco width="24" height="24"/>
        </button-component>
      </router-link>
    </div>
  </section> -->
</template>

<script setup>
  import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
  import { API_URL } from '@src/main.js';
  import RightChevron from '@components/icons/RightChevron.vue';
  import Check from '@components/icons/Check.vue';
  import ConfiguratorProgress from '../components/ConfiguratorProgress.vue';
</script>

<script>
  export default {
    data() {
      return {
        ings: [],
        selectedIngs: [], // Zmieniamy na tablicę wybranych składników
        selectedCount: 0
      };
    },
    computed: {
      filteredIngs() {
        return this.ings.filter(ing => ing.category === 'vegetables');
      }
    },
    async created() {
      try {
        const response = await fetch(API_URL + '/ingredients');
        if (!response.ok) {
          throw new Error('API response was not ok');
        }
        const data = await response.json();
        this.ings = data;

        const selectedIngIds = JSON.parse(localStorage.getItem('selectedVegetables') || '[]');
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      } catch (error) {
        console.error('Problem z pobieraniem danych o Warzywach: ', error)
      }
    },
    methods: {
      toggleSelectedIngredient(ingredient) {
        const selectedIngIds = JSON.parse(localStorage.getItem('selectedVegetables') || '[]');
        const index = selectedIngIds.indexOf(ingredient.id);

        // Sprawdzenie czy liczba wybranych składników nie przekracza 2
        if (this.selectedCount >= 5 && index === -1) {
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
        localStorage.setItem('selectedVegetables', JSON.stringify(selectedIngIds));
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      },
      isSelectedIngredient(ingredient) {
        return this.selectedIngs.some(ing => ing.id === ingredient.id);
      }
    }
  }
</script>