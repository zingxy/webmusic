<!-- 渲染分组列表 -->

<script setup>
import { ref } from 'vue'

import Scroll from '../base/scroll/Scroll.vue'
import useFixed from './useFixed'
import useShortcut from './useShortcut'
const props = defineProps({
    data: {
        type: Array,
        default: [],
    },
})

const emit = defineEmits(['select'])

// const scrollRef = ref(null)
/*
groupRef是betterscroll的conente容器 
 */

const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } =
    useFixed(props)

/* 右边的联动字母表 */
const {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    onShortcutTouchEnd,
    scrollRef,
} = useShortcut(props, groupRef, currentIndex)

function OnItemClick(item) {
    emit('select', item)
}
</script>

<template>
    <div class="">
        <!--       <span
            v-show="fixedTitle"
            class="title absolute w-full bg-green-100 text-red-400 z-10"
            :style="fixedStyle"
            >{{ fixedTitle }}</span
        > -->
        <div class="relative">
            <!-- h1用于固定absolute -->
            <!-- <h1 class="absolute w-full z-10 bg-red-100">Hello</h1> -->
            <!-- 使用v-loading -->
            <!-- 通过scrollRef取得其中定义的betterscoll实例 -->

            <Scroll
                class="wrapper fixed w-full h-full overflow-hidden"
                v-loading="!props.data.length"
                :probe-type="3"
                @scroll="onScroll"
                ref="scrollRef"
            >
                <!-- 注意，这里提供了groupRef, 在useFixed生命这个ref -->
                <ul class="content w-full flex flex-col m-0 p-0" ref="groupRef">
                    <li v-for="group of props.data" :key="group.title">
                        <ul class="group">
                            <h1 class="title bg-green-100 text-red-400">
                                {{ group.title }}
                            </h1>
                            <li
                                class="singer py-2 flex items-center justify-between"
                                v-for="item of group.list"
                                :key="item.id"
                                @click="OnItemClick(item)"
                            >
                                <!-- 头像 -->
                                <img
                                    class="avatar mx-10 pic w-12 h-12"
                                    v-lazy="item.pic"
                                />
                                <!-- 名字 -->
                                <h2 class="name">{{ item.name }}</h2>
                                <span><!-- 暂时用来占位 --></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Scroll>
        </div>

        <div
            class="shortcut absolute top-1/2 right-2 flex flex-col justify-center text-blue-300 text-xs -translate-y-1/2"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
            @touchend.stop.prevent="onShortcutTouchEnd"
        >
            <!-- 绑定attr可以使用data-xxx,即html自定义属性的命名方式, 用于区别attribute和property -->
            <span
                class="text-center bg-black rounded-sm w-10 m-0 p-0"
                :class="{
                    active: currentIndex === idx,
                }"
                v-for="(item, idx) of shortcutList"
                :key="item"
                :data-index="idx"
            >
                {{ item }}</span
            >
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    height: 100vh;
}
.pic {
    border-radius: 2rem;
}
.title {
    height: 1.5rem;
}
.active {
    color: pink;
}
</style>
