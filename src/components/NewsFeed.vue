<template>
  <div>
    <form>
      <div class="input-field">
        <label for="search">{{
          `Search ${shouldFilterUnread ? "unread" : "all"}`
        }}</label>
        <input id="search" type="search" v-model="searchTerm" />
      </div>
      <button
        v-if="searchTerm"
        class="clear-search-btn"
        type="button"
        @click.prevent="searchTerm = ''"
      >
        <span class="visually-hidden">Clear search text</span>
        <i class="material-icons">close</i>
      </button>
    </form>

    <div class="controls">
      <div class="status-controls">
        <label v-if="renderedItems.length">
          <input type="checkbox" :value="true" v-model="areAllChecked" />
          <span class="visually-hidden">Select all items</span>
        </label>

        <div class="btn-wrapper" v-if="checkedItemIds.length">
          <button
            class="btn"
            :disabled="isLoading"
            @click="handleMarkAll('read')"
          >
            Mark as Read
          </button>
          <button
            class="btn"
            :disabled="isLoading"
            @click="handleMarkAll('unread')"
          >
            Mark as Unread
          </button>
        </div>
      </div>

      <div v-if="unreadItems.length !== items.length">
        <label class="desktop-filter">
          <input type="checkbox" :value="true" v-model="shouldFilterUnread" />
          <span>Filter by unread</span>
        </label>

        <label
          class="btn mobile-filter"
          :class="shouldFilterUnread ? 'mobile-filtered' : 'mobile-unfiltered'"
        >
          <input
            type="checkbox"
            class="visually-hidden"
            :value="true"
            v-model="shouldFilterUnread"
          />
          <span class="visually-hidden">Filter by unread</span>
          <i class="material-icons">filter_list</i>
        </label>
      </div>
    </div>

    <div class="feed-row" v-for="item in renderedItems" :key="item.id">
      <label>
        <input type="checkbox" :value="item.id" v-model="checkedItemIds" />
        <span class="visually-hidden">{{ item.title }}</span>
      </label>
      <FeedItemCard class="full" :item="item" />
    </div>

    <h2 v-if="!renderedItems.length">
      Nothing to see here!
    </h2>
  </div>
</template>

<script>
import { put } from "@/utils/api";
import FeedItemCard from "./FeedItemCard";

export default {
  name: "NewsFeed",
  components: {
    FeedItemCard,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      areAllChecked: false,
      checkedItemIds: [],
      searchTerm: "",
      shouldFilterUnread: false,
      isLoading: false,
    };
  },
  computed: {
    unreadItems() {
      return this.items.filter(item => !item.isRead);
    },
    renderedItems() {
      const items = this.shouldFilterUnread ? this.unreadItems : this.items;

      if (!this.searchTerm) return items;

      const searchTerm = this.searchTerm.toLowerCase();

      return items.filter(
        item =>
          item.title.toLowerCase().indexOf(searchTerm) > -1 ||
          item.feedName.toLowerCase().indexOf(searchTerm) > -1 ||
          (item.description || "").toLowerCase().indexOf(searchTerm) > -1
      );
    },
  },
  methods: {
    handleMarkAll(status) {
      const newIsReadStatus = status === "read";
      const payload = this.checkedItemIds.map(id => ({
        id: id,
        isRead: newIsReadStatus,
      }));

      this.isLoading = true;

      // TODO: catch/handle error
      put("/item", { items: payload })
        .then(({ status }) => {
          if (status !== 200) {
            // TODO: catch/handle error
            return;
          }

          // TODO: don't mutate prop
          this.items = this.items.map(item => {
            if (this.checkedItemIds.indexOf(item.id) < 0) {
              return item;
            }

            return {
              ...item,
              isRead: newIsReadStatus,
            };
          });

          this.areAllChecked = false;
          this.checkedItemIds = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    areAllChecked(selectEverything) {
      this.checkedItemIds = selectEverything
        ? this.renderedItems.map(item => item.id)
        : [];
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
}

label[for="search"],
input[type="search"] {
  padding-left: 0.5rem;
}

input[type="search"] {
  width: 350px;
}

button + button {
  margin-left: 1rem;
}

.clear-search-btn {
  background: none;
  border: none;
  cursor: pointer;
  height: 40px;
  margin-top: 1.5rem;
  margin-left: -2rem;
  z-index: 10;
}

.controls,
.feed-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  width: 80%;
  max-width: 750px;
  min-height: 4.5rem;
}

.feed-row {
  justify-content: center;
}

.status-controls {
  display: flex;
  align-items: center;
  flex: 1;
}

.full {
  flex: 1;
}

.desktop-filter {
  margin-left: 1rem;
}

.mobile-filter {
  display: none;
}

.visually-hidden,
.mobile-filter [type="checkbox"] + span:not(.lever) {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.btn.mobile-filtered,
.btn.mobile-filtered,
.btn.mobile-filtered:hover,
.btn.mobile-filtered:focus {
  background-color: #1a237e;
  color: white;
}

.btn.mobile-unfiltered,
.btn.mobile-unfiltered,
.btn.mobile-unfiltered:hover,
.btn.mobile-unfiltered:focus {
  background-color: white;
  color: #1a237e;
}

[type="checkbox"] + span:not(.lever) {
  color: #1a237e;
  font-weight: bold;
}

[type="checkbox"]:checked + span:not(.lever)::before {
  border-right-color: #1a237e;
  border-bottom-color: #1a237e;
}

/* Mobile */
@media (max-width: 37.5em) {
  button + button {
    margin-left: 0;
    margin-top: 1rem;
  }

  .btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  .controls,
  .feed-row {
    min-height: 6rem;
  }

  .desktop-filter {
    display: none;
  }

  .mobile-filter {
    display: block;
  }
}
</style>
