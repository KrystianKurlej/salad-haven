<template>
    <div class="wrapper">
      <h1>Zaloguj się</h1>
      <div>
        <label for="email">Adres e-mail:</label>
        <input type="email" id="email" v-model="email" placeholder="Wprowadź adres e-mail">
      </div>
      <div>
        <label for="password">Hasło:</label>
        <input type="password" id="password" v-model="password" placeholder="Wprowadź hasło">
      </div>
      <button @click="login">Zaloguj się</button>
      <router-link to="/register">Nie masz jeszcze konta? Zarejestruj się</router-link> <!-- Dodany link do rejestracji -->
      <button @click="resetPassword">Zresetuj hasło</button> <!-- Dodany przycisk resetu hasła -->
      <div v-if="showToast" class="toast" :class="{ success: !isError, error: isError }">
        <span>{{ toastMessage }}</span>
        <button @click="showToast = false">X</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  
  let auth;
  const email = ref('');
  const password = ref('');
  const showToast = ref(false);
  const toastMessage = ref('');
  
  auth = getAuth();
  
  const login = () => {
    // Logika logowania
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
  