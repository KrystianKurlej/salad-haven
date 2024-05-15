<template>
  <div>
    <li @click="toggleShoppingCart" class="menu-item-icon">
      <CartIco width="24" height="24" />
    </li>
    <div v-if="isShoppingCartVisible" class="shopping-cart-popup">
      <button class="close-modal-button" @click="toggleShoppingCart">
        <Cancel width="24" height="24" />
      </button>
      <div class="empty">
        <Magnifier width="64" height="64" />
        <h6 class="title">Koszyk jest pusty</h6>
        <p>Lorem ipsum dolor sit amet consectetur. Pellentesque nulla scelerisque purus cum.</p>
      </div>
      <!-- Purchase Buttons -->
      <button-component @click="closePopupAndNavigate('/udanyzakup/')">Przejdź do zamówienia</button-component>
      <button-component variant="secondary" @click="toggleShoppingCart">Kontynuuj zakupy</button-component>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CartIco from '@components/icons/CartIco.vue';
import Magnifier from '@components/icons/Magnifier.vue';
import Cancel from '@components/icons/Cancel.vue';
</script>

<script>
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
