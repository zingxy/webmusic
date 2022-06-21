<script setup>
const tabs = [
    { name: 'Recommend', path: '/recommend' },
    { name: 'Singer', path: '/singer' },
    { name: 'Rank', path: '/top-list' },
    { name: 'Search', path: '/search' },
]
</script>

<template>
    <div class="router-link-active flex justify-between text-white">
        <router-link v-for="tab of tabs" :key="tab.path" :to="tab.path">
            {{ tab.name }}
        </router-link>
    </div>
</template>

<style>
.router-link-active {
    color: red;
    font-size: 1.2rem;
}
</style>
