<template>
    <ul class="nav nav-pills mb-4">
        <li class="nav-item">
            <router-link
                class="nav-link"
                to="/restaurants"
            >
                全部
            </router-link>
        </li>
        <li
            v-for="category in categories"
            v-bind:key="category.id"
            class="nav-item"
        >
            <router-link
                class="nav-link"
                v-bind:to="{ name: 'restaurants', query: { category: category.id } }"
            >
                {{ category.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        categories: {
            tpye: Array,
            required: true
        }
    }
}
</script>