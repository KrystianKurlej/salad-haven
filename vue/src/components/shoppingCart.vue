<template>
  <div>
    <li @click="toggleShoppingCart">
      <CartIco width="24" height="24" />
    </li>
    <div v-if="isShoppingCartVisible" class="shopping-cart-popup">
      <div class="popup-content">
        <!-- Image Container -->
        <div class="image-container">
          <img v-if="localStorageImage" :src="localStorageImage" alt="Image" />
          <img v-else :src="defaultImage" alt="Default Image" />
          <h1 class="empty_basket_text">Koszyk jest pusty!</h1>
        </div>
        <!-- Purchase Buttons -->
        <button class="button_purch" @click="closePopupAndNavigate('/konfigurator/')">Przejdź do zamówienia</button>
        <button class="button_purch2" @click="closePopupAndNavigate('/udanyzakup/')">Kontynuuj zakupy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import CartIco from '@components/icons/CartIco.vue';

export default {
  components: {
    CartIco
  },
  data() {
    return {
      isShoppingCartVisible: false,
      localStorageImage: localStorage.getItem('popupImage'), // Get image from local storage
      defaultImage: './images/empty-icon.png' // Path to default image
    };
  },
  methods: {
    toggleShoppingCart() {
      this.isShoppingCartVisible = !this.isShoppingCartVisible;
    },
    closePopupAndNavigate(path) {
      this.isShoppingCartVisible = false; // Close the popup
      this.$router.push(path); // Navigate to the specified route
    }
  }
}
</script>
