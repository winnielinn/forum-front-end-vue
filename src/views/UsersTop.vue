<template>
  <div class="container py-5">
    <NavTabs />

    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">美食達人</h1>
      <hr />
      <div class="row text-center">
        <div class="col-3" v-for="user in users" v-bind:key="user.id">
          <router-link v-bind:to="'#'">
            <img v-bind:src="user.image ?? null" width="140px" height="140px" />
          </router-link>
          <h2>{{ user.name ?? "無名氏" }}</h2>
          <span class="badge badge-secondary"
            >追蹤人數：{{ user.FollowerCount }}</span
          >
          <p class="mt-3">
            <button
              type="button"
              class="btn btn-danger"
              v-if="user.isFollowed"
              v-on:click.stop.prevent="removeFollow(user.id)"
              :disabled="isProcessing"
            >
              取消追蹤
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-else
              v-on:click.stop.prevent="addFollow(user.id)"
              :disabled="isProcessing"
            >
              追蹤
            </button>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helper";
import Spinner from "./../components/Spinner";

export default {
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
      isProcessing: false,
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      this.isLoading = true;
      try {
        const { data } = await usersAPI.getTopUsers();

        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.name,
          FollowerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async addFollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollow({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
              FollowerCount: user.FollowerCount + 1,
            };
          } else {
            return user;
          }
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法追蹤使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async removeFollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.removeFollow({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
              FollowerCount: user.FollowerCount - 1,
            };
          } else {
            return user;
          }
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>
