import { defineStore } from 'pinia'
import { set } from 'vue-demi'

const useUser = defineStore('user', {
    state: () => {
        return {
            favoriteList: new Set(),
        }
    },
    actions: {
        addFavorite(id) {
            this.favoriteList.add(id)
        },
        removeFavorite(id) {
            this.favoriteList.delete(id)
        },
    },
})

export default useUser
