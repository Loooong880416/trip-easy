<template>
  <div class="detail">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="$router.back()" />
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import useDetailStore from '@/store/modules/detail'
import { storeToRefs } from 'pinia';
import { computed } from "vue";

import DetailSwipe from './cpns/detail_01_swipe.vue'
import DetailInfos from './cpns/detail_02_infos.vue'
import DetailFacility from './cpns/detail_03_facility.vue'
import DetailLandlord from "./cpns/detail_04_landlord.vue"
import DetailComment from "./cpns/detail_05_comment.vue"
import DetailNotice from "./cpns/detail_06_notice.vue"

const router = useRouter()
const route = useRoute()

const houseId = route.params.id
const detailStore = useDetailStore()
detailStore.fetchHouseDetail(houseId)
const { houseDetailInfo } = storeToRefs(detailStore)

const mainPart = computed(() => houseDetailInfo.value.mainPart)


</script>

<style lang="less" scoped></style>