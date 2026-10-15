import request from '@/utils/request'

export function queryLabelList(params) {
  return request({
    url: '/api/bizitem/label/list',
    method: 'get',
    params
  })
}

/**
 * 查询商品列表（匿名访问，用于前台展示）
 * @param params 查询参数
 */
export function getItemList(params) {
  return request({
    url: 'api/bizitem/record/list',
    method: 'get',
    params
  })
}

export function queryCollectionItemList(params) {
  return request({
    url: '/api/bizitem/collection/list',
    method: 'get',
    params
  })
}
export function queryCartItemList() {
  const params = {
    pageNo: 1,
    pageSize: 100,
    pickFlag: 1
  }
  return request({
    url: '/api/bizitem/cart/list',
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
    url: '/api/bizitem/cart/pick',
    method: 'post',
    params
  })
}

export function submitCart() {
  return request({
    url: '/api/bizitem/cart/submit',
    method: 'post'
  })
}

export function cleanCart() {
  return request({
    url: '/api/bizitem/cart/clean',
    method: 'post'
  })
}

export default { queryLabelList, getItemList, queryCollectionItemList, queryCartItemList, itemPick, submitCart, cleanCart }
