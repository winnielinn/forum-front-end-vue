import { apiHelper } from "../utils/helper";

export default {
  categories: {
    get() {
      return apiHelper.get("/admin/categories");
    },
    create({ name }) {
      return apiHelper.post(
        "/admin/categories",
        { name }
      );
    },
    update({ categoryId, name }) {
      return apiHelper.put(
        `/admin/categories/${categoryId}`,
        { name }
      );
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`);
    },
  },
  restaurants: {
    create({ formData }) {
      return apiHelper.post("/admin/restaurants", formData);
    },
    get() {
      return apiHelper.get("/admin/restaurants");
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`);
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`);
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData);
    },
  },
  users: {
    get() {
      return apiHelper.get("/admin/users");
    },
    updateRole({ userId, isAdmin }) {
      return apiHelper.put(
        `/admin/users/${userId}`,
        { isAdmin }
      );
    },
  },
};
