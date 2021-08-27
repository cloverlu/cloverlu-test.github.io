import Vue from "vue";
import VueRouter from "vue-router";
// import addListIndex from "../views/addList/index.vue";
import testUnload from "../views/testUoload/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "Home",
    component: testUnload
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
