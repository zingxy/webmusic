<script setup>
import { ref, watch } from 'vue'
import Scroll from '../base/scroll/Scroll.vue'

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
const scrollRef = ref(null)
const lyricRef = ref(null)
watch(
    () => props.currentIndex,
    newIndex => {
        if (!props.lyric.length || scrollRef.value || lyricRef.value) return
        const el = lyricRef.value.children.value[newIndex]

        scrollRef.value.bscroll.scrollToElement(el)
    }
)
</script>

<template>
    <Scroll class="bg-slate-400" ref="scrollRef">
        <div class="lyrics" ref="lyricRef">
            <p
                v-for="(item, idx) of props.lyric"
                :key="idx"
                :class="idx === currentIndex ? 'text-red-400' : ''"
            >
                {{ item }}
            </p>
        </div>
    </Scroll>
</template>
