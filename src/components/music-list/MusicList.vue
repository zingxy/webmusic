<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import usePlayerStore from '../../stores/playerStore'

import Scroll from '../base/scroll/Scroll.vue'
import SongList from '../base/song-list/SongList.vue'

import IconGoBack from '~icons/mdi/arrow-back'

const RESERVED = 30

const props = defineProps({
    songs: {
        type: Array,
        default() {
            return []
        },
    },
    pic: String, // 背景图片
    title: String, // 标题
    loading: {
        type: Boolean, // 是否正在加载数据
        default: true,
    },
})

// state
const noResult = computed(() => Boolean(props.songs.length))

// 滚动的距离 scrollTop
const offsetY = ref(0)

// 最大滚动距离
const maxTranslateY = ref(0)

// router store

const router = useRouter()
const player = usePlayerStore()

const bgImageRef = ref(null)
const bgImageHeight = ref(0)
// 背景图片的样式
const bgImageStyle = computed(() => {
    let paddingTop = '70%'
    let zIndex = 0
    let height = 0
    let scale = 1
    let blur = 0

    // 歌曲列表往上移动
    if (offsetY.value > 0) {
        blur = 2
    }

    // 向上移动距离大于某个值
    if (offsetY.value > maxTranslateY.value) {
        zIndex = 10 // 让图片在上面
        paddingTop = 0 // 缩小高度
        height = RESERVED + 'px' // 图片容器的高度
    }

    if (offsetY.value < 0) {
        scale = 1 + Math.abs(offsetY.value) / bgImageHeight.value
    }

    return {
        filter: `blur(${blur}px)`,
        paddingTop,
        height,
        zIndex,
        backgroundImage: `url(${props.pic})`,
        transform: `scale(${scale})`,
    }
})
// 歌曲列表的样式
const scrollStyle = computed(() => {
    return {
        top: `${bgImageHeight.value}px`,
    }
})
// 获取图片的高度
onMounted(() => {
    bgImageHeight.value = bgImageRef.value.clientHeight
    // console.log(bgImageHeight)

    // 计算最大的上滑高度
    maxTranslateY.value = bgImageHeight.value - RESERVED
})

/* 事件处理函数 */
// 返回按钮
function goBack() {
    router.back()
    // console.log('goback')
}

// 滚动事件
function onScroll(pos) {
    offsetY.value = -pos.y
}

// 选中歌曲播放
function selectItem({ song, index }) {
    player.selectPlay({
        list: props.songs,
        index,
    })
}
// 随机播放
function randomPlay() {
    player.randomPlay(props.songs)
}
</script>

<template>
    <div class="relative">
        <span class="absolute text-red-500 w-full h-4 z-30" @click="goBack">
            <IconGoBack></IconGoBack>
        </span>
        <h1 class="absolute text-red-500 text-center w-full h-4 z-20 p-0 m-0">
            {{ props.title }}
        </h1>
        <!-- 信息 -->
        <div
            class="absolute bgImage bg-cover bg-no-repeat w-full"
            :style="bgImageStyle"
            ref="bgImageRef"
        >
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                @click="randomPlay"
            >
                random
            </div>
        </div>
        <!-- 歌曲 -->
        <div class="songList">
            <Scroll
                class="fixed top-0 bottom-0 w-full"
                :style="scrollStyle"
                v-loading="props.loading"
                v-no-result="noResult"
                :probe-type="3"
                @scroll="onScroll"
            >
                <!-- 监听事件 -->
                <SongList
                    class="w-full bg-neutral-200"
                    :songs="props.songs"
                    @select="selectItem"
                ></SongList>
            </Scroll>
        </div>
    </div>
</template>

<style scoped></style>
