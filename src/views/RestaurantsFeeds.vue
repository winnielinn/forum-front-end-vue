<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-">最新動態</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <NewestRestaurants v-bind:restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <h3>最新評論</h3>
          <NewestComments v-bind:comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "./../utils/helper";
import Spinner from "../components/Spinner.vue";

export default {
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true,
    };
  },
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner,
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true;
        const { data } = await restaurantsAPI.getFeeds();
        const { restaurants, comments } = data;

        this.restaurants = restaurants;
        this.comments = comments.filter(
          (comment) => comment.Restaurant && comment.text
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得最新動態的資料，請稍後再試",
        });
      }
    },
  },
};
</script>
