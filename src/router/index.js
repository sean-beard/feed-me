import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import AuthCallback from "../views/AuthCallback";
import FeedItemPage from "../views/FeedItemPage";
import FeedManagerPage from "../views/FeedManagerPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/github/callback",
    name: "AuthCallback",
    component: AuthCallback,
  },
  {
    path: "/item/:id",
    name: "FeedItemPage",
    component: FeedItemPage,
  },
  {
    path: "/manage",
    name: "FeedManagerPage",
    component: FeedManagerPage,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
