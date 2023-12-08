import { createRouter, createWebHistory } from "vue-router";

import Home from "~/components/Home.vue";
import NotFoundView from "~/components/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes,
});

export default router;
