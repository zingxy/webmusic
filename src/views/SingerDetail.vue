<script setup>
import { ref, computed, onBeforeMount, onMounted } from 'vue'
import { getSingerDetail } from '../service/singer'
import { processSongs } from '../service/song'

import MusicList from '../components/music-list/MusicList.vue'
import { SINGER_KEY } from '../assets/constant'
import storage from 'good-storage'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
    singer: {
        type: Object,
    },
})

const songs = ref([])
// computed
const computedSinger = computed(() => {
    return props.singer || storage.session.get(SINGER_KEY)
})
const pic = computed(() => computedSinger.value && computedSinger.value.pic)
const title = computed(() => computedSinger.value && computedSinger.value.name)
const loading = computed(() => !songs.value.length)

onBeforeMount(async () => {
    // 当手动修改url地址后造成不匹配回退到上一级别路由
    const router = useRouter()
    const route = useRoute()
    if (!computedSinger.value || computedSinger.value.mid !== route.params.id) {
        const path = route.matched[0].path
        router.push({
            path,
        })
        return
    }
    // 获取基本信息
    const resp = await getSingerDetail(computedSinger.value)

    songs.value = resp.songs
    // 获取有效的歌曲url
    songs.value = await processSongs(resp.songs)
    // songs.value = []
    // console.log('song', songs.value)
})
</script>

<template>
    <div class="container fixed top-0 bottom-0 w-full bg-zinc-900">
        <MusicList
            :songs="songs"
            :pic="pic"
            :title="title"
            :loading="loading"
        ></MusicList>
    </div>
</template>

<style scoped></style>
