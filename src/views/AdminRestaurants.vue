<template>
  <div class="container py-5">
    <AdminNav />

    <router-link :to="'/admin/restaurants/new'" class="btn btn-primary mb-4"> New Restaurant </router-link>

    <AdminRestaurantsTable />
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import AdminRestaurantsTable from "../components/AdminRestaurantsTable.vue";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable,
  },
};
</script>
