<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSingerList } from '../service/singer'
import IndexList from '../components/index-list/IndexList.vue'
import { SINGER_KEY } from '../assets/constant'
import storage from 'good-storage'

const router = useRouter()
const singers = ref([])
const selectedSinger = ref(null)

/* Todo 改成async setup */
onBeforeMount(async () => {
    const result = await getSingerList()
    singers.value = result.singers

    console.log(result)
})

function onSelectSinger(singer) {
    selectedSinger.value = singer
    // 缓存这个singer
    cacheSinger(singer)

    /* 跳转，实际上singer.mid在这里只是用为了路由跳转， 参数的传递使用的是直接给router-view传递props
    传递个router-view中的的props会被分发到匹配到的路由中
    */
    router.push({
        path: `/singer/${singer.mid}`,
    })
}

function cacheSinger(singer) {
    storage.session.set(SINGER_KEY, singer)
}
</script>

<template>
    <IndexList
        class="container fixed top-[5.4rem] bottom-0"
        :data="singers"
        @select="onSelectSinger"
    ></IndexList>
    <!-- 使用transitoin -->
    <router-view v-slot="{ Component }">
        <transition name="slide">
            <component :is="Component" :singer="selectedSinger" />
        </transition>
    </router-view>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
