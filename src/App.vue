<template>
  <div class="app">
    <router-view/>
    <tab-bar v-if="!route.meta.hideTabBar"/>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/index.vue'
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style lang="less" scoped>

</style>