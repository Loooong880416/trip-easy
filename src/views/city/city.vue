<template>
  <div class="city">
    <div class="top">
      <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />
      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <city-group :group-data="value" v-show="tabActive === key"></city-group>
      </template>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from "@/store/modules/city"
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/city-group.vue'

const router = useRouter()
const searchValue = ref("")

const cancelClick = () => {
  router.back()
}

const tabActive = ref(0)

// 网络请求，请求城市的数据
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
.top {
  position: relative;
  z-index: 999;

}

.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>