import { computed } from '@vue/reactivity'
import usePlayerStore from '../../stores/playerStore'

/* PlayMode */
import IconLoop from '~icons/ic/outline-circle'
import IconRandom from '~icons/fe/random'
import IconSeq from '~icons/ic/sharp-compare-arrows'

export default function usePlayMode() {
    const player = usePlayerStore()
    const playMode = computed(() => player.playMode)
    const playModeIcon = computed(() => {
        if (playMode.value === 0) return IconSeq
        if (playMode.value === 1) return IconLoop
        return IconRandom
    })

    return playModeIcon
}
