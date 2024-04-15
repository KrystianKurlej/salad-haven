import {createApp} from "vue";
import router from "./router";
import App from "./App.vue";
import "@css/style.css";

// Globalne komponenty
import ButtonComponent from "@components/Button.vue";
import Breadcrumbs from "@components/Breadcrumbs.vue";

const app = createApp(App).use(router);

// Rejestracja komponentów globalnie
app.component("button-component", ButtonComponent);
app.component("breadcrumbs", Breadcrumbs);

// Montowanie aplikacji
app.mount("#app");

// Zmienna serwera z API
export const API_URL = "http://localhost:3000";
