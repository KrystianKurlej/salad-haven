<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>

    <header class="contact-header">
    </header>

    <main id="purchaseSuccesPage">
      <DonePage />
      <h1 class="title">Dziękujemy za zakup!</h1>

      <p class="order-details">Twoje zamówienie zostało wysłane. Potwierdzenie i szczegóły zamówienia zostały wysłane na podany adres mailowy.</p>
      <router-link title="Strona glowna" to="/">
        <button-component>
          Wróć do strony głównej
        </button-component>
      </router-link>
    </main>
  </div>
</template>

<script setup>
  import DonePage from '@components/icons/DonePage.vue';
</script>