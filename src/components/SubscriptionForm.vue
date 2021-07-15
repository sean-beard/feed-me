<template>
  <div>
    <h2>Subscribe to a feed</h2>

    <h3 v-if="successMsg" class="success">{{ successMsg }}</h3>
    <h3 v-else-if="error" class="error">{{ error }}</h3>
    <div v-else-if="hasUnsupportedFormatError" class="error">
      <p>Unsupported RSS feed format.</p>

      <p>
        Please
        <a
          :href="
            `https://github.com/sean-beard/feed-me/issues/new?title=Unsupported%20RSS%20Format&body=URL:%20${this.url.trim()}`
          "
          target="_blank"
          rel="noopener"
        >
          open an issue and include the URL
        </a>
        you've attempted to subscribe to so we can support it going forward.
      </p>
    </div>

    <form @submit="subscribe">
      <div class="input-field">
        <input id="url" class="validate" type="text" v-model="url" required />
        <label for="url">Enter the RSS feed URL</label>
      </div>
      <button class="btn" type="submit" :disabled="isLoading">
        {{ isLoading ? "Subscribing..." : "Subscribe" }}
      </button>
    </form>
  </div>
</template>

<script>
import { post } from "@/utils/api.js";

export default {
  name: "SubscriptionForm",
  data() {
    return {
      url: "",
      isLoading: false,
      successMsg: "",
      error: "",
      hasUnsupportedFormatError: false,
    };
  },
  methods: {
    subscribe(event) {
      event.preventDefault();

      if (!this.url.trim()) {
        return;
      }

      this.isLoading = true;
      this.successMsg = "";
      this.error = "";
      this.hasUnsupportedFormatError = false;

      post("/subscription", { url: this.url })
        .then(({ status }) => {
          if (status === 200) {
            this.successMsg = "Successfully subscribed!";
            this.url = "";
            this.eventHub.$emit("subscribe");
          }

          if (status === 500) {
            this.error =
              "Oops! There was an error subscribing. Please try again later.";
          }

          if (status === 415) {
            this.hasUnsupportedFormatError = true;
          }
        })
        .catch(() => {
          this.error =
            "Oops! There was an error subscribing. Please try again later.";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.input-field {
  margin: 1rem auto;
  max-width: 400px;
  width: 80%;
}

.error,
.success {
  font-size: 1.5em;
  margin-bottom: 2rem;
}

.error {
  color: maroon;
}

.success {
  color: darkgreen;
}
</style>
