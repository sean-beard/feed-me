<template>
  <nav class="indigo darken-4">
    <h1>
      <router-link :to="{ name: 'Home' }">FeedMe</router-link>
    </h1>

    <div v-if="this.isAuthenticated">
      <ul>
        <li>
          <router-link :to="{ name: 'FeedManagerPage' }">
            Manage Feeds
          </router-link>
        </li>
      </ul>

      <button class="btn" @click="logout">
        Logout
      </button>
    </div>

    <a v-if="!this.isAuthenticated" :href="loginUrl">
      Login with Github
    </a>
  </nav>
</template>

<script>
import authMixin from "@/mixins/authMixin";

export default {
  name: "DesktopNav",
  mixins: [authMixin],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico");

nav {
  display: flex;
  justify-content: space-between;
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
  margin: auto 1rem;
}

.btn {
  background-color: #1565c0;
}

.btn:hover,
.btn:focus {
  background-color: white;
  color: #1565c0;
}

/* Mobile */
@media (max-width: 37.5em) {
  nav {
    display: none;
  }
}
</style>
