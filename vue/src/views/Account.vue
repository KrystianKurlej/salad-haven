<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>
    <h1>Moje konto</h1>

    <!-- Sekcja "Moje dane" -->
    <button @click="navigateToHistory">Przejdź do historii zamówień</button>
<!-- Przycisk wylogowania -->
<button @click="logout">Wyloguj się</button>


    <section v-if="currentUser">
      <h2>Moje dane</h2>
      <div v-if="!isEditingUserData">
        <div>
          <strong>Imię:</strong> {{ userData.firstName }}
        </div>
        <div>
          <strong>Nazwisko:</strong> {{ userData.lastName }}
        </div>
        <div>
          <strong>Adres e-mail:</strong> {{ userData.email }}
        </div>
        <div>
          <strong>Telefon:</strong> {{ userData.phoneNumber }}
        </div>
        <button @click="startEditingUserData">Edytuj</button>
        <button @click="confirmDeleteUserData">Usuń dane</button>
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
          <label for="email">Adres e-mail:</label>
          <input type="email" id="email" v-model="userData.email" placeholder="Podaj adres e-mail">
        </div>
        <div>
          <label for="phoneNumber">Telefon:</label>
          <input type="tel" id="phoneNumber" v-model="userData.phoneNumber" placeholder="Podaj numer telefonu">
        </div>
        <button @click="saveUserData">Zapisz zmiany</button>
        <button @click="cancelEditingUserData">Anuluj</button>
      </div>
    </section>

    <!-- Sekcja "Dane firmy" -->
    <section>
      <h2>Dane firmy</h2>
      <div v-if="!isEditingCompanyData">
        <div>
          <strong>Nazwa firmy:</strong> {{ companyData.companyName }}
        </div>
        <div>
          <strong>NIP:</strong> {{ companyData.nip }}
        </div>
        <div>
          <strong>Ulica:</strong> {{ companyData.street }}
        </div>
        <div>
          <strong>Nr domu:</strong> {{ companyData.houseNumber }}
        </div>
        <div>
          <strong>Nr lokalu:</strong> {{ companyData.apartmentNumber }}
        </div>
        <div>
          <strong>Miasto:</strong> {{ companyData.city }}
        </div>
        <div>
          <strong>Kod pocztowy:</strong> {{ companyData.postalCode }}
        </div>
        <button @click="startEditingCompanyData">Edytuj</button>
        <button @click="confirmDeleteCompanyData">Usuń dane</button>
      </div>
      <div v-else>
        <div>
          <label for="companyName">Nazwa firmy:</label>
          <input type="text" id="companyName" v-model="companyData.companyName" placeholder="Podaj nazwę firmy">
        </div>
        <div>
          <label for="nip">NIP:</label>
          <input type="text" id="nip" v-model="companyData.nip" placeholder="Podaj NIP">
        </div>
        <div>
          <label for="street">Ulica:</label>
          <input type="text" id="street" v-model="companyData.street" placeholder="Podaj ulicę">
        </div>
        <div>
          <label for="houseNumber">Nr domu:</label>
          <input type="text" id="houseNumber" v-model="companyData.houseNumber" placeholder="Podaj nr domu">
        </div>
        <div>
          <label for="apartmentNumber">Nr lokalu:</label>
          <input type="text" id="apartmentNumber" v-model="companyData.apartmentNumber" placeholder="Podaj nr lokalu">
        </div>
        <div>
          <label for="city">Miasto:</label>
          <input type="text" id="city" v-model="companyData.city" placeholder="Podaj miasto">
        </div>
        <div>
          <label for="postalCode">Kod pocztowy:</label>
          <input type="text" id="postalCode" v-model="companyData.postalCode" placeholder="Podaj kod pocztowy">
        </div>
        <button @click="saveCompanyData">Zapisz zmiany</button>
        <button @click="cancelEditingCompanyData">Anuluj</button>
      </div>
    </section>

    <!-- Sekcja "Dane kontaktowe" -->
    <section>
      <h2>Dane kontaktowe</h2>
      <div v-if="!isEditingContactData">
        <div>
          <strong>Imię:</strong> {{ contactData.firstName }}
        </div>
        <div>
          <strong>Nazwisko:</strong> {{ contactData.lastName }}
        </div>
        <div>
          <strong>Adres:</strong> {{ contactData.address }}
        </div>
        <div>
          <strong>Telefon:</strong> {{ contactData.phone }}
        </div>
        <div>
          <strong>E-mail:</strong> {{ contactData.email }}
        </div>
        <button @click="startEditingContactData">Edytuj</button>
        <button @click="confirmDeleteContactData">Usuń dane</button>
      </div>
      <div v-else>
        <div>
          <label for="firstName">Imię:</label>
          <input type="text" id="firstName" v-model="contactData.firstName" placeholder="Podaj imię">
        </div>
        <div>
          <label for="lastName">Nazwisko:</label>
          <input type="text" id="lastName" v-model="contactData.lastName" placeholder="Podaj nazwisko">
        </div>
        <div>
          <label for="address">Adres:</label>
          <input type="text" id="address" v-model="contactData.address" placeholder="Podaj adres">
        </div>
        <div>
          <label for="phone">Telefon:</label>
          <input type="tel" id="phone" v-model="contactData.phone" placeholder="Podaj telefon">
        </div>
        <div>
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="contactData.email" placeholder="Podaj e-mail">
        </div>
        <button @click="saveContactData">Zapisz zmiany</button>
        <button @click="cancelEditingContactData">Anuluj</button>
      </div>
    </section>

    <!-- Sekcja "Adresy wysyłki" -->
    <section>
      <h2>Adresy wysyłki</h2>
      <div>
        <button @click="addShippingAddress">Dodaj adres wysyłki</button>
      </div>
      <div v-for="(address, index) in shippingAddresses" :key="index">
        <div v-if="!address.isEditing">
          <div>
            <strong>Adres:</strong> {{ address.street }}, {{ address.houseNumber }}, {{ address.apartmentNumber }}, {{ address.city }}, {{ address.postalCode }}
          </div>
          <button @click="editShippingAddress(index)">Edytuj</button>
          <button @click="deleteShippingAddress(index)">Usuń</button>
        </div>
        <div v-else>
          <div>
            <label for="street">Ulica:</label>
            <input type="text" v-model="address.street">
          </div>
          <div>
            <label for="houseNumber">Nr domu:</label>
            <input type="text" v-model="address.houseNumber">
          </div>
          <div>
            <label for="apartmentNumber">Nr lokalu:</label>
            <input type="text" v-model="address.apartmentNumber">
          </div>
          <div>
            <label for="city">Miasto:</label>
            <input type="text" v-model="address.city">
          </div>
          <div>
            <label for="postalCode">Kod pocztowy:</label>
            <input type="text" v-model="address.postalCode">
          </div>
          <button @click="saveShippingAddress(index)">Zapisz zmiany</button>
          <button @click="cancelEditingShippingAddress(index)">Anuluj</button>
        </div>
      </div>
    </section>

    <!-- Przycisk do nawigacji do widoku "History" -->


    <!-- Komunikat toast -->
    <div v-if="showToast" class="toast" :class="{ success: !isError, error: isError }">
      <span>{{ toastMessage }}</span>
      <button @click="showToast = false">X</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const router = useRouter()

