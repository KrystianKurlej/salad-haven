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
      <!-- Purchase Buttons -->
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
// import { API_URL } from '@src/main.js'; nie wiem dlaczego to nie działa
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
     ...item.toppings // Make sure this property exists in your cart items
    ]))
  ];
  await Promise.all(allIds.map(id => fetchIngredientData(id)));
};

onMounted(() => {
  loadCart();
});

const isShoppingCartVisible = ref(false);

const toggleShoppingCart = () => {
  isShoppingCartVisible.value = !isShoppingCartVisible.value;
};

const router = useRouter();

const purchaseCart = async (path) => {
  const clientId = localStorage.getItem('uid');
  
  if (!clientId) {
    console.error('Client ID is missing');
    return;
  }

  const newOrder = {
    date: new Date().toISOString().split('T')[0],
    products: cart.value.map(item => {
      const ingredientsNames = item.ingredients.map(id => getIngredientData(id)?.name ?? '').join('\n');
      const vegetablesNames = item.vegetables.map(id => getIngredientData(id)?.name ?? '').join('\n');
      const dressingsNames = item.dressings.map(id => getIngredientData(id)?.name ?? '').join('\n');
      const proteinsNames = item.proteins.map(id => getIngredientData(id)?.name ?? '').join('\n');

      return {
        id: item.id,
        status: "new",
        title: `Sałatka ${ingredientsNames}`,
        shortDescription: `${ingredientsNames}\n${vegetablesNames}\n${dressingsNames}\n${proteinsNames}`,
        price: item.totalPrice,
        thumbnailUrl: getIngredientData(item.ingredients[0]).imgSrc
      };
    })
  };

  fetch(`${API_URL}/orderHistory/${clientId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOrder)
  })

  toggleShoppingCart();
  localStorage.removeItem('cart');
  router.push('/udanyzakup')
};

const removeFromCart = (id) => {
  const updatedCart = cart.value.filter(item => item.id !== id);
  cart.value = updatedCart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  isShoppingCartVisible.value = false;
};
</script>
