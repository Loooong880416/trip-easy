<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="$router.back()" />
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import useDetailStore from '@/store/modules/detail'
import { storeToRefs } from 'pinia';
import { computed, ref } from "vue";

import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from './cpns/detail_01_swipe.vue'
import DetailInfos from './cpns/detail_02_infos.vue'
import DetailFacility from './cpns/detail_03_facility.vue'
import DetailLandlord from "./cpns/detail_04_landlord.vue"
import DetailComment from "./cpns/detail_05_comment.vue"
import DetailNotice from "./cpns/detail_06_notice.vue"
import DetailMap from "./cpns/detail_07_map.vue"
import DetailIntro from "./cpns/detail_08_intro.vue"
import useScroll from '@/utils/useScroll'

const router = useRouter()
const route = useRoute()

const houseId = route.params.id
const detailStore = useDetailStore()
detailStore.fetchHouseDetail(houseId)
const { houseDetailInfo } = storeToRefs(detailStore)

const mainPart = computed(() => houseDetailInfo.value.mainPart)

// tabcontrol
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})
const names = ref(['描述', '设施', '房东'])

const tabClick = (index)=>{
  // detailRef.value.scrollTo({
  //   top: mainPart.value[index].offsetTop,
  //   behavior: "smooth"
  // })
}

</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>