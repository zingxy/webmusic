<script setup>
import MyHeader from './components/header/MyHeader.vue'
import Tab from './components/tab/Tab.vue'
</script>

<template>
    <MyHeader></MyHeader>
    <Tab></Tab>
    <router-view></router-view>
</template>
