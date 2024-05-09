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
      children: [
        {
          path: "", 
          component: Base,
          meta: { breadcrumb: "Base" },
        },
        {
          path: "vegie",
          component: Vegie,
          meta: { breadcrumb: "Vegie" },
        },
        {
          path: "proteins",
          component: Proteins,
          meta: { breadcrumb: "Proteins" },
        },
        {
          path: "topings",
          component: Topings,
          meta: { breadcrumb: "Topings" },
        },
        {
          path: "dressing",
          component: Dressing,
          meta: { breadcrumb: "Dressing" },
        },
        {
          path: "sum",
          component: Sum,
          meta: { breadcrumb: "Sum" },
        },
      ],
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
			path: "/login",
			component: Login,
			meta: {breadcrumb: "Login"},
		},
		{
			name: "Register",
			path: "/register",
			component: Register,
			meta: {breadcrumb: "Register"},
		},
  ],
});
