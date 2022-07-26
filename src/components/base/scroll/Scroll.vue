<script setup>
import { ref } from 'vue'
import useScroll from './useScroll'
const props = defineProps({
    click: {
        type: Boolean,
        default: true,
    },
    probeType: {
        type: Number,
        default: 0,
    },
})

/* 自定义事件 */
const emit = defineEmits(['scroll'])

const rootRef = ref(null)

const bscroll = useScroll(rootRef, props, emit)

defineExpose({
    bscroll,
})
</script>
<template>
    <!-- 这里是wrapper -->
    <div ref="rootRef" class="scroll">
        <slot>
            <!-- 这里是content, content高度大于wrapper时，才会出现滚动效果 -->
        </slot>
    </div>
</template>
