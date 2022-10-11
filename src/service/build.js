import request from './request'

export function getBuildDate(bid) {
  return request({
    url: "",
    params: {
      bid
    }
  })
}
