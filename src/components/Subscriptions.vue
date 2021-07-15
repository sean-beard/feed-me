<template>
  <div>
    <h2>Your subscriptions</h2>

    <div v-if="isLoading"><SubscriptionsSkeleton /></div>
    <h3 v-else-if="error" class="error">{{ error }}</h3>
    <ul
      v-else-if="subscriptions.length"
      v-for="sub in subscriptions"
      :key="sub.id"
    >
      <li class="row">
        <p class="feed">{{ sub.feedName }}</p>

        <div class="btn-wrapper">
          <button class="btn" @click="handleUnsubscribe(sub.id)">
            Unsubscribe
          </button>
        </div>
      </li>
    </ul>
    <p v-else>Nothing to see here! Subscribe to your first feed above.</p>
  </div>
</template>

<script>
import { get, deletion } from "@/utils/api.js";
import SubscriptionsSkeleton from "@/components/SubscriptionsSkeleton";

export default {
  name: "Subscriptions",
  components: { SubscriptionsSkeleton },
  data() {
    return {
      subscriptions: [],
      isLoading: false,
      error: "",
    };
  },
  methods: {
    fetchSubscriptions() {
      this.isLoading = true;

      get("/subscription")
        .then(({ status, subscriptions }) => {
          if (status === 200) {
            this.subscriptions = subscriptions;
          }
        })
        .catch(() => {
          this.error = "Oops! There was an error getting your subscriptions.";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleUnsubscribe(subscriptionId) {
      deletion("/subscription", { subscriptionId }).then(data => {
        if (data.status === 200) {
          let updatedSubscriptions = [];

          this.subscriptions.forEach(sub => {
            if (sub.id === subscriptionId) {
              return;
            }

            updatedSubscriptions.push(sub);
          });

          this.subscriptions = updatedSubscriptions;
        }
      });
    },
  },
  created() {
    this.fetchSubscriptions();
    this.eventHub.$on("subscribe", this.fetchSubscriptions);
  },
  beforeDestroy() {
    this.eventHub.$off("subscribe", this.fetchSubscriptions);
  },
};
</script>

<style scoped>
p {
  font-size: 1.25em;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  max-width: 400px;
  width: 100%;
}

.feed {
  text-align: left;
  margin-right: 1rem;
}

.btn-wrapper {
  flex: 1;
  text-align: right;
}

.btn {
  background-color: maroon;
  text-transform: none;
}

.btn:focus,
.btn:hover {
  background-color: white;
  color: maroon;
}

.error {
  color: maroon;
  font-size: 1.5em;
}

/* Mobile */
@media (max-width: 37.5em) {
  .row {
    padding: 0 2rem;
  }
}
</style>
