<template>
  <div class="container py-5">
    <NavTabs />
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
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "./../utils/helper";

export default {
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsAPI.getFeeds();
        const { data } = response;
        this.restaurants = data.restaurants;
        this.comments = data.comments;
      } catch (error) {
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
