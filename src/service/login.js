import request from './request'

export function userLogin(user) {
  return request({
    url: "/login",
    method: 'post',
    data: {
      user
    }
  })
}