const navigateToHistory = () => {
  router.push('/history')
}

import { onMounted, ref } from "vue";

let currentUser = ref(null);
let userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
});
let companyData = ref({
  companyName: '',
  nip: '',
  street: '',
  houseNumber: '',
  apartmentNumber: '',
  city: '',
  postalCode: ''
});
let contactData = ref({
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  email: ''
});
let shippingAddresses = ref([]);
let isEditingUserData = ref(false);
let isEditingCompanyData = ref(false);
let isEditingContactData = ref(false);
let isEditingShippingAddress = ref(false);
let showToast = ref(false);
let toastMessage = ref('');

onMounted(() => {
  // Sprawdź, czy dane użytkownika są już zapisane w localStorage
  const savedUserData = JSON.parse(localStorage.getItem('userData'));
  if (savedUserData) {
    userData.value = savedUserData;
  }

  // Sprawdź, czy dane firmy są już zapisane w localStorage
  const savedCompanyData = JSON.parse(localStorage.getItem('companyData'));
  if (savedCompanyData) {
    companyData.value = savedCompanyData;
  }

  // Sprawdź, czy dane kontaktowe są już zapisane w localStorage
  const savedContactData = JSON.parse(localStorage.getItem('contactData'));
  if (savedContactData) {
    contactData.value = savedContactData;
  }

  // Sprawdź, czy adresy wysyłki są już zapisane w localStorage
  const savedShippingAddresses = JSON.parse(localStorage.getItem('shippingAddresses'));
  if (savedShippingAddresses) {
    shippingAddresses.value = savedShippingAddresses;
  }
});

