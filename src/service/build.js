import request from './request'

export function getBuildClassData(bid,data) {
  return request({
    url: "/build",
    params: {
      bid,data
    }
  })
}
