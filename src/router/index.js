import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthCallback from "../views/AuthCallback.vue";
import FeedItem from "../views/FeedItem.vue";
import FeedManager from "../views/FeedManager.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth/github/callback",
    name: "AuthCallback",
    component: AuthCallback
  },
  {
    path: "/item/:id",
    name: "FeedItem",
    component: FeedItem
  },
  {
    path: "/manage",
    name: "FeedManager",
    component: FeedManager
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
