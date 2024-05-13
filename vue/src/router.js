import { createRouter, createWebHistory } from "vue-router";
import Home from "@views/Home.vue";
import Contact from "@views/Contact.vue";
import Configurator from "@views/Configurator.vue";
import Account from "@views/Account.vue";
import Base from "@views/Base.vue";
import Vegie from "@views/Vegie.vue";
import Dressing from "@views/Dressing.vue";
import Proteins from "@views/Proteins.vue";
import Topings from "@views/Topings.vue";
import Sum from "@views/Sum.vue";
import Login from "@views/Login.vue";
import Register from "@views/Register.vue";
import history from "@views/history.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Strona główna",
      component: Home,
      meta: { breadcrumb: "Strona główna" },
    },
    {
      name: "Konfigurator",
      path: "/konfigurator",
      component: Configurator,
      meta: { breadcrumb: "Konfigurator" },
    },
    {
      path: "/konfigurator/baza", 
      component: Base,
      meta: { breadcrumb: "Baza" },
    },
    {
      path: "/konfigurator/owoce-i-warzywa",
      component: Vegie,
      meta: { breadcrumb: "Owoce i warzywa" },
    },
    {
      path: "/konfigurator/proteiny",
      component: Proteins,
      meta: { breadcrumb: "Proteiny" },
    },
    {
      path: "/konfigurator/dodatki",
      component: Topings,
      meta: { breadcrumb: "Dodatki" },
    },
    {
      path: "/konfigurator/dressing",
      component: Dressing,
      meta: { breadcrumb: "Dressing" },
    },
    {
      path: "/konfigurator/podsumowanie",
      component: Sum,
      meta: { breadcrumb: "Podsumowanie" },
    },
    {
      name: "Kontakt",
      path: "/kontakt",
      component: Contact,
      meta: { breadcrumb: "Kontakt" },
    },
    {
      name: "Moje konto",
      path: "/konto",
      component: Account,
      meta: { breadcrumb: "Moje konto" },
    },
		{
			name: "Login",
			path: "/logowanie",
			component: Login,
			meta: {breadcrumb: "Zaloguj się"},
		},
		{
			name: "Register",
			path: "/rejestracja",
			component: Register,
			meta: {breadcrumb: "Zarejestruj się"},
		},
    {
			name: "history",
			path: "/history",
			component: history,
			meta: {breadcrumb: "history"},
		},
  ],
});
