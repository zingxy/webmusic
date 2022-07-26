<script setup>
/* 这个组件是控制播放器中与时间相关的代码 包括旋转CD 进度条 歌词 */
import { computed, ref, watch } from 'vue'
import usePlayerStore from '../../stores/playerStore'
import ProgressBar from './ProgressBar.vue'
import CD from './CD.vue'
import Lyric from './Lyric.vue'
import useSwitch from './useSwitch'
import { formatTime } from '../../assets/utils'

const player = usePlayerStore()
const { primary, switchPage } = useSwitch()

const audio = player.audio
const currentTime = ref(0)
let seeking = false // 是否正拖动进度条

const totalTime = computed(() => {
    return player.currentSong.duration
})

const progress = computed(() => {
    return currentTime.value / totalTime.value
})

function onSeeking(progress) {
    seeking = true
    currentTime.value = progress * totalTime.value
    console.log(progress)
}

function onSeeked(progress) {
    audio.currentTime = currentTime.value
    seeking = false
}
/* 当正在拖动进度条时, 禁止修改currentTime */
audio.addEventListener('timeupdate', e => {
    if (!seeking) currentTime.value = e.target.currentTime
})
</script>

<template>
    <div class="flex flex-col gap-14">
        <div class="placeholder">
            <div v-show="!primary" class="switch" @click="switchPage">
                <Lyric
                    class="overflow-hidden h-[200px]"
                    :time="currentTime * 1000"
                    :full="true"
                ></Lyric>
            </div>

            <div
                v-show="primary"
                class="flex flex-col justify-center"
                @click="switchPage"
            >
                <CD
                    class=""
                    :progress="progress"
                    :pic="player.currentSong.pic"
                ></CD>
                <div>
                    <Lyric :time="currentTime * 1000"></Lyric>
                </div>
            </div>
        </div>

        <div class="w-full h-2 flex items-center justify-center">
            <ProgressBar
                class="relative"
                :progress="progress"
                @seeking="onSeeking"
                @seeked="onSeeked"
            >
                <span class="absolute left-0 top-1 pointer-events-none">
                    {{ formatTime(currentTime) }}
                </span>
                <span class="absolute right-0 top-1 pointer-events-none">
                    {{ formatTime(totalTime) }}
                </span>
            </ProgressBar>
        </div>
    </div>
</template>
