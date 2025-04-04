import request from '@/utils/request'

export function getAllJob() {
  const params = {
    page: 0,
    size: 9999,
    enabled: true
  }
  return request({
    url: '/api/biz/customer/submit/record',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/biz/customer/submit/record',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/biz/customer/submit/record',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/biz/customer/submit/record',
    method: 'put',
    data
  })
}

export default { add, edit, del }
