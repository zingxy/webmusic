import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef, currentIndex) {
    const shortcutList = computed(() => props.data.map(g => g.title))
    // scrollRef指的是Scroll组件的实例，通过该实例，获取Betterscroll的实例
    const scrollRef = ref(null)

    // 记录拖动前后的起始点
    const touch = {
        start: 0, // 起始偏移
        end: 0, // 终止偏移
        index: 0, // 起始索引
    }
    // 事件委托，监听所有字母列表的touchStart
    const onShortcutTouchStart = e => {
        const anchorIndex = parseInt(e.target.dataset.index)
        console.log(anchorIndex, e.target.textContent)
        scrollTo(anchorIndex)

        // 点击所对应的坐标
        touch.start = e.touches[0].pageY
        // 点击所对应的索引
        touch.index = anchorIndex
    }

    const onShortcutTouchMove = e => {
        touch.end = e.touches[0].pageY
        // 18是一个魔法数字，表示字母表de高度，后面再该进
        const delta = Math.floor((touch.end - touch.start) / 18)
        // 起始 + 偏移量
        const anchorIndex = delta + touch.index
        // debugger
        scrollTo(anchorIndex)
    }

    const onShortcutTouchEnd = () => {}
    function scrollTo(index) {
        // 目标元素索引
        // index = index % shortcutList.value.length
        console.log(index)
        index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
        // 目标元素
        const el = groupRef.value.children[index]
        // Betterscroll的实例
        const bscroll = scrollRef.value.bscroll
        bscroll.scrollToElement(el, 0)
    }

    return {
        shortcutList,
        onShortcutTouchStart,
        onShortcutTouchEnd,
        onShortcutTouchMove,
        scrollRef,
    }
}
