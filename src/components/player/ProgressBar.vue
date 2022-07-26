<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
    progress: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['seeking', 'seeked'])

const barRef = ref(null)

const barWidth = ref(0)

// store
const offset = ref(0)

watch(
    () => props.progress,
    () => {
        offset.value = props.progress * barRef.value.clientWidth
    }
)

onMounted(() => {
    barWidth.value = barRef.value.clientWidth
    console.log(barWidth.value)
})

const progressStyle = computed(() => {
    return {
        width: offset.value + 'px',
    }
})
let start = 0
let end = 0
let delta = 0
function onTouchStart(e) {
    start = e.touches[0].clientX
    console.log(e)
    console.log('start')
}
function onTouchMove(e) {
    end = e.touches[0].clientX
    delta = end - start
    start = end
    const newOffset = Math.max(
        0,
        Math.min(
            offset.value + delta,
            barWidth.value | barRef.value.clientWidth
        )
    )
    offset.value = newOffset
    emit('seeking', offset.value / barRef.value.clientWidth)
}
function onTouchEnd() {
    emit('seeked', offset.value / barRef.value.clientWidth)
    // console.log(start, end, delta)
}
</script>

<template>
    <div class="bar" ref="barRef">
        <div class="progress" :style="progressStyle">
            <span
                class="pointer"
                @touchstart.prevent="onTouchStart"
                @touchmove.prevent="onTouchMove"
                @touchend.prevent="onTouchEnd"
            ></span>
        </div>

        <slot></slot>
    </div>
</template>

<style lang="postcss">
.bar {
    @apply relative flex w-[90%] rounded-[.5rem] bg-slate-400;
}
.progress {
    @apply relative bg-red-100 h-2 rounded-[.5rem];
}
.pointer {
    @apply absolute bg-black w-2 h-2 rounded-[50%] right-0;
}
</style>
