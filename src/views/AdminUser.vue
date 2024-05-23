<template>
  <div class="container py-5">
    <AdminNav />

    <Spinner v-if="isLoading" />
    <table class="table" v-else>
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>
          <td>
            <button
              v-if="user.id !== currentUser.id"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="
                toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
              "
            >
              {{ user.isAdmin ? "set as user" : "set as admin" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helper";
import { mapState } from "vuex";
import Spinner from './../components/Spinner'

export default {
  components: {
    AdminNav,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.users.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { users } = data;

        this.users = users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者列表，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        console.log(userId, isAdmin);
        const { data } = await adminAPI.users.updateRole({
          userId,
          isAdmin: (!isAdmin).toString(),
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin,
            };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新使用者角色，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>