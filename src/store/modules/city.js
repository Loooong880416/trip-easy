import { defineStore } from "pinia";
import { getCityAll } from "@/service"

const useCityStore = defineStore("city",{
  state:()=>({
    allCities:{}, //所有城市
    currentCity:{
      cityName:'深圳'
    } //当前城市
  }),
  actions:{
    async fetchAllCitiesData(){
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore;