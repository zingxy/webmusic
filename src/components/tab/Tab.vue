<script setup>
import IconSinger from './singer.svg'
import IconRank from './rank.svg'
import IconRecommend from './recommend.svg'
import IconSearch from './search.svg'

const tabs = [
    { name: 'Recommend', path: '/recommend', icon: IconRecommend },
    { name: 'Singer', path: '/singer', icon: IconSinger },
    { name: 'Rank', path: '/top-list', icon: IconRank },
    { name: 'Search', path: '/search', icon: IconSearch },
]
</script>

<template>
    <div class="router-link-active flex justify-between text-white h-10">
        <router-link v-for="tab of tabs" :key="tab.path" :to="tab.path">
            <img class="bg-green-300 rounded-md" :src="tab.icon" />
        </router-link>
    </div>
</template>

<style>
.router-link-active {
    color: red;
    font-size: 1.2rem;
}
</style>
