<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" v-bind:key="comment.id">
        <h4>
          <!-- :to="{ name: 'restaurant', params: {id: comment.Restaurant.id}}" -->
          <router-link :to="`/restaurants/${comment.Restaurant.id}`">
            {{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p>{{ comment.text }}</p>
        by
        <a href="#"> {{ comment.User.name }} </a>
        {{ comment.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
};
</script>
