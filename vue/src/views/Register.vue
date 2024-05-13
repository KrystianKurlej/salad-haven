<template>
  <header class="wrapper" id="registerHeader">
    <breadcrumbs></breadcrumbs>
    <h1>Zarejestruj się</h1>
  </header>
  <main id="registerMain">
    <div class="wrapper">
      <form @submit.prevent="register">
        <p>
          <label for="email">Adres e-mail</label>
          <input name="email" type="text" placeholder="Twój adres e-mail" v-model="email"/>
        </p>
        <p>
          <label for="password">Hasło</label>
          <input name="password" type="password" placeholder="********" v-model="password"/>
        </p>

        <button-component size="large" variant="primary" class="cta">Zarejestruj się</button-component>
      </form>

      <span class="text-body-small">
        Masz już konto? <router-link to="/logowanie">Zaloguj się</router-link>
      </span>

      <p v-if="currentUser">Zalogowany użytkownik: {{ currentUser.email }}</p>
      <p v-if="errMsg">{{ errMsg }}</p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const email = ref("");
const password = ref("");
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Succesfully registered!");
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
=======
const email = ref("");
const password = ref("");
const router = useRouter()
const register = () => {
createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
    console.log("Succesfully registered!");
    router.push('/')
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
  });

};
const signInWithGoogle = () => {

}
</script>
