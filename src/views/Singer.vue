<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getSingerList } from '../service/singer'
import IndexList from '../components/index-list/IndexList.vue'
const singers = ref([])

/* Todo 改成async setup */
onBeforeMount(async () => {
    const result = await getSingerList()
    singers.value = result.singers

    console.log(result)
})
</script>

<template>
    <IndexList :data="singers"></IndexList>
</template>

<style scoped></style>
