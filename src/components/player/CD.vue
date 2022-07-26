<script setup>
import { computed } from '@vue/reactivity'
import usePlayerStore from '../../stores/playerStore'

const props = defineProps({
    propgress: {
        type: Number,
        default: 0,
    },
})

const player = usePlayerStore()

const playing = computed(() => player.playing)

const style = computed(() => {
    return {
        animationPlayState: playing.value ? 'running' : 'paused',
    }
})
</script>

<template>
    <!-- 旋转cd -->
    <div class="cd flex justify-center pointer-events-none">
        <img
            class="cd-img rounded-[50%] w-[50vw] h-[50vw] object-fill rotate"
            :style="style"
            :src="player.currentSong.pic"
        />
    </div>
</template>

<!-- 动画效果 -->
<style scoped lang="postcss">
.cd-img {
    box-shadow: 0 0 30px; 
}
.rotate {
    animation: rotate 20s linear infinite;
}
.pause {
    animation-play-state: paused;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
