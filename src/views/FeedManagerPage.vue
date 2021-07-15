<template>
  <div>
    <section>
      <SubscriptionForm class="form" />
    </section>
    <section>
      <Subscriptions />
    </section>
  </div>
</template>

<script>
import SubscriptionForm from "@/components/SubscriptionForm";
import Subscriptions from "@/components/Subscriptions";

export default {
  name: "FeedManagerPage",
  components: {
    SubscriptionForm,
    Subscriptions,
  },
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.form {
  margin-bottom: 5rem;
}
</style>
