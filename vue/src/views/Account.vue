<!-- <template>
    <div class="wrapper">
      <div v-if="currentUser">
        Obecny użytkownik: {{ currentUser.email }}
      </div>
    </div>
  </template>
-->

<template>
    <div class="wrapper">
        <breadcrumbs></breadcrumbs>
        <h1>Moje konto</h1>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let auth;
const currentUser = ref(null);

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
  });
});
</script>