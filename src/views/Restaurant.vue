<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <template v-else>
      <RestaurantDetail :initial-restaurant="restaurant" />
      <hr>
      <RestaurantComments
        :restaurant-comments="restaurantComments"
        @after-delete-comment="afterDeleteComment"
      />
      <CreateComment
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helper";
import { mapState } from 'vuex';
import Spinner from './../components/Spinner.vue';

export default {
  name: "Restaurant",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
      isLoading: true
    };
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner,
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true;
      try {
        const { data } = await restaurantAPI.getRestaurant({ restaurantId });

        const {
          id,
          name,
          Category,
          image,
          opening_hours,
          tel,
          address,
          description,
          Comments,
        } = data.restaurant;

        this.restaurant = {
          id: id,
          name: name,
          categoryName: Category.name ?? "未分類",
          image: image,
          openingHours: opening_hours,
          tel: tel,
          address: address,
          description: description,
          isFavorited: data.isFavorited,
          isLiked: data.isLiked,
        };

        this.restaurantComments = Comments;
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
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        RestaurantId: restaurantId,
        text,
        createdAt: new Date(),
      });
    },
  },
};
</script>
