import request from '@/utils/request'

export function queryProduct() {
  const params = {
    pageNo: 1,
    pageSize: 10,
    enabled: true
  }
  return request({
    url: '/api/item/list',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/product',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/product',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/product',
    method: 'put',
    data
  })
}

export default { queryProduct, add, edit, del }
