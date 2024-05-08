<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <NewestRestaurants v-bind:restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";

const dummyData = {
  restaurants: [
    {
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
    },
    {
      id: 2,
      name: "Jimmie Marquardt",
      tel: "587.324.7196",
      address: "89814 Gillian Station",
      opening_hours: "08:00",
      description:
        "Consequatur qui temporibus quis qui molestiae rerum minus similique at.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=3.377799020070271",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 3,
      name: "Bettie Dare",
      tel: "(138) 165-3879 x652",
      address: "4438 Grant Island",
      opening_hours: "08:00",
      description:
        "Et recusandae explicabo aut aspernatur praesentium facilis aspernatur explicabo.\nEt est ut beatae.\nInventore ut omnis quisquam quae voluptatem.\nSuscipit accusantium dolores in.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=82.24085197622564",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 4,
      name: "Freda Kreiger",
      tel: "1-579-478-0775",
      address: "8551 Turner Drive",
      opening_hours: "08:00",
      description:
        "Iste commodi consequatur distinctio labore et et vero possimus sit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.51818523560335",
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
    },
    {
      id: 5,
      name: "Braeden Schowalter",
      tel: "(630) 916-4585 x41168",
      address: "240 Greenfelder Glen",
      opening_hours: "08:00",
      description: "Magni sunt neque et molestiae nulla alias porro.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=63.956820232771584",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 6,
      name: "Jay O'Keefe",
      tel: "1-450-005-0334",
      address: "81642 Emilia Locks",
      opening_hours: "08:00",
      description:
        "Doloribus id non harum et. Numquam harum minus facere autem ex optio delectus quibusdam. Architecto quidem velit molestiae atque. Cupiditate iure molestiae magnam quasi est explicabo tenetur ut. Quaerat quidem commodi.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=1.572612887526459",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 7,
      name: "Antonietta Stiedemann",
      tel: "(236) 415-9772",
      address: "0937 Callie Cliff",
      opening_hours: "08:00",
      description: "Sunt voluptas et sint libero est non sit quas.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=14.265987863805085",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 8,
      name: "Ansel Rowe",
      tel: "(106) 207-6769",
      address: "77135 Schultz Trail",
      opening_hours: "08:00",
      description: "optio",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=53.86909146354593",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 9,
      name: "Coralie Greenfelder",
      tel: "365.235.4464",
      address: "34859 Goodwin Throughway",
      opening_hours: "08:00",
      description:
        "Id corrupti ducimus nihil nihil. Non id dolorem porro repellendus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.80354659636116",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
    {
      id: 10,
      name: "Tess O'Reilly",
      tel: "280.616.1948 x081",
      address: "45133 Lisette Squares",
      opening_hours: "08:00",
      description: "Laudantium eos et blanditiis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=80.7363513884497",
      viewCounts: 0,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
    },
  ],
  comments: [
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
      Restaurant: {
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
      },
    },
    {
      id: 2,
      text: "Eius est dolore perferendis labore est autem facere.",
      UserId: 2,
      RestaurantId: 2,
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
      Restaurant: {
        id: 2,
        name: "Jimmie Marquardt",
        tel: "587.324.7196",
        address: "89814 Gillian Station",
        opening_hours: "08:00",
        description:
          "Consequatur qui temporibus quis qui molestiae rerum minus similique at.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=3.377799020070271",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 3,
      text: "Suscipit voluptas et veritatis reiciendis reiciendis.",
      UserId: 3,
      RestaurantId: 3,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 3,
        name: "Bettie Dare",
        tel: "(138) 165-3879 x652",
        address: "4438 Grant Island",
        opening_hours: "08:00",
        description:
          "Et recusandae explicabo aut aspernatur praesentium facilis aspernatur explicabo.\nEt est ut beatae.\nInventore ut omnis quisquam quae voluptatem.\nSuscipit accusantium dolores in.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=82.24085197622564",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 4,
      text: "Neque expedita ad architecto debitis aspernatur et natus quo officiis.",
      UserId: 3,
      RestaurantId: 4,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 4,
        name: "Freda Kreiger",
        tel: "1-579-478-0775",
        address: "8551 Turner Drive",
        opening_hours: "08:00",
        description:
          "Iste commodi consequatur distinctio labore et et vero possimus sit.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=89.51818523560335",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 4,
      },
    },
    {
      id: 5,
      text: "Repudiandae illo voluptatem voluptate quidem hic velit et.",
      UserId: 3,
      RestaurantId: 5,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 5,
        name: "Braeden Schowalter",
        tel: "(630) 916-4585 x41168",
        address: "240 Greenfelder Glen",
        opening_hours: "08:00",
        description: "Magni sunt neque et molestiae nulla alias porro.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=63.956820232771584",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 5,
      },
    },
    {
      id: 6,
      text: "Error maxime tempora eveniet.",
      UserId: 1,
      RestaurantId: 6,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$wieSlNXiDPA.beh8HqtBLu6C/8goNdnwqqWKCPC8LRp6.tkzxxBam",
        isAdmin: true,
        image: null,
        createdAt: "2024-05-07T05:57:28.000Z",
        updatedAt: "2024-05-07T05:57:28.000Z",
      },
      Restaurant: {
        id: 6,
        name: "Jay O'Keefe",
        tel: "1-450-005-0334",
        address: "81642 Emilia Locks",
        opening_hours: "08:00",
        description:
          "Doloribus id non harum et. Numquam harum minus facere autem ex optio delectus quibusdam. Architecto quidem velit molestiae atque. Cupiditate iure molestiae magnam quasi est explicabo tenetur ut. Quaerat quidem commodi.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=1.572612887526459",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 5,
      },
    },
    {
      id: 7,
      text: "Neque voluptatem velit qui et ad doloribus fuga libero voluptas.",
      UserId: 3,
      RestaurantId: 7,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 7,
        name: "Antonietta Stiedemann",
        tel: "(236) 415-9772",
        address: "0937 Callie Cliff",
        opening_hours: "08:00",
        description: "Sunt voluptas et sint libero est non sit quas.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=14.265987863805085",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 2,
      },
    },
    {
      id: 8,
      text: "Sed quia cum natus sint voluptas fuga voluptatem.",
      UserId: 2,
      RestaurantId: 8,
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
      Restaurant: {
        id: 8,
        name: "Ansel Rowe",
        tel: "(106) 207-6769",
        address: "77135 Schultz Trail",
        opening_hours: "08:00",
        description: "optio",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=53.86909146354593",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 9,
      text: "Id similique sit praesentium quia ratione.",
      UserId: 3,
      RestaurantId: 9,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 9,
        name: "Coralie Greenfelder",
        tel: "365.235.4464",
        address: "34859 Goodwin Throughway",
        opening_hours: "08:00",
        description:
          "Id corrupti ducimus nihil nihil. Non id dolorem porro repellendus.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=89.80354659636116",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 10,
      text: "Unde assumenda sed placeat.",
      UserId: 3,
      RestaurantId: 10,
      createdAt: "2024-05-07T05:57:29.000Z",
      updatedAt: "2024-05-07T05:57:29.000Z",
      User: {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$emg4vxX10BLPtEVGTJeStOUB/uHTdz1pRwl6NzuOrjZluEX8io8Ua",
        isAdmin: false,
        image: null,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
      },
      Restaurant: {
        id: 10,
        name: "Tess O'Reilly",
        tel: "280.616.1948 x081",
        address: "45133 Lisette Squares",
        opening_hours: "08:00",
        description: "Laudantium eos et blanditiis.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=80.7363513884497",
        viewCounts: 0,
        createdAt: "2024-05-07T05:57:29.000Z",
        updatedAt: "2024-05-07T05:57:29.000Z",
        CategoryId: 2,
      },
    },
  ],
};

export default {
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  components: {
    NavTabs,
    NewestRestaurants,
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.restaurants = dummyData.restaurants;
      this.comments = dummyData.comments;
    },
  },
};
</script>
