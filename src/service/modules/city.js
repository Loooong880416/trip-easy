import XRequest from '../request'

export function getCityAll(){
  return XRequest.get({
    url:"/city/all"
  })
}