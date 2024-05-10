<template>
    <div class="wrapper">
        <breadcrumbs></breadcrumbs>
    </div>
    <main class="configurator-main">
        <div class="wrapper">
            <h1>Rozpocznij swoją przygodę w Salad Haven</h1>
            <p>Rozpocznij swoją sałatkę wybierając bazę - od świeżej mieszanki sałat po pełnoziarniste ryże lub makarony.</p>
            <router-link title="Zacznij konfigurację" to="baza" class="btn-link">
                <button-component size="large" variant="primary">
                    Zacznij konfigurację
                    <ArrowRightIco width="24" height="24"/>
                </button-component>
            </router-link>
        </div>
    </main>
  </template>
  
<script setup>
import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
</script>