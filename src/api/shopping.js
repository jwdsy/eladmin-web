import request from '@/utils/request'

export function queryProduct(pageNo, pageSize, labelId) {
  const params = {
    pageNo: pageNo,
    pageSize: pageSize,
    firstLabelId: labelId
  }
  return request({
    url: '/api/item/list',
    method: 'get',
    params
  })
}

export function queryPicProduct() {
  const params = {
    pageNo: 1,
    pageSize: 100,
    pickFlag: 1
  }
  return request({
    url: '/api/item/list',
    method: 'get',
    params
  })
}

export function itemPick(itemId, itemRemark, pickFlag) {
  const params = {
    itemId: itemId,
    itemRemark: itemRemark,
    pickFlag: pickFlag
  }
  return request({
    url: '/api/item/pick',
    method: 'post',
    params
  })
}

export function submitCart() {
  return request({
    url: '/api/item/submit',
    method: 'post'
  })
}

export function cleanCart() {
  return request({
    url: '/api/item/clean',
    method: 'post'
  })
}

export function queryLabel() {
  return request({
    url: '/api/item/label/list',
    method: 'get'
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

export default { queryProduct, queryLabel, queryPicProduct, itemPick, submitCart, cleanCart, add, edit, del }
