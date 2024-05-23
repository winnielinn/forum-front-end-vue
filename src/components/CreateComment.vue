<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import userAPI from "../apis/users";
import { Toast } from "../utils/helper";

export default {
  data() {
    return {
      text: "",
    };
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = await userAPI.createComment({
          currentUser: this.currentUser,
          restaurantId: this.restaurantId,
          text: this.text,
        });

        const { status, commentId } = data;

        if (status === "error") {
          throw new Error(data.message);
        }
        

        this.$emit("after-create-comment", {
          commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });

        this.text = "";
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試",
        });
        console.error("error", error);
      }
    },
  },
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>