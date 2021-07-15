<template>
  <div>
    <div v-for="row in rows" :key="row" class="skeleton">
      <Skeleton height="100%" />
    </div>
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
  name: "FeedSkeleton",
  components: {
    Skeleton,
  },
  data() {
    return {
      rows: [...Array(15).keys()],
    };
  },
};
</script>

<style scoped>
.skeleton {
  width: 80%;
  max-width: 750px;
  height: 5rem;
  margin: 1rem auto;
}
</style>
