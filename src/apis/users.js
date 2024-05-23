import { apiHelper } from "../utils/helper";

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`);
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData);
  },
  addFavorite({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null);
  },
  removeFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`);
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null);
  },
  removeLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`);
  },
  getTopUsers() {
    return apiHelper.get("/users/top");
  },
  addFollow({ userId }) {
    return apiHelper.post(`/following/${userId}`, null);
  },
  removeFollow({ userId }) {
    return apiHelper.delete(`/following/${userId}`);
  },
  createComment({ currentUser, text, restaurantId }) {
    return apiHelper.post(
      `/comments`,
      { currentUser, text, restaurantId }
    );
  },
  deleteComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`);
  },
};
