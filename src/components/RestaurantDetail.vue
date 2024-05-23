<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | emptyImage"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="`/restaurants/${restaurant.id}/dashboard`"
        >Dashboard</router-link
      >

      <button
        v-if="restaurant.isFavorited"
        @click.stop.prevent="removeFavorite(restaurant.id)"
        type="button"
        class="btn btn-danger btn-border mr-2"
        :disabled="isProcessing"
      >
        移除最愛
      </button>
      <button
        v-else
        @click.stop.prevent="addFavorite(restaurant.id)"
        type="button"
        class="btn btn-primary btn-border mr-2"
        :disabled="isProcessing"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        @click.stop.prevent="removeLike(restaurant.id)"
        type="button"
        class="btn btn-danger like mr-2"
        :disabled="isProcessing"
      >
        Unlike
      </button>
      <button
        v-else
        @click.stop.prevent="addLike(restaurant.id)"
        type="button"
        class="btn btn-primary like mr-2"
        :disabled="isProcessing"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "../apis/users";
import { Toast } from "./../utils/helper";

export default {
  name: "RestaurantDetail",
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "無法加到最愛，請稍後再試",
        });
      }
    },
    async removeFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.removeFavorite({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "無法移除最愛，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addLike({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "無法加入喜歡的清單，請稍後再試",
        });
      }
    },
    async removeLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.removeLike({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "無法移除喜歡的清單，請稍後再試",
        });
      }
    },
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>