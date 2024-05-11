<template>
  <nav class="top-nav">
    <div class="wrapper">
      <router-link to="/" class="logo" title="Salad Haven">
        <Logo />
      </router-link>
      <div class="menu">
        <ul :class="{ 'menu-list': true, 'active': isMenuActive }">
          <li class="menu-item"><router-link title="Strona główna" to="/">Strona główna</router-link></li>
          <li class="menu-item"><router-link title="Konfigurator" to="/konfigurator">Konfigurator</router-link></li>
          <li class="menu-item"><router-link title="Kontakt" to="/kontakt">Kontakt</router-link></li>
        </ul>
        <ul class="icons-menu-list">
          <li class="menu-item-icon"><router-link title="Konto" :to="isLoggedIn ? '/konto' : '/logowanie'"><AccountIco width="24" height="24" /></router-link></li>
          <li class="menu-item-icon"><CartIco width="24" height="24" /></li>
        </ul>
        <button class="mobile-btn" @click="toggleMenu">
          <div :class="{ 'hamburger-icon': true, 'active': isMenuActive }"></div>
        </button>
      </div>
    </div>
  </nav>
   <!-- tutaj komponent koszyka -->
   <!-- np. {showCart && <Cart />} -->
  <main>
    <router-view></router-view>
  </main>
  <footer class="footer">
    <div class="wrapper">
      <Logo />
      <ul class="menu-list">
        <li class="menu-item"><router-link title="Strona główna" to="/">Strona główna</router-link></li>
        <li class="menu-item"><router-link title="Konfigurator" to="/konfigurator">Konfigurator</router-link></li>
        <li class="menu-item"><router-link title="Kontakt" to="/kontakt">Kontakt</router-link></li>
        <li class="menu-item"><router-link title="Konto" :to="isLoggedIn ? '/konto' : '/logowanie'">Moje konto</router-link></li>
        <li class="menu-item">Koszyk</li>
      </ul>
      <ul class="sm-menu-list">
        <li class="menu-tem"><FacebookIco width="24" height="24" /></li>
        <li class="menu-tem"><InstagramIco width="24" height="24" /></li>
        <li class="menu-tem"><TwitterIco width="24" height="24" /></li>
      </ul>
      <p class="description text-body-small">
        Salad Haven Lorem ipsum dolor sit amet consectetur. Eu pharetra fames aenean vitae convallis suspendisse quis tincidunt habitasse. Vulputate sit morbi a in id est integer mauris libero. At mauris in arcu porta adipiscing elit non.
      </p>
      <ul class="politics-menu-list text-body-small">
        <li class="menu-item">©2024 Salad Haven</li>
        <li class="menu-item">Polityka prywatności</li>
        <li class="menu-item">Regulamin</li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Logo from '@components/Logo.vue';
import AccountIco from '@components/icons/AccountIco.vue';
import CartIco from '@components/icons/CartIco.vue';
import FacebookIco from '@components/icons/FacebookIco.vue';
import InstagramIco from '@components/icons/InstagramIco.vue';
import TwitterIco from '@components/icons/TwitterIco.vue';

// TODO:logika obsługi wyświetlania popupa koszyka

// Konfiguracja Firebase
const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
 storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isMenuActive = ref(false);
let isLoggedIn = ref(false);

const toggleMenu = () => {
 isMenuActive.value = !isMenuActive.value;
};

const handleSignOut = () => {
 signOut(auth).then(() => {
    isLoggedIn.value = false;
    router.push("/");
 });
};

onMounted(() => {
 onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user; // Zmiana: Ustawia wartość na true, jeśli użytkownik jest zalogowany
 });
});
</script>