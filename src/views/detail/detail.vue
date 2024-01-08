<template>
  <div class="detail">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="$router.back()" />
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import useDetailStore from '@/store/modules/detail'
import { storeToRefs } from 'pinia';
import { computed } from "vue";

import DetailSwipe from './cpns/detail-swipe.vue'

const router = useRouter()
const route = useRoute()

const houseId = route.params.id
const detailStore = useDetailStore()
detailStore.fetchHouseDetail(houseId)
const { houseDetailInfo } = storeToRefs(detailStore)

const mainPart = computed(() => houseDetailInfo.value.mainPart)


</script>

<style lang="less" scoped></style>