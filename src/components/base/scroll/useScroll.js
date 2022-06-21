import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'
BScroll.use(ObserveDOM)
/**
 * 使用BScroll获得更好的滚动效果
 * @param {wrapperRef} - Ref<Element>
 * @param {options} - 提供额外的选项
 * */
export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null)

    /* 挂载后初始化 */
    onMounted(() => {
        scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options,
        })
        /* 监听滚动位置 */
        if (options.probeType > 0) {
            scroll.value.on('scroll', pos => {
                emit('scroll', pos)
            })
        }
    })

    /* 销毁 */
    onUnmounted(() => scroll.value.destroy())
}
