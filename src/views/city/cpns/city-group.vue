<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <div>
          <template v-for="(subItem, index) in item.cities" :key="index">
            <van-cell :title="subItem.cityName" @click="cityClick(city)"/>
          </template>
        </div>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import { useRouter } from 'vue-router'
import useCityStore from "@/store/modules/city"

// 定义props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态的索引
const indexList = computed(()=>{
  const list = props.groupData.cities.map(item=>item.group)
  list.unshift('#')
  return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 将选中的城市信息存储到store中
  cityStore.currentCity = city
  // 返回上一级
  router.back()
}

</script>

<style lang="less" scoped>
.list{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding:10px;
  padding-right:25px;
  
  .city{
    width:70px;
    height:28px;
    border-radius: 14px;
    font-size:12px;
    color:#000;
    text-align: center;
    background:#fff4ec;
    line-height: 28px;
    margin:6px 0;
  }
}
</style>
