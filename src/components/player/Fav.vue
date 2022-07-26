<script setup>
import useFavorite from './useFavorite'

const { IconFavStatus, toggleFavStatus } = useFavorite()
</script>

<template>
    <div @click="toggleFavStatus">
        <component class="w-full h-full" :is="IconFavStatus"></component>
    </div>
</template>
