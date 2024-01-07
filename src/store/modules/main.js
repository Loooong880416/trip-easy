import { defineStore } from "pinia";

const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 1);

const useMainStore = defineStore("main", {
  state: () => ({
    startDate: startDate,//开始时间
    endDate: endDate,//结束时间
  })
})
export default useMainStore;