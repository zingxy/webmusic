<script setup>
import { ref } from 'vue'

import useSlider from './useSlider'
const props = defineProps(['sliders'])
const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef)
</script>

<template>
    <div
        class="-scroll-wrapper relative whitespace-nowrap w-full overflow-hidden"
        ref="rootRef"
    >
        <div class="-scroll-content inline-block overflow-hidden">
            <div
                class="-scroll-item inline-block"
                v-for="item in props.sliders"
                :key="item.id"
            >
                <a :href="item.link">
                    <img class="w-full object-cover" :src="item.pic" />
                </a>
            </div>
        </div>
        <div class="-dots-wrapper w-full absolute bottom-3 flex justify-around">
            <span
                class="-dot w-2 h-2 rounded bg-red-300 px-0.5"
                v-for="(item, index) in props.sliders"
                :key="item.id"
                :class="{ active: currentPageIndex === index }"
            >
            </span>
        </div>
    </div>
</template>

<style scoped>
/* 激活时的样式 */
.active {
    width: 1rem;
}
</style>
