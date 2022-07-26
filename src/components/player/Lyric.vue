<script setup>
import { watch, ref, computed } from 'vue'
import usePlayerStore from '../../stores/playerStore'
import { getLyric } from '../../service/song'
import { LyricParser } from '../../assets/utils'

import LyricFull from './LyricFull.vue'
import LyricMini from './LyricMini.vue'

const props = defineProps({
    // 当前播放的时间
    time: {
        type: Number,
        default: 0.0,
    },
    // 是否显示所有歌词
    full: {
        type: Boolean,
        default: false,
    },
})

const player = usePlayerStore()
const currentSong = computed(() => player.currentSong)
const lyricWithTimeStamp = ref([]) // 带有时间戳的歌词
// 计算现在的歌词
const currentIndex = computed(() => {
    let index = 0
    for (const [idx, [t, text]] of lyricWithTimeStamp.value.entries()) {
        if (props.time > t) {
            index = idx
        } else break
    }
    return index
})

// 歌词
const lyric = computed(() => {
    const texts = lyricWithTimeStamp.value.map(([k, v]) => v)
    return texts
})

watch(currentSong, async newSong => {
    if (!newSong.url || !newSong.id) {
        return
    }
    const raw = await getLyric(newSong)
    lyricWithTimeStamp.value = LyricParser(raw)
    // console.log(lyricWithTimeStamp.value)
})
</script>
<template>
    <component
        :is="props.full ? LyricFull : LyricMini"
        :lyric="lyric"
        :current-index="currentIndex"
    ></component>
</template>
