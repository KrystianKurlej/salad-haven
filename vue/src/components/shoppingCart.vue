<template>
  <div>
    <li @click="toggleShoppingCart" class="menu-item-icon">
      <CartIco width="24" height="24" />
    </li>
    <div v-if="isShoppingCartVisible" class="shopping-cart-popup">
      <button class="close-modal-button" @click="toggleShoppingCart">
        <Cancel width="24" height="24" />
      </button>
      <div class="modal-content">
        <div v-if="cart.length === 0" class="empty">
          <Magnifier width="64" height="64" />
          <h5 class="title">Koszyk jest pusty</h5>
          <p>Lorem ipsum dolor sit amet consectetur. Pellentesque nulla scelerisque purus cum.</p>
        </div>
        <div v-else>
          <h5 class="title">Koszyk</h5>
          <ul class="cart-list">
            <li v-for="item in cart" :key="item.id" class="cart-item">
              <img class="product-thumbnail" :src="getIngredientData(item.ingredients[0]).imgSrc" alt="Product Image" />

              <div class="product-info">
                <h6 class="product-name">Sałatka {{ getIngredientData(item.ingredients[0]).name }}</h6>
                <ul class="product-ingredients">
                  <li>{{ getIngredientData(item.ingredients[0]).name }}</li>
                  <li>{{ getIngredientData(item.vegetables[0]).name }}</li>
                  <li>{{ getIngredientData(item.dressings[0]).name }}</li>
                  <li>{{ getIngredientData(item.proteins[0]).name }}</li>
                </ul>
                <p class="price">{{ item.totalPrice.toFixed(2) }} zł</p>
              </div>

              <button-component variant="danger" class="delete-button" @click="removeFromCart(item.id)">
                <Trash width="24" height="24" />
              </button-component>
            </li>
          </ul>
        </div>
      </div>
      <button-component @click="purchaseCart('/udanyzakup/')">Przejdź do zamówienia</button-component>
      <button-component variant="secondary" @click="toggleShoppingCart">Kontynuuj zakupy</button-component>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CartIco from '@components/icons/CartIco.vue';
import Magnifier from '@components/icons/Magnifier.vue';
import Cancel from '@components/icons/Cancel.vue';
import Trash from '@components/icons/Trash.vue';

const API_URL = 'http://localhost:3000';

const cart = ref([]);
const ingredientData = ref({});

const fetchIngredientData = async (id) => {
  if (!ingredientData.value[id]) {
    try {
      const response = await axios.get(`${API_URL}/ingredients/${id}`);
      ingredientData.value[id] = response.data;
    } catch (error) {
      console.error(`Failed to fetch ingredient with id ${id}:`, error);
    }
  }
  return ingredientData.value[id];
};

const getIngredientData = (id) => {
  return ingredientData.value[id] || {};
};

const loadCart = async () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.value = storedCart;

  const allIds = [
    ...new Set(storedCart.flatMap(item => [
      ...item.ingredients,
      ...item.vegetables,
      ...item.dressings,
      ...item.proteins,
      ...item.toppings
    ]))
  ];
  await Promise.all(allIds.map(id => fetchIngredientData(id)));
};

const updateCart = async () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.value = storedCart;
  const allIds = [
    ...new Set(storedCart.flatMap(item => [
      ...item.ingredients,
      ...item.vegetables,
      ...item.dressings,
      ...item.proteins,
      ...item.toppings
    ]))
  ];
  await Promise.all(allIds.map(id => fetchIngredientData(id)));
};

const isShoppingCartVisible = ref(false);

const toggleShoppingCart = () => {
  isShoppingCartVisible.value = !isShoppingCartVisible.value;
};

const removeFromCart = (itemId) => {
  const updatedCart = cart.value.filter(item => item.id !== itemId);
  cart.value = updatedCart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

onMounted(() => {
  loadCart();
  window.addEventListener('product-added', updateCart);
});
</script>
