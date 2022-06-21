<script setup>
import { ref, onMounted } from 'vue'
import Slider from '@/components/base/slider/Slider.vue'
import Scroll from '@/components/base/scroll/Scroll.vue'
import { getRecommend } from '../service/recommend'
import { computed } from '@vue/reactivity'

const sliders = ref([])
const albums = ref([])
/* 这里应该要改成Create周期，或者将Recommend定义成 async setup */
onMounted(async () => {
    const result = await getRecommend()
    sliders.value = result.sliders
    albums.value = result.albums
    console.log(result)
})

/* 判断页面是否还在loading */
const loading = computed(() => !sliders.value.length && !albums.value.length)

// const result = await getRecommend()
// console.log(result)
</script>

<template>
    <!-- 防止初始化的时候slide数量为0 -->
    <div class="recommend" v-loading="loading">
        <!-- 这里是betterscroll wrapper -->
        <Scroll class="wrapper h-4/5 overflow-hidden" :click="true">
            <!-- 这里是betterscroll content -->
            <div class="content w-full">
                <!-- 轮播图 -->
                <Slider v-if="sliders.length" :sliders="sliders"></Slider>
                <!-- 歌单列表 Todo 封装成一个单独的组件-->
                <div class="albums">
                    <h1 class="text-center">Recommend</h1>
                    <ul class="album flex flex-col">
                        <li
                            class="-item flex justify-between py-1"
                            v-for="album of albums"
                            :key="album.id"
                            @click="() => {}"
                        >
                            <div class="basis-2/12">
                                <img
                                    class="rounded-md"
                                    v-lazy="album.pic"
                                    alt="album.title"
                                />
                            </div>
                            <div class="basis-8/12">
                                <h2>{{ album.username }}</h2>
                                <p class="">{{ album.title }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<style scoped>
/* TODO 先硬编码吧, 让scroll组件正常运行 */
.wrapper {
    /* position: fixed; */
    /* width: 100%; */
    /* height: 800px; */
}
/* 保证content > wrapper */
.content {
    /* height: 1200px; */
}
.recommend {
    position: fixed;
    width: 100%;
    height: 100vh;
}
</style>
