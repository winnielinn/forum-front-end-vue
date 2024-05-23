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
        <router-link
          :to="{
            name: 'user',
            params: { id: comment.User.id },
          }"
        >
          {{ comment.User.name }}
        </router-link>
        {{ comment.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";

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

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>