import request from './request'

export function getWeatherInfo() {
  return request({
    url: "/weather"
  })
}