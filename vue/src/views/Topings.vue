<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="configurator-step-view">
      <div class="configurator-steps">
        <div class="configurator-step"><span>Wybierz bazę</span></div>
        <div class="configurator-step"><span>Owoce i warzywa</span></div>
        <div class="configurator-step"><span>Proteiny</span></div>
        <div class="configurator-step"><span>Dressing</span></div>
        <div class="configurator-step active">
          <h1>
            <RightChevron width="24" height="24" class="title-decor"/>
            Dodatki
          </h1>
          <p>Dodaj ostatnie akcenty do swojej sałatki - wybierz spośród prażonych nasion, suszonych owoców lub aromatycznych ziół, aby nadać jej wyjątkowego charakteru.</p>
          <div class="buttons">
            <router-link title="Dressing" to="dressing" class="btn-link">
              <button-component size="large" variant="secondary">
                Wróć
              </button-component>
            </router-link>
            <router-link title="Podsumowanie" to="podsumowanie" class="btn-link">
              <button-component size="large" :disabled="selectedCount < 1">
                Dalej
                <ArrowRightIco width="24" height="24"/>
              </button-component>
            </router-link>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>
  
  <script setup>
    import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
    import { API_URL } from '@src/main.js';
    import RightChevron from '@components/icons/RightChevron.vue';
    import Check from '@components/icons/Check.vue';
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
          return this.ings.filter(ing => ing.category === 'toppings');
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
  
          const selectedIngIds = JSON.parse(localStorage.getItem('selectedToppings') || '[]');
          this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
          this.selectedCount = this.selectedIngs.length;
        } catch (error) {
          console.error('Problem z pobieraniem danych o Posypanych składnikach: ', error)
        }
      },
      methods: {
        toggleSelectedIngredient(ingredient) {
          const selectedIngIds = JSON.parse(localStorage.getItem('selectedToppings') || '[]');
          const index = selectedIngIds.indexOf(ingredient.id);
  
          if (this.selectedCount >= 2 && index === -1) {
            return;
          }
  
          if (index !== -1) {
            selectedIngIds.splice(index, 1);
          } else {
            selectedIngIds.push(ingredient.id);
          }
  
          localStorage.setItem('selectedToppings', JSON.stringify(selectedIngIds));
          this.selectedIngs = this.ings.filter(ing => selectedIngIds.includes(ing.id));
          this.selectedCount = this.selectedIngs.length;
        },
        isSelectedIngredient(ingredient) {
          return this.selectedIngs.some(ing => ing.id === ingredient.id);
        }
      }
    }
  </script>