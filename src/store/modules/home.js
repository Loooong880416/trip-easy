import { getHomeHotSuggests } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    // 定义变量
    hotSuggests: [], //热门建议
    categories:[], 
  }),
  // 定义操作
  actions: {
    // 定义操作函数
    async fetchHotSuggestsData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    }
  },
})

export default useHomeStore;