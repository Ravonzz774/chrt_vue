import { createRouter, createWebHistory } from "vue-router";
import timetableSettings from "../pages/timetableSettings.vue";
const routes = [{ path: "/", component: timetableSettings }];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
