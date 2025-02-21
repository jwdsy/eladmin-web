import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'item/label/v1/createOrUpdateItemLabel',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'item/label/v1/deleteItemLabel',
    method: 'post',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'item/label/v1/createOrUpdateItemLabel',
    method: 'post',
    data
  })
}

export function list(url, data) {
  return request({
    url: 'item/label/v1/getItemLabelList',
    method: 'post',
    data
  })
}

export function changeStatus(params) {
  return request({
    url: 'item/label/v1/updateItemLabelStatus',
    method: 'post',
    params
  })
}

export default { add, edit, del, list, changeStatus }
