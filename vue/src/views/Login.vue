<template>
  <header class="wrapper" id="loginHeader">
    <breadcrumbs></breadcrumbs>
    <h1>Zaloguj się</h1>
  </header>
  <main id="loginMain">
    <div class="wrapper">
      <form @submit.prevent="login">
        <p>
          <label for="email">Adres e-mail:</label>
          <input type="email" id="email" v-model="email" placeholder="Wprowadź adres e-mail">
        </p>
        <p>
          <label for="password">Hasło:</label>
          <input type="password" id="password" v-model="password" placeholder="Wprowadź hasło">
        </p>
        <button-component @click="resetPassword" variant="link" id="resetPassword">Zapomniałeś hasła?</button-component>
        <button-component size="large" variant="primary" class="cta">Zaloguj się</button-component>
      </form>

      <span class="text-body-small">
        Nie masz jeszcze konta? <router-link to="/rejestracja">Zarejestruj się</router-link>
      </span>
      
      <div v-if="showToast" class="toast" :class="{ success: !isError, error: isError }">
        <span>{{ toastMessage }}</span>
        <button @click="showToast = false">X</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

let auth;
const email = ref('');
const password = ref('');
const showToast = ref(false);
const toastMessage = ref('');

auth = getAuth();

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      showToastMessage('Zalogowano pomyślnie.', false);
      // Tutaj możesz przekierować użytkownika do innej strony po udanym logowaniu
    })
    .catch((error) => {
      showToastMessage('Nie udało się zalogować. Sprawdź poprawność adresu e-mail i hasła.', true);
      console.error('Błąd logowania:', error);
    });
};

const resetPassword = () => {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      showToastMessage('Wysłano e-mail z linkiem do zresetowania hasła.', false);
    })
    .catch((error) => {
      showToastMessage('Nie udało się wysłać e-maila z linkiem do zresetowania hasła.', true);
      console.error('Błąd resetowania hasła:', error);
    });
};

const showToastMessage = (message, isError) => {
  toastMessage.value = message;
  showToast.value = true;
};
</script>
