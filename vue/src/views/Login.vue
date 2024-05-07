<template>
    <h1>Create an account</h1>
    <p><input type="text" placeholder="Email-login" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><buttom @click="register">Submit</buttom></p>

    <p v-if="currentUser">Current User: {{ currentUser.email }}</p>
    <p v-if="errMsg">{{  errMsg  }}</p>
    </template>
    
    <script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router'
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
    const email = ref("");
    const password = ref("");
    const errMsg = ref();
    const router = useRouter()
    const register = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
          console.log("Succesfully registered!");
          router.push('/')
        })
        console.log(error.code);
        switch(error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid Email";
                break;
            case "auth/user-not-found":
                errMsg.value = "User not found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Wrong password";
                break;
            default:
                errMsg.value = "Email or password was incorrect";
                break;
        }
    };
    const signInWithGoogle = () => {
    
    }
    </script>