<template>
  <div>
    <div class="hero-container">
      <p>
        The open source RSS feed reader designed to put <em>you</em> in control
        of the news that's important
      </p>
      <div class="hero-footer">
        <h2>Start curating your newsfeed</h2>
        <a class="btn" :href="loginUrl">
          Login with Github
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/authMixin";

export default {
  name: "PreLoginHome",
  mixins: [authMixin],
};
</script>

<style scoped>
p {
  font-size: 1.5em;
  margin-top: 0;
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20rem;
  width: 75vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(#1a237e, #1565c0);
  color: white;
  border-radius: 16px;
}

.hero-title {
  margin: 0;
}

.btn {
  text-transform: none;
}

/* Mobile */
@media (max-width: 37.5em) {
  .hero-container {
    width: 90vw;
    height: fit-content;
  }
}
</style>
