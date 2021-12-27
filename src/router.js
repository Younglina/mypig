import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Diaries from "./views/Diaries.vue";
import Diaries_edit from "./views/Diaries_edit.vue";
import Photos from "./views/Photos.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/diaries",
      name: "diaries",
      component: Diaries,
    },
    {
      path: "/dayedit",
      name: "dayedit",
      component: Diaries_edit,
    },
    {
      path: "/photos",
      name: "photos",
      component: Photos,
    },
    {
      path: "/one-year",
      name: "oneYear",
      component: () => import("./views/oneYear/oneYear.vue"),
    },
    // {
    //   path: '/diaries',
    //   name: 'diaries',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Diaries.vue')
    // }
  ],
});
