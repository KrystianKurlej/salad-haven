<template>
    <div class="wrapper">
      <breadcrumbs></breadcrumbs>
      <h1>Historia zamówień</h1>
      <section>
        <p>Tu będzie wyświetlona historia zamówień.</p>
      </section>
      <!-- Przycisk do nawigacji do innego widoku -->
      <button @click="navigateToAccount">Przejdź do konta</button>
      <button @click="logout">Wyloguj się</button>
      <div v-if="showToast" class="toast" :class="{ success: !isError, error: isError }">
        <span>{{ toastMessage }}</span>
        <button @click="showToast = false">X</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const navigateToAccount = () => {
    router.push('/konto')
  }
  
  const logout = () => {
    // Logika wylogowania użytkownika test
  }
  </script>
  