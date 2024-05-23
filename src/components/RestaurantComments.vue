<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" v-bind:key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import userAPI from "../apis/users";
import { Toast } from "../utils/helper";
import { mapState } from 'vuex';

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const { data } = await userAPI.deleteComment({commentId});

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$emit("after-delete-comment", commentId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法刪除評論，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  mixins: [fromNowFilter],
};
</script>