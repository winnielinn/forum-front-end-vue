<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div>
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>

      <hr />

      <ul>
        <li>評論數： {{ restaurant.commentsLength }}</li>
        <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
      </ul>

      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
    </template>
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helper";
import Spinner from "./../components/Spinner";

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
      isLoading: true
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  components: {
    Spinner,
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true;
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        const { id, name, Category, Comments, viewCounts } = data.restaurant;
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          commentsLength: Comments.length,
          viewCounts,
        };

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資訊，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>