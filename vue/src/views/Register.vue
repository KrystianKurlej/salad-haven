<template>
  <h1>Create an account</h1>
  <p><input type="text" placeholder="Email-register" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><buttom @click="register">Submit</buttom></p>

  <p v-if="currentUser">Current User: {{ currentUser.email }}</p>
  <p v-if="errMsg">{{  errMsg  }}</p>
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
  const signInWithGoogle = () => {
  
  }
  </script>