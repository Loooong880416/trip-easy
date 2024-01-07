import XRequest from '../request'

export function getHomeHotSuggests(){
  return XRequest.get({
    url:'/home/hotSuggests'
  })
}