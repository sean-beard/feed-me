<template>
  <div class="mobile-nav">
    <nav class="indigo darken-4">
      <a href="#" data-target="slide-out" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </a>
      <h1>
        <router-link :to="{ name: 'Home' }">FeedMe</router-link>
      </h1>
    </nav>

    <ul id="slide-out" class="sidenav">
      <li>
        <div v-if="user" class="user-view">
          <div class="background indigo darken-4"></div>
          <!-- TODO: add avatar -->
          <!-- <a href="#user"><img class="circle" :src="user.avatar"/></a> -->
          <p class="user-name">{{ user.name }}</p>
          <p>{{ user.email }}</p>
        </div>
      </li>
      <template v-if="this.isAuthenticated">
        <li>
          <router-link class="sidenav-close" :to="{ name: 'Home' }">
            Home
          </router-link>
        </li>
        <li>
          <router-link class="sidenav-close" :to="{ name: 'FeedManagerPage' }">
            Manage Feeds
          </router-link>
        </li>
        <li><div class="divider"></div></li>
        <li>
          <button class="btn sidenav-close" @click="logout">
            Logout
          </button>
        </li>
      </template>
      <template v-if="!this.isAuthenticated">
        <li>
          <a class="sidenav-close" :href="loginUrl">
            Login to Github
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import authMixin from "@/mixins/authMixin";

export default {
  name: "MobileNav",
  mixins: [authMixin],
  mounted() {
    var sideNav = document.querySelector(".sidenav");
    window.M.Sidenav.init(sideNav);
  },
  computed: { ...mapState(["user"]) },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico");

nav {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
}

ul {
  display: inline;
}

h1 {
  font-family: Pacifico, Avenir, Helvetica, Arial, sans-serif;
  font-size: 2rem;
  text-align: center;
  flex: 1;
  margin: 0;
}

p {
  color: white;
  margin: 0;
  line-height: normal;
}

.sidenav-trigger {
  margin: 0;
}

.user-view {
  padding-bottom: 1rem;
}

.user-name {
  font-size: 1.5rem;
}

.divider {
  margin-bottom: 1rem;
}

.btn {
  background-color: #1565c0;
}

.btn:hover,
.btn:focus {
  background-color: white;
  color: #1565c0;
}

/* Tablet + Desktop */
@media (min-width: 37.5em) {
  .mobile-nav {
    display: none;
  }
}
</style>
