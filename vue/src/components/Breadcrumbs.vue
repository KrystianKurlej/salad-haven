<template>
    <nav class="breadcrumbs">
        <ul>
            <li><router-link to="/" title="Strona główna"><HomeIco /></router-link></li>
            <li v-for="(item, index) in breadcrumbs" :key="index" :title="item.name">
                <router-link :to="item.path">
                    {{ item.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    import HomeIco from '@components/icons/HomeIco.vue';
</script>

<script>
   export default {
    name: 'Breadcrumbs',
    data() {
       return {
         breadcrumbs: []
       };
    },
    created() {
       this.updateBreadcrumbs();
    },
    watch: {
       $route() {
         this.updateBreadcrumbs();
       }
    },
    methods: {
       updateBreadcrumbs() {
         const matched = this.$route.matched;
         this.breadcrumbs = matched.map(route => ({
           name: route.meta.breadcrumb || route.name,
           path: route.path
         }));
       }
    }
   };
</script>