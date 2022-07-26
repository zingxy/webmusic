<script setup>
import { computed } from 'vue'

const props = defineProps({
    lyric: {
        type: Array,
        default: [],
    },
    currentIndex: {
        type: Number,
        default: 0,
    },
})

const currentText = computed(() => props.lyric[props.currentIndex])
</script>

<template>
    <div class="flex justify-center items-center h-8">
        <div class="relative">
            <!-- 视觉效果 -->
            {{ props.lyric[currentIndex] }}

            <p
                class="absolute left-0 top-0 whitespace-nowrap text-blue-300 overflow-hidden move"
            >
                {{ props.lyric[currentIndex] }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.move {
    animation: moving 5s infinite;
}

@keyframes moving {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
</style>
