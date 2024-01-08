<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
import { onMounted, ref } from "vue"

const props = defineProps({
  position: {
    type: Object,
    defaultL: () => ({})
  }
})

const mapRef = ref()
// 百度地图的生成要在onMounted中进行,因为要获取元素，需要是挂载阶段，直接在setup中先就相当于在created创建阶段中，可能获取不到元素
onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);          // 创建地图实例 
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);  // 创建点坐标 
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别

  const masker = new BMapGL.Marker(point);  // 创建遮罩
  map.addOverlay(masker);                     // 将遮罩添加到地图中
})
</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>