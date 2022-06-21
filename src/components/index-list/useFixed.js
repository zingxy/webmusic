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
    // data变化时监听, 产看Singer.vue, ref直接改变，可以理解为请求到数据之后
    computed(() => console.log(currentIndex.value))

    // const fixedTitle = ref('')
    const fixedTitle = computed(() => {
        currentIndex.value
        console.log('title changed')
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })
    // watch(currentIndex, () => {
    //     console.log('index changed', currentIndex.value)
    //     const currentGroup = props.data[currentIndex.value]

    //     fixedTitle.value = currentGroup ? currentGroup.title : ''
    //     console.log(fixedTitle)
    // })

    watch(
        () => props.data,
        async () => {
            /* 等待DOM更新完成 */
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
        /**
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
    }
}
