import { computed } from '@vue/reactivity'
// Store
import usePlayerStore from '../../stores/playerStore'
import useUserStore from '../../stores/userStore'

import IconLike from '~icons/mdi/heart-multiple'
import IconUnLike from '~icons/mdi/heart-multiple-outline'

export default function useFavorite() {
    const player = usePlayerStore()
    const user = useUserStore()

    const currentSong = computed(() => player.currentSong)

    const favStatus = computed(() => {
        const exist = Array.from(user.favoriteList).some(
            id => id === currentSong.value.id
        )
        return exist
    })

    const IconFavStatus = computed(() => {
        return favStatus.value ? IconLike : IconUnLike
    })

    function toggleFavStatus() {
        if (favStatus.value) {
            user.removeFavorite(currentSong.value.id)
        } else {
            user.addFavorite(currentSong.value.id)
        }
    }

    return { favStatus, IconFavStatus, toggleFavStatus }
}
