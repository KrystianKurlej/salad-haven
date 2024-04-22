import {createApp} from "vue";
import router from "./router";
import App from "./App.vue";
import "@css/style.css"; // Upewnij się, że ścieżka do pliku CSS jest poprawna

// Importowanie globalnych komponentów
import ButtonComponent from "@components/Button.vue";
import Breadcrumbs from "@components/Breadcrumbs.vue";

// Tworzenie instancji Vue
const vueApp = createApp(App).use(router);

// Rejestracja globalnych komponentów
vueApp.component("button-component", ButtonComponent);
vueApp.component("breadcrumbs", Breadcrumbs);

// Montowanie aplikacji
vueApp.mount("#app");

// Eksportowanie URL-a API dla użycia w innych częściach aplikacji
export const API_URL = "http://localhost:3000";
