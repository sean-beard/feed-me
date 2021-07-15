import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    authToken: "",
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateAuthStatus(state, { isAuthenticated, authToken }) {
      state.isAuthenticated = isAuthenticated;
      state.authToken = authToken;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("updateUser", user);
      commit("updateAuthStatus", {
        isAuthenticated: true,
        authToken: user.token,
      });
    },
    setIsAuthenticated({ commit }, payload) {
      commit("updateAuthStatus", payload);
    },
  },
  getters: {
    authToken: ({ authToken }) => authToken,
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
