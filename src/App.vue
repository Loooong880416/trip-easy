<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <tab-bar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/index.vue'
import { useRoute } from 'vue-router';
import Loading from '@/components/loading/loading.vue';

const route = useRoute()

</script>

<style lang="less" scoped></style>