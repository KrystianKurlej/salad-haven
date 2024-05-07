<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <h1>Moje konto</h1>

    <div v-if="currentUser">
      <div v-if="!isEditing">
        <div>
          <strong>Imię:</strong> {{ userData.firstName }}
        </div>
        <div>
          <strong>Nazwisko:</strong> {{ userData.lastName }}
        </div>
        <div>
          <strong>Adres:</strong> {{ userData.address }}
        </div>
        <div>
          <strong>Kod pocztowy i miejscowość:</strong> {{ userData.postalCode }}
        </div>
        <button @click="startEditing">Edytuj</button>
        <button @click="logout">Wyloguj się</button> <!-- Dodany przycisk wylogowania -->
      </div>
      <div v-else>
        <div>
          <label for="firstName">Imię:</label>
          <input type="text" id="firstName" v-model="userData.firstName" placeholder="Podaj imię">
        </div>
        <div>
          <label for="lastName">Nazwisko:</label>
          <input type="text" id="lastName" v-model="userData.lastName" placeholder="Podaj nazwisko">
        </div>
        <div>
          <label for="address">Adres:</label>
          <input type="text" id="address" v-model="userData.address" placeholder="Podaj adres">
        </div>
        <div>
          <label for="postalCode">Kod pocztowy i miejscowość:</label>
          <input type="text" id="postalCode" v-model="userData.postalCode" placeholder="Podaj kod pocztowy i miejscowość">
        </div>
        <button @click="saveUserData">Zapisz zmiany</button>
        <button @click="cancelEditing">Anuluj</button>
      </div>
    </div>

    <div v-if="showToast" class="toast" :class="{ success: !isError, error: isError }">
      <span>{{ toastMessage }}</span>
      <button @click="showToast = false">X</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

let auth;
const currentUser = ref(null);
const userData = ref({
  firstName: '',
  lastName: '',
  address: '',
  postalCode: ''
});
const acceptData = ref(false);
const isEditing = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;

    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      Object.assign(userData.value, savedUserData);
    }
  });
});

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveUserData = () => {

  console.log("Dane zostały wysłane:", userData.value);

  const success = true;
  if (success) {
    showToastMessage("Dane zostały pomyślnie zapisane.", false);
    isEditing.value = false;
  } else {
    showToastMessage("Wystąpił błąd podczas zapisywania danych.", true);
  }
};

const showToastMessage = (message, isError) => {
  toastMessage.value = message;
  showToast.value = true;
};

const logout = () => {
  signOut(auth).then(() => {
    // Po wylogowaniu możesz przekierować użytkownika na stronę logowania lub gdziekolwiek indziej
    console.log('Użytkownik wylogowany.');
  }).catch((error) => {
    console.error('Błąd podczas wylogowywania:', error);
  });
};
</script>