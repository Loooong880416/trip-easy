<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetsImg(item.image)">
            <img v-else :src="getAssetsImg(item.imageActive)">
          </template>
        </van-tabbar-item>
      </template>

    </van-tabbar>

  </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar'
import { getAssetsImg } from '@/utils/load_assets'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const currentIndex = ref(0)
const route = useRoute()
watch(route,(newValue)=>{
  const index = tabbarData.findIndex(item=>item.path === newValue.path)
  if(index === -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }

    img {
      width: 36px;
    }
  }
}
</style>