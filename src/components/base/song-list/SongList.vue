<script setup>
import IconMusic from '~icons/ri/netease-cloud-music-fill'
const { songs } = defineProps({
    songs: {
        type: Array,
        default() {
            return []
        },
    },
})

const emit = defineEmits(['select'])

// 事件

function onSelect(song, index) {
    emit('select', { song, index })
}
</script>

<template>
    <ul class="bg-nautral-500 flex flex-col">
        <li
            class="basis-8 ml-2 mt-2"
            v-for="(song, index) of songs"
            :key="song.id"
            @click="onSelect(song, index)"
        >
            <div>
                <p class="text-black">{{ song.name }}</p>

                <div class="flex items-center">
                    <IconMusic class="text-black"></IconMusic>
                    <p class="text-[.5rem] text-zinc-400 text-center">
                        {{ song.singer.slice(0, 6) }}
                    </p>
                </div>
            </div>
        </li>
    </ul>
</template>
