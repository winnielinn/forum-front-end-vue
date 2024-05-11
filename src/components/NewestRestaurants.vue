<template>
  <div class="card">
    <div class="card-header">最新餐廳</div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
        <h4>
          <!-- :to="{ name: 'restaurant', params: {id: restaurant.id}}" -->
          <router-link :to="`/restaurants/${restaurant.id}`">{{ restaurant.name }}</router-link>
          <small>{{ restaurant.Category.name ?? '未分類' }}</small>
        </h4>
        <p>
            {{ restaurant.description }}
        </p>
        {{ restaurant.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  props: {
    restaurants: {
      type: Array, // 進來的資料型態是陣列
      required: true, // 這組資料是必要的
    },
  },
  mixins: [fromNowFilter],
};
</script>

<style scoped>
small {
  font-size: 10px;
}
</style>
