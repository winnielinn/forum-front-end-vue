<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <div class="row" v-else>
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px; margin-bottom: 25px"
        />
        <div class="well">
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
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr />
    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helper";
import Spinner from "../components/Spinner.vue";

export default {
  name: "AdminRestaurant",
  mixins: [emptyImageFilter],
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
      },
      isLoading: true
    };
  },
  components: {
    Spinner
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });

        const {
          id,
          name,
          image,
          openingHours: opening_hours,
          tel,
          address,
          description,
        } = data.restaurant;

        this.restaurant = {
          id,
          name,
          categoryName: data.restaurant.Category.name,
          image,
          openingHours: opening_hours,
          tel,
          address,
          description,
        };

      this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
