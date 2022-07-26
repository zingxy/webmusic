<script setup>
import { computed } from '@vue/reactivity'
import IconPlay from '~icons/ri/pause-circle-line'
import IconPause from '~icons/ri/play-circle-line'
import IconPrevious from '~icons/ri/rewind-mini-line'
import IconNext from '~icons/ri/speed-mini-line'

// playlist
import IconPlaylist from '~icons/ph/playlist-fill'
import usePlayerStore from '../../stores/playerStore'
import usePlayMode from './usePlayMode.js'

const player = usePlayerStore()
const playModeIcon = usePlayMode()

const audio = computed(() => player.audio)
const playing = computed(() => player.playing)

function togglePlay() {
    player.setPlayingState(!playing.value)
    playing.value ? audio.value.play() : audio.value.pause()
}

/* 快速点击将会出错 */
function prev() {
    player.setCurrentIndex(player.currentIndex - 1)
}

function next() {
    player.setCurrentIndex(player.currentIndex + 1)
}
// 切换模式
function switchPlayMode() {
    player.changeMode(player.playMode + 1)
}

audio.value.addEventListener('ended', () => {
    next()
})
</script>

<template>
    <div class="flex justify-around items-center control_shadow rounded-2xl">
        <!-- 播放模式 -->
        <div class="mode" @click="switchPlayMode">
            <component :is="playModeIcon"></component>
        </div>
        <!-- 上一曲 -->
        <div @click="prev">
            <IconPrevious></IconPrevious>
        </div>
        <!-- 播放/暂停 -->
        <div @click="togglePlay">
            <component :is="playing ? IconPlay : IconPause"></component>
        </div>
        <!-- 下一曲 -->
        <div @click="next">
            <IconNext></IconNext>
        </div>
        <!-- 播放列表 -->
        <div>
            <IconPlaylist></IconPlaylist>
        </div>
    </div>
</template>

<style scoped>
.control_shadow {
    box-shadow: -1px -1px 2px 0px rgba(0, 0, 0, 0.1),
        2px 2px 6px 0 rgba(83, 76, 76, 0.2);
}
</style>
