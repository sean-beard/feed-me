<template>
  <div>
    <div v-if="isLoading"><FeedItemSkeleton /></div>
    <h2 v-else-if="error">{{ error }}</h2>
    <div v-else>
      <button class="btn" @click="toggleReadStatus()">
        {{ item.isRead ? "Mark as unread" : "Mark as read" }}
      </button>

      <h2 class="title">{{ item.title }}</h2>

      <div class="item-container" ref="itemContainer">
        <div class="item">
          <div v-if="!!item.description">
            <AudioPlayer v-if="item.mediaType === 'audio/mpeg'" :item="item" />
            <div v-else v-html="item.description"></div>
          </div>
          <VideoPlayer
            v-else-if="item.youtubeVideoId"
            :videoId="item.youtubeVideoId"
          />
        </div>

        <a v-if="item.url" :href="item.url" target="_blank" ref="noopener">
          {{ item.url }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { get, put } from "@/utils/api";
import mobileHtmlMixin from "@/mixins/mobileHtmlMixin.vue";
import { getParameterByName } from "@/utils/url";
import AudioPlayer from "@/components/AudioPlayer";
import FeedItemSkeleton from "@/components/FeedItemSkeleton";
import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "FeedItemPage",
  mixins: [mobileHtmlMixin],
  components: { AudioPlayer, FeedItemSkeleton, VideoPlayer },
  data() {
    return {
      item: {},
      isLoading: false,
      error: "",
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "authToken", "newsFeed"]),
  },
  methods: {
    ...mapActions(["setNewsFeed"]),
    updateGlobalCache(newIsReadStatus) {
      const cachedItems = this.newsFeed.itemsCache;

      cachedItems.forEach(cachedItem => {
        if (cachedItem.id !== this.item.id) {
          return;
        }

        cachedItem.isRead = newIsReadStatus;
      });

      this.setNewsFeed({ ...this.newsFeed, itemsCache: cachedItems });
    },
    toggleReadStatus() {
      const newIsReadStatus = !this.item.isRead;

      put("/item", {
        items: [{ id: this.item.id, isRead: newIsReadStatus }],
      })
        .then(() => {
          this.item.isRead = newIsReadStatus;
          this.updateGlobalCache(newIsReadStatus);
        })
        .catch(() => {
          this.error = "There was an error updating the status of this item";
        });
    },
  },
  created() {
    if (!this.isAuthenticated) {
      this.error = "Oops! You must be logged in to do that";
      return;
    }
  },
  mounted() {
    this.isLoading = true;

    get(`/item/${this.$route.params.id}`)
      .then(({ status, item }) => {
        if (status === 500) {
          this.error = "There was an error loading this feed item";
          return;
        }

        if (item.url && item.url.indexOf("youtube.com")) {
          item.youtubeVideoId = getParameterByName(item.url, "v");
        }

        this.item = item;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
.btn {
  margin: 2rem 0 4rem 0;
  min-width: 100px;
}

.title {
  margin: 0 2rem;
}

.item {
  margin-bottom: 2rem;
}

.item-container {
  padding: 3rem;
}

/* Mobile */
@media (max-width: 37.5em) {
  .item-container {
    margin: 1rem auto 2rem auto;
    padding: 0;
  }
}
</style>
