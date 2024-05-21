<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image | emptyImage"
          class="d-block img-thumbnail m-3"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helper";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
        email: "",
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.setUser(id);
  },
  mixins: [emptyImageFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.setUser(id);
    next();
  },
  methods: {
    async setUser(userId) {
      try {
        const { data } = await usersAPI.getCurrentUser();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, name, image } = data;
        this.user = {
          ...this.user,
          id,
          name,
          image,
        };

        if (userId.toString() !== id.toString()) {
          this.$router.push( { name: '404'})
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.image = "";
        return;
      }
      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.image = imageURL;
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);

      // TODO: 透過 API 向伺服器更新使用者
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
  watch: {
    currentUser(user) {
      if (user.id !== this.currentUser.id) return;

      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
};
</script>