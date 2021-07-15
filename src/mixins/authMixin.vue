<script>
import { mapActions, mapState } from "vuex";
import { get } from "@/utils/api";

export default {
  data() {
    return {
      loginUrl: `${process.env.VUE_APP_BASE_API_URL}/auth/github`,
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["setIsAuthenticated"]),
    logout() {
      get("/auth/logout", { useAuth: false }).then(({ status }) => {
        if (status === 200) {
          this.setIsAuthenticated({ isAuthenticated: false, token: "" });
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>
