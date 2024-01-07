import XRequest from '../request'

export function getHomeHotSuggests(){
  return XRequest.get({
    url:'/home/hotSuggests'
  })
}

export function getHomeCategories(){
  return XRequest.get({
    url:'/home/categories'
  })
}

export function getHomeHouseList(currentPage = 1){
  return XRequest.get({
    url:'/home/houselist',
    params:{
      page: currentPage
    }
  })
}