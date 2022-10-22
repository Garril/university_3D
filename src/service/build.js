import request from './request'

export function getBuildClassData(bid,data) {
  return request({
    url: "/build",
    params: {
      bid,data
    }
  })
}

export function getEmptyData(bid,data) {
  return request({
    url: "/build/empty",
    params: {
      bid,data
    }
  })
}
