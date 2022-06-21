<!-- 渲染分组列表 -->

<script setup>
import Scroll from '../base/scroll/Scroll.vue'
import useFixed from './useFixed'

const props = defineProps({
    data: {
        type: Array,
        default: [],
    },
})

const { groupRef, onScroll, currentIndex, offsetY, listHeights, fixedTitle } =
    useFixed(props)
</script>

<template>
    <span>{{ fixedTitle }}</span>
    <div class="relative">
        <!-- h1用于固定absolute -->
        <!-- <h1 class="absolute w-full z-10 bg-red-100">Hello</h1> -->
        <!-- 使用v-loading -->
        <Scroll
            class="wrapper fixed w-full h-full overflow-hidden"
            v-loading="!props.data.length"
            :probe-type="3"
            @scroll="onScroll"
        >
            <!-- 注意，这里提供了groupRef, 在useFixed生命这个ref -->
            <ul class="content w-full groups flex flex-col" ref="groupRef">
                <li v-for="group of props.data" :key="group.title">
                    <ul class="group">
                        <h1 class="title bg-green-100 text-red-400">
                            {{ group.title }}
                        </h1>
                        <li
                            class="singer py-2 flex items-center justify-between"
                            v-for="singer of group.list"
                            :key="singer.id"
                        >
                            <!-- 头像 -->
                            <img
                                class="avatar mx-10 pic w-12 h-12"
                                v-lazy="singer.pic"
                            />
                            <!-- 名字 -->
                            <h2 class="name">{{ singer.name }}</h2>
                            <span><!-- 暂时用来占位 --></span>
                        </li>
                    </ul>
                </li>
            </ul>
        </Scroll>
    </div>
</template>

<style scoped>
.pic {
    border-radius: 2rem;
}
</style>
