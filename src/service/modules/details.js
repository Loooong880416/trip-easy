import XRequest from "../request"

export function getDetailInfo(houseId) {
  return XRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}