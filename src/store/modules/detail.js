import { defineStore } from "pinia";
import { getDetailInfo } from "@/service"

const useDetailStore = defineStore("detail", {
  state: () => ({
    houseDetailInfo: {}
  }),
  actions: {
    async fetchHouseDetail(id) {
      const res = await getDetailInfo(id)
      this.houseDetailInfo = res.data
    }
  }
})

export default useDetailStore;