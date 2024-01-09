<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control v-if="showTabControl" class="tabs" ref="tabControlRef" :titles="names" @tabItemClick="tabClick" />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="$router.back()" />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
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
import { computed, ref, watch } from "vue";

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
const sectionEl = ref({})
const names = computed(() => {
  return Object.keys(sectionEl.value)
})


const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEl.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEl.value)[index]
  const el = sectionEl.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }
  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}

const tabControlRef = ref()
// 滚动时监听页面匹配对于的tabcontrol的index
watch(scrollTop, (newValue) => {
  if(newValue === currentDistance){
    isClick = false
  }
  if(isClick) return
  // 获取所有区域的offsetTop
  const values = Object.values(sectionEl.value).map(el => el.offsetTop)

  // 根据newValue去匹配想要的索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44){
      index = i - 1
      break
    }
  }
  if(tabControlRef.value){
    tabControlRef.value.currentIndex = index
  }
})


</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 10;
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