<template>
  <div class="container py-5">
    <UserProfileCard
      v-bind:user="user"
      v-bind:is-current-user="currentUser.id === user.id"
      v-bind:initial-is-followed="isFollowed"
    />

    <div class="row">
      <div class="col-md-4">
        <UserFollowingsCard v-bind:followings="followings" />

        <UserFollowersCard v-bind:followers="followers" />
      </div>
      <div class="col-md-8">
        <UserCommentsCard v-bind:comments="comments" />

        <UserFavoritedRestaurantsCard
          v-bind:favoritedRestaurants="favoritedRestaurants"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard.vue";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helper";
import { mapState } from "vuex";

export default {
  name: "user",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
        email: "",
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
      },
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser(userId);
    next();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId });
        const { profile, isFollowed } = data;

        const {
          id,
          image,
          name,
          email,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants,
        } = profile;

        this.user = {
          ...this.user,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length,
        };

        this.isFollowed = isFollowed;
        this.followings = Followings;
        this.followers = Followers;
        this.favoritedRestaurants = FavoritedRestaurants;
        this.comments = Comments.filter((comment) => comment.Restaurant);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "取得使用者資料失敗，請稍後再試",
        });
        console.error("error", error);
      }
    },
  },
};
</script>