<template>
  <div class="container py-5">
    <NavTabs />
    <RestaurantNavPillsVue v-bind:categories="categories" />

    <div class="row">
      <RestaurantCard
        v-for="restaurant in restaurants"
        v-bind:key="restaurant.id"
        v-bind:initial-restaurant="restaurant"
      />
    </div>

    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import RestaurantNavPillsVue from "../components/RestaurantNavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "./../utils/helper";

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantNavPillsVue,
    RestaurantsPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousePage: -1,
      nextPage: -1,
    };
  },
  created() {
    this.fetchRestaurants({
      queryPage: 1,
      queryCategoryId: "",
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(this.$route);
    const { page = '', categoryId = ''} = this.$route.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    next();
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;

        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>
