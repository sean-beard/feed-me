<template>
  <div id="app">
    <DesktopNav />
    <MobileNav />
    <router-view class="main" />
    <footer>
      <a
        href="https://github.com/sean-beard/feed-me"
        target="blank"
        rel="noopener"
      >
        <img src="./assets/GitHub_Logo.png" width="100" />
        <img src="./assets/GitHub_Mark.png" width="44" />
      </a>
    </footer>
  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";

export default {
  name: "App",
  components: { DesktopNav, MobileNav },
};
</script>

<style>
h2 {
  font-size: 2rem;
}

footer {
  margin-top: 2rem;
  padding-bottom: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 95vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main {
  flex: 1;
}

.btn {
  background-color: #1a237e;
}

.btn:hover,
.btn:focus {
  background-color: white;
  color: #1a237e;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
