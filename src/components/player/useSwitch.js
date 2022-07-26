// 主要用于切换LyricMini 和 LyricFull
import { ref } from 'vue'

export default function useLyric() {
    const primary = ref(true)

    function switchPage() {
        primary.value = !primary.value
    }

    return {
        primary,
        switchPage,
    }
}
