<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div
      v-for="restaurant in restaurants"
      v-bind:key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link :to="'#'">
            <img class="card-img" v-bind:src="restaurant.image" />
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              :to="{
                name: 'restaurant',
                params: {
                  id: restaurant.id,
                },
              }"
              class="btn btn-primary mr-2"
              >Show</router-link
            >

            <button
              type="button"
              v-if="restaurant.isFavorited"
              @click.stop.prevent="removeFavorite(restaurant.id)"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              type="button"
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";

const dummyData = {
  restaurants: [
    {
      id: 50,
      name: "Demond Turcotte",
      tel: "826.623.1663 x3641",
      address: "50426 Deion Expressway",
      opening_hours: "08:00",
      description: "Repellat et a quo qui voluptas magni perspiciatis ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=8.206144142038173",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 49,
      name: "Ms. Wendell Collins",
      tel: "922.798.8328 x39381",
      address: "912 Ritchie Manor",
      opening_hours: "08:00",
      description: "ut",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=18.98661625330833",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 48,
      name: "Julius Hickle",
      tel: "1-913-916-0403",
      address: "6215 Thiel Knolls",
      opening_hours: "08:00",
      description: "Rerum harum est nam sunt ullam alias. Corrupti dol",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=73.30662967737784",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 47,
      name: "Alexandre Cole",
      tel: "955.350.6451 x2960",
      address: "41680 Nikolaus Ramp",
      opening_hours: "08:00",
      description: "Unde harum rerum placeat.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=12.742005407594469",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 46,
      name: "Ashly Farrell",
      tel: "1-559-373-4671 x7626",
      address: "07166 Alan Highway",
      opening_hours: "08:00",
      description: "non",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=74.28694478322075",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 45,
      name: "Darrick Bartoletti Jr.",
      tel: "1-778-691-4994 x1413",
      address: "309 Kling Camp",
      opening_hours: "08:00",
      description: "Esse est nemo est dolor officia. Similique quas do",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=32.504473623755324",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 44,
      name: "Celia Greenholt DDS",
      tel: "1-579-750-7511 x77694",
      address: "115 D'Amore Circles",
      opening_hours: "08:00",
      description: "Consectetur assumenda dicta et dolores quidem ipsa",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=74.46256191659005",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 43,
      name: "Madisen Dietrich",
      tel: "(949) 846-3744 x189",
      address: "753 Maida Mills",
      opening_hours: "08:00",
      description: "aut qui in",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=43.85651530068338",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 42,
      name: "Adalberto Lindgren",
      tel: "1-928-423-7940 x865",
      address: "48433 Kayden Springs",
      opening_hours: "08:00",
      description: "sit harum qui",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=83.98704006300446",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 41,
      name: "Araceli Hilpert",
      tel: "(243) 734-6592 x226",
      address: "772 Hoppe Forge",
      opening_hours: "08:00",
      description: "Explicabo odit ex corporis praesentium possimus. O",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=98.18712584740341",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
  ],
};

export default {
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    addFavorite(restaurantId) {
      this.restaurants = this.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            isFavorited: (restaurant.isFavorited = true),
            FavoriteCount: (restaurant.FavoriteCount += 1),
          };
        } else {
          return restaurant;
        }
      })
      .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
    },
    removeFavorite(restaurantId) {
      this.restaurants = this.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            isFavorited: (restaurant.isFavorited = false),
            FavoriteCount: (restaurant.FavoriteCount -= 1),
          };
        } else {
          return restaurant;
        }
      })
      .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
    },
  },
};
</script>