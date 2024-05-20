import { apiHelper } from "../utils/helper";

const getToken = () => localStorage.getItem("token");

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  addFavorite({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  removeFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  removeLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getTopUsers() {
    return apiHelper.get("/users/top", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addFollow({ userId }) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  removeFollow({ userId }) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
