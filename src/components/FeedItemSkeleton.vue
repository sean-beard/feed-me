<template>
  <div>
    <Skeleton class="skeleton" width="9rem" height="2.25rem" />
    <Skeleton class="skeleton" width="80%" height="50vh" />
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
  name: "FeedItemSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style scoped>
.skeleton {
  display: block;
  margin: 2rem 0;
}
</style>
