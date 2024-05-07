<template>
    <header class="home-header">
        <div class="wrapper">
            <div class="content">
                <h1 class="title">Zdrowe sałatki z&nbsp;myślą o&nbsp;Tobie!</h1>
                <p class="text-body-medium">
                    Lorem ipsum dolor sit amet consectetur. Accumsan turpis eu nisl duis fusce. Proin aliquam felis eget sollicitudin diam sagittis. Varius feugiat elit blandit.
                </p>
                <button-component size="large" variant="primary">
                    Sprawdź naszą ofertę
                    <ArrowRightIco width="24" height="24"/>
                </button-component>
            </div>
            <img src="/images/header.png" alt="">
        </div>
    </header>
    <div class="wrapper">
        <section id="configurator" class="home-section">
            <div class="content">
                <h2 class="title">Zobacz nasz konfigurator sałatek i&nbsp;stwórz swój własny smak!</h2>
                <p class="text-body-medium">
                    Lorem ipsum dolor sit amet consectetur. Congue turpis posuere eget faucibus. Id neque aliquet est phasellus quis. Velit proin amet egestas nunc suspendisse justo magna sed sagittis. Varius quam mus vel penatibus sed nunc sodales tortor ullamcorper. Tempus vestibulum tincidunt aliquam id egestas egestas quisque tristique eget. Bibendum arcu.
                </p>
                <router-link title="Konfigurator" to="/konfigurator" class="btn-link">
                    <button-component size="large" variant="secondary">
                        Stwórz swoją sałatkę
                        <ArrowRightIco width="24" height="24"/>
                    </button-component>
                </router-link>
            </div>
            <img src="/images/configurator-section.jpg" alt="">
        </section>
        <section id="employees" class="home-section">
            <div class="content">
                <h2 class="title">Salad Haven</h2>
                <p class="text-body-medium">
                    Lorem ipsum dolor sit amet consectetur. Proin nec felis dolor ultrices et morbi est tempor amet. Viverra nec nulla ligula libero est netus ornare mattis turpis.
                </p>
                <button-component size="large" variant="secondary">
                    Poznaj Salad Haven
                </button-component>
            </div>
            <div class="slider">
                <div class="employees">
                    <div v-for="employee in employees" :key="employee.id" class="employee-card">
                        <img :src="employee.imgSrc" :alt="'Zdjęcie ' + employee.name">
                        <h3 class="title">{{ employee.name }}</h3>
                        <p class="role">{{ employee.role }}</p>
                    </div>
                </div>
                <div class="employees">
                    <div v-for="employee in employees" :key="employee.id" class="employee-card">
                        <img :src="employee.imgSrc" :alt="'Zdjęcie ' + employee.name">
                        <h3 class="title">{{ employee.name }}</h3>
                        <p class="role">{{ employee.role }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import ArrowRightIco from '@components/icons/ArrowRightIco.vue';
    import {API_URL} from '@src/main.js';
</script>

<script>
export default {
    data() {
        return {
            employees: [],
        };
    },
    async created() {
        try {
            const response = await fetch(API_URL + '/employees');
            if (!response.ok) {
                throw new Error('API response was not ok');
            }
            const data = await response.json();
            this.employees = data;
        } catch (error) {
            console.error('Problem z pobieraniem danych o pracownikach: ', error)
        }
    }
}
</script>
