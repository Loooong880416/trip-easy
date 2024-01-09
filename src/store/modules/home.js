import { getHomeHotSuggests, getHomeCategories, getHomeHouseList } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    // 定义变量
    hotSuggests: [], //热门建议
    categories:[], 
    houseList:[],//首页内容数据
    currentPage:1,//当前页数
  }),
  // 定义操作
  actions: {
    // 定义操作函数
    async fetchHotSuggestsData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.currentPage++
      this.houseList.push(...res.data) 
    }
  },
})

export default useHomeStore;