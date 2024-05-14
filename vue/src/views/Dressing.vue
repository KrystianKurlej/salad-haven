<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="configurator-step-view">
      <div class="configurator-steps">
        <div class="configurator-step"><span>Wybierz bazę</span></div>
        <div class="configurator-step"><span>Owoce i warzywa</span></div>
        <div class="configurator-step"><span>Proteiny</span></div>
        <div class="configurator-step active">
          <h1>
            <RightChevron width="24" height="24" class="title-decor"/>
            Dressing
          </h1>
          <p>Wybierz ulubiony dressing, który podkreśli smak Twojej sałatki - od tradycyjnego sosu Cezar po lekki sos na bazie jogurtu.</p>
          <div class="buttons">
            <router-link title="Proteiny" to="proteiny" class="btn-link">
              <button-component size="large" variant="secondary">
                Wróć
              </button-component>
            </router-link>
            <router-link title="Dodatki" to="dodatki" class="btn-link">
              <button-component size="large" :disabled="selectedCount < 1">
                Dalej
                <ArrowRightIco width="24" height="24"/>
              </button-component>
            </router-link>
          </div>
        </div>
        <div class="configurator-step"><span>Dodatki</span></div>
        <div class="configurator-step"><span>Gotowe!</span></div>
      </div>

      <div class="configurator-ingredients">
        <p class="info-text">Wybierz maksymalnie 1 składnik</p>

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
        selectedIngs: [],
        selectedCount: 0
      };
    },
    computed: {
      filteredIngs() {
        return this.ings.filter(ing => ing.category === 'dressing');
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

        const selectedIngIds = JSON.parse(localStorage.getItem('selectedDressings') || '[]');
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      } catch (error) {
        console.error('Problem z pobieraniem danych o Sosach: ', error)
      }
    },
    methods: {
      toggleSelectedIngredient(ingredient) {
        const selectedIngIds = JSON.parse(localStorage.getItem('selectedDressings') || '[]');
        const index = selectedIngIds.indexOf(ingredient.id);

        if (this.selectedCount >= 1 && index === -1) {
          return;
        }

        if (index !== -1) {
          selectedIngIds.splice(index, 1);
        } else {
          selectedIngIds.push(ingredient.id);
        }

        localStorage.setItem('selectedDressings', JSON.stringify(selectedIngIds));
        this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
        this.selectedCount = this.selectedIngs.length;
      },
      isSelectedIngredient(ingredient) {
        return this.selectedIngs.some(ing => ing.id === ingredient.id);
      }
    }
  }
</script>