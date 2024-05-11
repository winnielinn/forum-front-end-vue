<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1,
    name: "Kaylah Kerluke",
    tel: "1-471-742-4286",
    address: "7260 Langosh Parkway",
    opening_hours: "08:00",
    description: "Aliquam voluptate ut.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=94.52009952712272",
    viewCounts: 0,
    createdAt: "2024-05-07T05:57:29.000Z",
    updatedAt: "2024-05-07T05:57:29.000Z",
    CategoryId: 4,
    Category: {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
    },
    Comments: [
      {
        id: 1,
        text: "Voluptatem hic accusantium.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$7g4m3oFuvse/1l.xXKcgLunQGcjoy/KU1x7lFg0v/ppjlvM6JVDJ6",
          isAdmin: false,
          image: null,
          createdAt: "2024-05-07T05:57:28.000Z",
          updatedAt: "2024-05-07T05:57:28.000Z",
        },
      },
      {
        id: 51,
        text: "Unde officia dolorem explicabo.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$7g4m3oFuvse/1l.xXKcgLunQGcjoy/KU1x7lFg0v/ppjlvM6JVDJ6",
          isAdmin: false,
          image: null,
          createdAt: "2024-05-07T05:57:28.000Z",
          updatedAt: "2024-05-07T05:57:28.000Z",
        },
      },
      {
        id: 101,
        text: "Omnis modi architecto.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$7g4m3oFuvse/1l.xXKcgLunQGcjoy/KU1x7lFg0v/ppjlvM6JVDJ6",
          isAdmin: false,
          image: null,
          createdAt: "2024-05-07T05:57:28.000Z",
          updatedAt: "2024-05-07T05:57:28.000Z",
        },
      },
    ],
  },
};

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      const { restaurant } = dummyData;
      const { id, name, Category, Comments, viewCounts } = restaurant;
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryName: Category ? Category.name : "未分類",
        commentsLength: Comments.length,
        viewCounts,
      };
    },
  },
};
</script>