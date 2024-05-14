<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";

const dummyData = {
  restaurant: {
    id: 1,
    name: "Laurence Reynolds",
    tel: "1-657-067-3756 x9782",
    address: "187 Kirlin Squares",
    opening_hours: "08:00",
    description: "sit est mollitia",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887",
    CategoryId: 3,
  },
};

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        opening_hours: "",
        description: "",
        image: "",
        CategoryId: -1,
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      const { restaurant } = dummyData;
      const {
        id,
        name,
        tel,
        address,
        opening_hours,
        description,
        image,
        CategoryId,
      } = restaurant;
      console.log(restaurantId);

      this.restaurant = {
        ...restaurant,
        id,
        name,
        tel,
        address,
        opening_hours,
        description,
        image,
        categoryId: CategoryId,
      };
    },
    handleAfterSubmit(formData) {
      // TODO: 透過 API 把 formData 的資料往後端送
      for (let [name, value] of formData.entries()) {
        console.log(name, " : ", value);
      }
    },
  },
};
</script>