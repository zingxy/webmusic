<script setup>
import Control from './Control.vue'
import Fav from './Fav.vue'
import usePlayerStore from '../../stores/playerStore'
import { computed } from '@vue/reactivity'

const player = usePlayerStore()

const currentSong = computed(() => player.currentSong)

function setFullScreen() {
    player.setFullScreen(true)
}
</script>

<template>
    <div
        class="mini fixed bottom-0 left-0 right-0 h-14 bg-slate-400 flex justify-around items-center overflow-hidden"
    >
        <div class="flex gap-2">
            <img
                :src="currentSong.pic"
                class="object-cover w-8 h-8 rounded-md hover:cursor-pointer"
                @click="setFullScreen"
            />
            <div>
                <h1 class="text-xs">
                    {{ currentSong.name }} - {{ currentSong.singer }}
                </h1>
                <div class="flex">
                    <fav></fav>
                </div>
            </div>
        </div>
        <Control class="w-1/2" />
    </div>
</template>

<style scoped>
.mini {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5nnnnnnnnnnnnnnnnnnnnnnnnnnnn rem;
}
</style>
