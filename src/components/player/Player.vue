<script setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue'
import usePlayerStore from '../../stores/playerStore'
import IconFullscreenExit from '~icons/ri/fullscreen-exit-fill'
import Control from './Control.vue'
import TimeLine from './TimingLine.vue'
import Fav from './Fav.vue'
import PlayerMini from './PlayerMini.vue'

const player = usePlayerStore()

// const audioRef = ref(null)

const fullScreen = computed(() => player.fullScreen)
const currentSong = computed(() => player.currentSong)
const audio = computed(() => player.audio)

watch(currentSong, newSong => {
    if (!newSong.id || !newSong.url) return

    audio.value.src = newSong.url
    audio.value.play() // 改变时自动播放
    player.setPlayingState(true)
})

function goBack() {
    player.setFullScreen(false)
}
</script>
<template>
    <div
        v-show="fullScreen"
        class="bg"
        :style="{
            backgroundImage: `url(${currentSong.pic})`,
        }"
    >
        <div class="player">
            <!-- 上面的一块 -->
            <div class="w-full flex justify-start">
                <IconFullscreenExit
                    class="w-8 h-8"
                    @click="goBack"
                ></IconFullscreenExit>
            </div>
            <!-- 歌曲信息 -->
            <div class="info relative w-full flex gap-2 justify-between">
                <div class="flex flex-col gap-4">
                    <h1 class="text-3xl">
                        {{ currentSong.name }}
                    </h1>
                    <h2 class="text-xs text-slate-400">
                        {{ currentSong.singer }}
                    </h2>
                    <h2 class="text-xs text-slate-400">
                        {{ currentSong.album }}
                    </h2>
                </div>
                <Fav></Fav>
            </div>
            <TimeLine class="w-full"></TimeLine>
            <!-- 播放控件 -->
            <Control class="w-full h-28"></Control>
        </div>
    </div>
    <div v-show="!fullScreen && currentSong.url">
        <PlayerMini />
    </div>
</template>

<style lang="postcss">
.bg {
    @apply fixed top-0 bottom-0 left-0 right-0 bg-no-repeat  bg-center bg-cover;
}
.player {
    @apply backdrop-blur-[100px] relative w-full h-full flex flex-col justify-between items-center gap-2;
}
</style>

<!-- 动画效果 -->
<style scoped>
.cd {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.rotate {
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    0% {
        rotate: (0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
