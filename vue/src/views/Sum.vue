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
            <button-component size="large" @click="saveToCartAndNotify">
              Dodaj do koszyka
              <CartIco width="24" height="24"/>
            </button-component>
          </div>
        </div>
      </div>
      
      <div class="configurator-summary">
        <h2>Twoje zamówienie</h2>

        <div class="summary-pictures">
            <div class="category-images" v-for="(ingredient, index) in selectedIngredientsData" :key="index">
              <img :key="index" :src="ingredient.imgSrc" :alt="ingredient.name" />
            </div>
            <div class="category-images" v-for="(ingredient, index) in selectedVegetablesData" :key="index">
              <img :key="index" :src="ingredient.imgSrc" :alt="ingredient.name" />
            </div>
            <div class="category-images" v-for="(ingredient, index) in selectedProteinsData" :key="index">
              <img :key="index" :src="ingredient.imgSrc" :alt="ingredient.name" />
            </div>
            <div class="category-images" v-for="(ingredient, index) in selectedDressingsData" :key="index">
              <img :key="index" :src="ingredient.imgSrc" :alt="ingredient.name" />
            </div>
            <div class="category-images" v-for="(ingredient, index) in selectedToppingsData" :key="index">
              <img :key="index" :src="ingredient.imgSrc" :alt="ingredient.name" />
            </div>
        </div>

        <div class="ingredient-category-header">
          <span class="ingredient-category-title">Baza</span>
          <router-link to="baza" title="Baza">edytuj</router-link>
        </div>
        <ul class="ingredient-category">
          <li class="ingredient-item" v-for="(ingredient, index) in selectedIngredientsData" :key="index">
            <span>{{ ingredient.name }}</span>
            <span>{{ ingredient.price.toFixed(2) }} zł</span>
          </li>
        </ul>
        <div class="ingredient-category-header">
          <span class="ingredient-category-title">Owoce i warzywa</span>
          <router-link to="owoce-i-warzywa" title="Owoce i warzywa">edytuj</router-link>
        </div>
        <ul class="ingredient-category">
          <li class="ingredient-item" v-for="(ingredient, index) in selectedVegetablesData" :key="index">
            <span>{{ ingredient.name }}</span>
            <span>{{ ingredient.price.toFixed(2) }} zł</span>
          </li>
        </ul>
        <div class="ingredient-category-header">
          <span class="ingredient-category-title">Proteiny</span>
          <router-link to="proteiny" title="Proteiny">edytuj</router-link>
        </div>
        <ul class="ingredient-category">
          <li class="ingredient-item" v-for="(ingredient, index) in selectedProteinsData" :key="index">
            <span>{{ ingredient.name }}</span>
            <span>{{ ingredient.price.toFixed(2) }} zł</span>
          </li>
        </ul>
        <div class="ingredient-category-header">
          <span class="ingredient-category-title">Dressing</span>
          <router-link to="dressing" title="Dressing">edytuj</router-link>
        </div>
        <ul class="ingredient-category">
          <li class="ingredient-item" v-for="(ingredient, index) in selectedDressingsData" :key="index">
            <span>{{ ingredient.name }}</span>
            <span>{{ ingredient.price.toFixed(2) }} zł</span>
          </li>
        </ul>
        <div class="ingredient-category-header">
          <span class="ingredient-category-title">Dodatki</span>
          <router-link to="dodatki" title="Dodatki">edytuj</router-link>
        </div>
        <ul class="ingredient-category">
          <li class="ingredient-item" v-for="(ingredient, index) in selectedToppingsData" :key="index">
            <span>{{ ingredient.name }}</span>
            <span>{{ ingredient.price.toFixed(2) }} zł</span>
          </li>
        </ul>
        <div class="salad-price">
          <span>Suma</span>
          <span class="price-sum">
            {{ totalPrice.toFixed(2) }} zł
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import RightChevron from '@components/icons/RightChevron.vue';
import CartIco from '@components/icons/CartIco.vue';
import { API_URL } from '@src/main.js';

const selectedIngredientsData = ref([]);
const selectedVegetablesData = ref([]);
const selectedProteinsData = ref([]);
const selectedDressingsData = ref([]);
const selectedToppingsData = ref([]);

// Pobierz wartości z localStorage
const selectedVegetables = JSON.parse(localStorage.getItem('selectedVegetables')) || [];
const selectedIngredients = JSON.parse(localStorage.getItem('selectedIngredients')) || [];
const selectedDressings = JSON.parse(localStorage.getItem('selectedDressings')) || [];
const selectedProteins = JSON.parse(localStorage.getItem('selectedProteins')) || [];
const selectedToppings = JSON.parse(localStorage.getItem('selectedToppings')) || [];

const fetchIngredientData = async (category, ids) => {
  const data = [];
  if (Array.isArray(ids)) {
    for (const id of ids) {
      try {
        const response = await axios.get(`${API_URL}/ingredients/${id}`);
        const ingredientData = response.data;
        data.push(ingredientData);
      } catch (error) {
        console.error(`Failed to fetch ingredient with id ${id}:`, error);
      }
    }
  }
  return data;
};

const setIngredientNames = async () => {
  selectedIngredientsData.value = await fetchIngredientData('ingredients', selectedIngredients);
  selectedVegetablesData.value = await fetchIngredientData('vegetables', selectedVegetables);
  selectedProteinsData.value = await fetchIngredientData('proteins', selectedProteins);
  selectedDressingsData.value = await fetchIngredientData('dressings', selectedDressings);
  selectedToppingsData.value = await fetchIngredientData('toppings', selectedToppings);
};

const totalPrice = computed(() => {
  const allIngredients = [...selectedIngredientsData.value, ...selectedVegetablesData.value, ...selectedProteinsData.value, ...selectedDressingsData.value, ...selectedToppingsData.value];
  return allIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
});

onMounted(() => {
  setIngredientNames();
});

const saveToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const newId = cart.length ? cart[cart.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    ingredients: selectedIngredients,
    vegetables: selectedVegetables,
    dressings: selectedDressings,
    proteins: selectedProteins,
    toppings: selectedToppings,
    totalPrice: totalPrice.value
  };

  cart.push(newProduct);
  localStorage.setItem('cart', JSON.stringify(cart));

  return newProduct;
};

const saveToCartAndNotify = () => {
  const newProduct = saveToCart();
  // Emit an event to notify other components about the new product
  const event = new CustomEvent('product-added', { detail: newProduct });
  window.dispatchEvent(event);
};
</script>