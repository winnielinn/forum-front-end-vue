<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4" v-show="!isLoading">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
        @load="changeLoading"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <!-- :to="{ name: 'restaurant', params: { id: restaurant.id }}" -->
          <router-link :to="`/restaurants/${restaurant.id}`">{{
            restaurant.name
          }}</router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category ? restaurant.Category.name : "未分類"
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          type="button"
          v-if="restaurant.isFavorited"
          v-on:click.stop.prevent="removeFavorite(restaurant.id)"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          v-else
          v-on:click.stop.prevent="addFavorite(restaurant.id)"
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          v-on:click.stop.prevent="removeLike(restaurant.id)"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          v-else
          type="button"
          v-on:click.stop.prevent="addLike(restaurant.id)"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helper";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isLoading: true,
    };
  },
  methods: {
    changeLoading () {
      this.isLoading = false
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
        console.error("error", error);
      }
    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.removeFavorite({ restaurantId });
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({ restaurantId });
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入喜愛的清單，請稍後再試",
        });
        console.error("error", error);
      }
    },
    async removeLike(restaurantId) {
      try {
        const { data } = await usersAPI.removeLike({ restaurantId });
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除喜愛的清單，請稍後再試",
        });
        console.error("error", error);
      }
    },
  },
};
</script>

<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}
.card-img-top {
  background-color: #EFEFEF;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>