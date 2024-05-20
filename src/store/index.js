import Vue from "vue";
import Vuex from "vuex";
import userAPI from "../apis/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: "",
      email: "",
      image: "",
      isAdmin: false,
    },
    isAuthenticated: false,
  },
  getters: {},
  // commit 發動
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true;
    },
  },
  // dispatch 發動
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, name, email, image, isAdmin } = data;

        commit("setCurrentUser", {
          id,
          name,
          email,
          image,
          isAdmin,
        });
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  modules: {},
});
