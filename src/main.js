import { createApp } from "vue";
import "./assets/fonts/Gilroy/stylesheet.css";
import App from "./App.vue";
import router from "./router/router.js";
import toServer from "./toServer.js";

createApp(App).use(router, toServer).mount("#app");
