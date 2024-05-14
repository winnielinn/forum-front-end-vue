<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        v-model="restaurant.name"
        id="name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        v-model="restaurant.categoryId"
        id="categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        v-model="restaurant.tel"
        id="tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        v-model="restaurant.address"
        id="address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        v-model="restaurant.opening_hours"
        id="opening-hours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        v-model="restaurant.description"
        id="description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
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

    <button type="submit" class="btn btn-primary">送出</button>
  </form>
</template>

<script>
const dummyData = {
  categories: [
    {
      id: 6,
      name: "美式料理",
      createdAt: "2019-11-20T06:25:42.917Z",
      updatedAt: "2019-11-20T06:25:42.917Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2019-11-20T06:25:42.917Z",
      updatedAt: "2019-11-20T06:25:42.917Z",
    },
    {
      id: 109,
      name: "cool",
      createdAt: "2019-12-17T11:36:08.937Z",
      updatedAt: "2019-12-17T11:36:08.937Z",
    },
    {
      id: 110,
      name: "ccc",
      createdAt: "2020-01-12T16:58:30.105Z",
      updatedAt: "2020-01-20T12:30:43.772Z",
    },
  ],
};

export default {
  name: "AdminRestaurantForm",
  props: {
    initialRestaurant: {
      type: Object,
      default: () => {
        return {
          name: "",
          categoryId: "",
          tel: "",
          address: "",
          opening_hours: "",
          description: "",
          image: "",
        };
      },
    },
  },
  data() {
    return {
      categories: [],
      restaurant: {
        ...this.initialRestaurant
      },
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories;
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.restaurant.image = "";
        return;
      }
      const imageURL = window.URL.createObjectURL(files[0]);
      this.restaurant.image = imageURL;
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>