import Vue from "vue";
import VueRouter from "vue-router";
// import addListIndex from "../views/coFormCreat/coDraft";
import mobileTest from "../views/mobileTest/index.vue";
// import formCreateIndex from "../views/formCreate";
// import cascaderIndex from "../views/cascaderTest/index.vue";
// import vuexIndex from "../views/vuexTest/index.vue";
// import uploadIndex from "../views/uploadTest/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: mobileTest
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
