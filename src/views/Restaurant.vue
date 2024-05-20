<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <RestaurantDetail v-bind:restaurant="restaurant" />
    <hr />
    <RestaurantComments
      v-bind:restaurantComments="restaurantComments"
      v-bind:currentUser="currentUser"
      v-on:after-delete-comment="afterDeleteComment"
    />
    <CreateComment
      v-bind:restaurantId="restaurant.id"
      v-on:after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helper";
import { mapState } from 'vuex';

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
    };
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
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
      try {
        const { data, isFavorited, isLiked } = await restaurantAPI.getRestaurant({ restaurantId });

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
          isFavorited: isFavorited,
          isLiked: isLiked,
        };

        this.restaurantComments = Comments;
      } catch (error) {
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
