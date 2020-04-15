import Vue from "vue";
import VueRouter from "vue-router";
import addListIndex from "../views/addList/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: addListIndex
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
