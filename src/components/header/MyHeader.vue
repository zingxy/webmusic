<script setup></script>

<template>
    <div class="__header h-10 flex justify-center items-center">
        <span
            class="__icon inline-block w-8 h-8 font-[0px] align-middle"
        ></span>
        <h1 class="__text inline-block text-xs text-white">Music</h1>
        <router-link class="__link absolute top-0 left-0" to="/Recommend">
            <i class=""></i
        ></router-link>
    </div>
</template>

<style scoped>
.__icon {
    background-image: url('./Music.png');
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
