<template>
  <router-link
    class="card-panel indigo-text text-darken-4"
    :class="{ unread: !item.isRead }"
    :to="{ name: 'FeedItemPage', params: { id: this.item.id } }"
  >
    <p>{{ item.title }}</p>
    <p>{{ item.feedName }}</p>
  </router-link>
</template>

<script>
export default {
  name: "FeedItemCard",
  props: {
    item: Object,
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

p + p {
  font-weight: normal;
}

.card-panel {
  display: block;
  padding: 1rem;
}

.card-panel:hover,
.card-panel:focus {
  background-color: #bbbbbb;
}

.card-panel.unread {
  border-left: 4px solid #1a237e;
  font-weight: bold;
}

/* Mobile */
@media (max-width: 37.5em) {
  .card-panel:hover,
  .card-panel:focus {
    background-color: initial;
  }
}
</style>
