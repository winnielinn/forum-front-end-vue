<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>

      <hr />
      <div
        v-for="restaurant in restaurants"
        v-bind:key="restaurant.id"
        class="card mb-3"
        style="max-width: 540px; margin: auto"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <router-link :to="'#'">
              <img class="card-img" v-bind:src="restaurant.image" />
            </router-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{ restaurant.name }}
              </h5>
              <span class="badge badge-secondary"
                >收藏數：{{ restaurant.FavoriteCount }}</span
              >
              <p class="card-text">
                {{ restaurant.description }}
              </p>
              <router-link
                :to="{
                  name: 'restaurant',
                  params: {
                    id: restaurant.id,
                  },
                }"
                class="btn btn-primary mr-2"
                >Show</router-link
              >

              <button
                type="button"
                v-if="restaurant.isFavorited"
                @click.stop.prevent="removeFavorite(restaurant.id)"
                class="btn btn-danger mr-2"
              >
                移除最愛
              </button>
              <button
                type="button"
                v-else
                @click.stop.prevent="addFavorite(restaurant.id)"
                class="btn btn-primary"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import restaurantsAPI from "../apis/restaurants";
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
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      this.isLoading = true;
      try {
        const { data } = await restaurantsAPI.getTops();
        this.restaurants = data.restaurants;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "取得人氣餐廳失敗，請稍後再試",
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited: (restaurant.isFavorited = true),
                FavoriteCount: (restaurant.FavoriteCount += 1),
              };
            } else {
              return restaurant;
            }
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "餐廳加入最愛失敗，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.removeFavorite({ restaurantId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited: (restaurant.isFavorited = false),
                FavoriteCount: (restaurant.FavoriteCount -= 1),
              };
            } else {
              return restaurant;
            }
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>