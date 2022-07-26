import { computed, nextTick, ref, watch } from 'vue'

export default function useFixed(props) {
    /* 获取dom groups对应的元素  */
    const groupRef = ref(null)
    // 记录每个group对应的height
    const listHeights = ref([])
    // 记录此时content的偏移量
    const offsetY = ref(0)
    // 计算现在处于哪个group
    const currentIndex = ref(0)
    // 顶部推动效果
    const distance = ref(0)
    // 顶部推动效果

    // data变化时监听, 产看Singer.vue, ref直接改变，可以理解为请求到数据之后
    computed(() => console.log(currentIndex.value))

    // 计算现在对应的的标题
    const fixedTitle = computed(() => {
        if (offsetY.value < 0) return ''
        currentIndex.value
        // console.log('title changed')
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })

    const fixedStyle = computed(() => {
        // 硬编码30
        const offset =
            distance.value > 0 && distance.value < 30 ? distance.value - 30 : 0
        return {
            // 注意这里要带上单位
            transform: `translate3d(0, ${offset}px, 0)`,
        }
    })

    watch(
        () => props.data,
        async () => {
            /* 等待DOM更新完成, 要拿到最新的DOM */
            await nextTick()
            calculate()
        }
    )
    /* 监听offsetY, 响应式的计算是否要更新title */
    /* 计算现在落在哪个区间 */
    watch(offsetY, newY => {
        // console.log(newY == offsetY.value)
        // console.log('offsetY changed', newY, offsetY)
        for (let i = 0; i < listHeights.value.length - 1; i++) {
            const heightTop = listHeights.value[i]
            const heightBottom = listHeights.value[i + 1]
            // debugger

            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i
                // console.log(i)
                // 计算下边缘和grups顶部的距离，用于实现title推动效果
                distance.value = heightBottom - newY

                break
            }
        }
    })
    /**
     * 计算groups中每个group所占的高度，利用高度计算现在视图滚动到了哪里，
     * 以此实现group title的固定
     */
    function calculate() {
        /* .children可以取得该元素的直接子元素 */
        /** groupRef实际上拿到的是bettterscroll content dom
         * @type {Array}
         */
        const groups = Array.from(groupRef.value.children)
        /* 计算每个group的value */
        let height = 0
        listHeights.value.length = 0
        listHeights.value.push(height)
        // debugger
        groups.forEach(group => {
            height += group.clientHeight
            listHeights.value.push(height)
        })
        console.log(listHeights.value)
    }
    /**
     *
     * @param {{x:Number, y:number}} pos
     */
    function onScroll(pos) {
        offsetY.value = -pos.y
    }

    return {
        groupRef,
        onScroll,
        currentIndex,
        offsetY,
        listHeights,
        fixedTitle,
        fixedStyle,
        distance,
    }
}
