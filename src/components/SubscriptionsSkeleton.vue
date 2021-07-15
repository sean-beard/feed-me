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
  name: "SubscriptionsSkeleton",
  components: {
    Skeleton,
  },
  data() {
    return {
      rows: [...Array(5).keys()],
    };
  },
};
</script>

<style scoped>
.skeleton {
  width: 100%;
  max-width: 400px;
  height: 3rem;
  margin: 1rem auto;
}
</style>
