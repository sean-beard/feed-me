<template>
  <div>
    <div v-if="loading"><FeedSkeleton /></div>
    <h2 v-else-if="error">{{ error }}</h2>

    <div v-if="this.isAuthenticated">
      <section>
        <NewsFeed v-if="feedItems.length" :items="feedItems" />

        <h2 v-if="!feedItems.length && !error && !loading">
          Nothing to see here... Head over to
          <router-link :to="{ name: 'FeedManagerPage' }">
            Manage Feeds
          </router-link>
          to subscribe to your first feed!
        </h2>
      </section>
    </div>

    <PreLoginHome v-if="!this.isAuthenticated" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FeedSkeleton from "@/components/FeedSkeleton";
import NewsFeed from "@/components/NewsFeed";
import PreLoginHome from "@/components/PreLoginHome";
import { get } from "@/utils/api";

export default {
  name: "Home",
  components: {
    FeedSkeleton,
    PreLoginHome,
    NewsFeed,
  },
  data() {
    return {
      loading: false,
      error: "",
      feedItems: [],
    };
  },
  methods: {
    getFeeds() {
      this.loading = true;

      get("/feed")
        .then(({ status, feed }) => {
          if (status === 500) {
            this.error = "There was an error loading your feed";
            return;
          }
          this.feedItems = feed;
        })
        .catch(() => {
          this.error = "There was an error loading your feed";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  created() {
    if (this.isAuthenticated) {
      this.getFeeds();
    }
  },
};
</script>

<style scoped>
h2 {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
