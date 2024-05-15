<template>
    <div class="configurator-progress">
        <span class="current-price">Aktualny koszt: <bdi>{{ totalPrice.toFixed(2) }} zł</bdi></span>
        <h4>W Twojej sałatce:</h4>
        <ul>
            <li class="ingredient-item" v-for="(ingredient, index) in selectedIngredientsData" :key="index">
                <span>{{ ingredient.name }}</span>
                <span>{{ ingredient.price.toFixed(2) }} zł</span>
            </li>
            <li class="ingredient-item" v-for="(ingredient, index) in selectedVegetablesData" :key="index">
                <span>{{ ingredient.name }}</span>
                <span>{{ ingredient.price.toFixed(2) }} zł</span>
            </li>
            <li class="ingredient-item" v-for="(ingredient, index) in selectedProteinsData" :key="index">
                <span>{{ ingredient.name }}</span>
                <span>{{ ingredient.price.toFixed(2) }} zł</span>
            </li>
            <li class="ingredient-item" v-for="(ingredient, index) in selectedDressingsData" :key="index">
                <span>{{ ingredient.name }}</span>
                <span>{{ ingredient.price.toFixed(2) }} zł</span>
            </li>
            <li class="ingredient-item" v-for="(ingredient, index) in selectedToppingsData" :key="index">
                <span>{{ ingredient.name }}</span>
                <span>{{ ingredient.price.toFixed(2) }} zł</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { API_URL } from '@src/main.js';

import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Deklaracja referencji do przechowywania nazw składników
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

// Funkcja do pobierania danych składników z API na podstawie ich identyfikatorów
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

// Funkcja do ustawiania nazw składników w odpowiednich referencjach
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

// Wywołanie funkcji setIngredientNames() po zamontowaniu komponentu
onMounted(() => {
  setIngredientNames();
});

</script>