const startEditingUserData = () => {
  isEditingUserData.value = true;
};
const addShippingAddress = () => {
  shippingAddresses.value.push({
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    city: '',
    postalCode: '',
    isEditing: true
  });
};

const cancelEditingUserData = () => {
  isEditingUserData.value = false;
};

const startEditingCompanyData = () => {
  isEditingCompanyData.value = true;
};

const cancelEditingCompanyData = () => {
  isEditingCompanyData.value = false;
};

const startEditingContactData = () => {
  isEditingContactData.value = true;
};

const cancelEditingContactData = () => {
  isEditingContactData.value = false;
};

const startEditingShippingAddress = () => {
  isEditingShippingAddress.value = true;
};

const cancelEditingShippingAddress = () => {
  isEditingShippingAddress.value = false;
};

const confirmDeleteUserData = () => {
  if (confirm("Czy na pewno chcesz usunąć dane użytkownika?")) {
    // Usuń dane użytkownika
    userData.value = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
    saveUserData();
  }
};

const confirmDeleteCompanyData = () => {
  if (confirm("Czy na pewno chcesz usunąć dane firmy?")) {
    // Usuń dane firmy
    companyData.value = {
      companyName: '',
      nip: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      city: '',
      postalCode: ''
    };
    saveCompanyData();
  }
};

const confirmDeleteContactData = () => {
  if (confirm("Czy na pewno chcesz usunąć dane kontaktowe?")) {
    // Usuń dane kontaktowe
    contactData.value = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: ''
    };
    saveContactData();
  }
};

const saveUserData = () => {
  // Zapisz dane użytkownika w localStorage
  localStorage.setItem('userData', JSON.stringify(userData.value));
};

const saveCompanyData = () => {
  // Zapisz dane firmy w localStorage
  localStorage.setItem('companyData', JSON.stringify(companyData.value));
};

const saveContactData = () => {
  // Zapisz dane kontaktowe w localStorage
  localStorage.setItem('contactData', JSON.stringify(contactData.value));
};
const editShippingAddress = (index) => {
  // Ustaw flagę isEditing dla adresu wysyłki o podanym indeksie na true, aby umożliwić edycję
  shippingAddresses.value[index].isEditing = true;
};

const deleteShippingAddress = (index) => {
  // Wyświetl okno dialogowe z potwierdzeniem usunięcia adresu
  const confirmation = confirm("Czy na pewno chcesz usunąć ten adres wysyłki?");
  if (confirmation) {
    // Usuń adres wysyłki o podanym indeksie
    shippingAddresses.value.splice(index, 1);
    // Zapisz zmienione adresy wysyłki w localStorage lub innym miejscu
    localStorage.setItem('shippingAddresses', JSON.stringify(shippingAddresses.value));
  }
};


const saveShippingAddress = (index) => {
  shippingAddresses.value[index].isEditing = false;
  // Zapisz zmiany adresu wysyłki w localStorage lub innym miejscu
  // Przykładowa implementacja zapisu do localStorage:
  localStorage.setItem('shippingAddresses', JSON.stringify(shippingAddresses.value));
};
const auth = getAuth();


const logout = () => {
  signOut(auth).then(() => {
    // Po wylogowaniu możesz przekierować użytkownika na stronę logowania 
    console.log('Użytkownik wylogowany.');
  }).catch((error) => {
    console.error('Błąd podczas wylogowywania:', error);
  });
};
</script>
