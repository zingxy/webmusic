<script setup>
import MyHeader from './components/header/MyHeader.vue'
import Tab from './components/tab/Tab.vue'
import Player from './components/player/Player.vue'
</script>

<template>
    <MyHeader></MyHeader>
    <Tab></Tab>
    <router-view></router-view>
    <Player></Player>
</template>
