import Vue from "vue";
import VueRouter from "vue-router";
import Timer from "../views/Timer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Timer",
    component: Timer
  }
];

const router = new VueRouter({
  routes
});

export default router;
