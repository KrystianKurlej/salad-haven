<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <div class="account-panel">
      <nav class="account-menu">
        <span>Panel klienta</span>
        <ul class="menu-list">
          <li class="menu-item">
            <router-link title="Moje dane" to="/konto">Moje dane</router-link>
          </li>
          <li class="menu-item active">Historia zamówień</li>
          <span class="menu-divider"></span>
          <li class="menu-item">
            <button @click="logout">Wyloguj się</button>
          </li>
        </ul>
      </nav>

      <main>
        <h1>Historia zamówień</h1>
      </main>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const logout = () => {
  signOut(auth).then(() => {
    router.push('/logowanie')
    console.log('Użytkownik wylogowany.');
  }).catch((error) => {
    console.error('Błąd podczas wylogowywania:', error);
  });
};
</script>
  