import request from '@/utils/request'

// 获取展示商品列表
export function getDisplayItemList(data) {
  return request({
    url: 'api/item/v2/getDisplayItemList',
    method: 'post',
    data
  })
}

// 获取轮播图商品列表
export function getItemShowList(data) {
  return request({
    url: 'api/item/v2/getItemShowList',
    method: 'post',
    data
  })
}

// 获取展示标签列表
export function getDisplayLabelList(data) {
  return request({
    url: 'api/item/v2/getDisplayLabelList',
    method: 'post',
    data
  })
}

// 顾客选择喜欢的产品
export function customerPickItem(data) {
  return request({
    url: 'api/item/v2/customerPickItem',
    method: 'post',
    data
  })
}

// 顾客取消全部喜欢的产品
export function cancelAllPickItems(data) {
  return request({
    url: 'api/item/v2/cancelAllPickItems',
    method: 'post',
    data
  })
}

// 顾客提交喜欢的产品
export function customerSubmitItem(data) {
  return request({
    url: 'api/item/v2/customerSubmitItem',
    method: 'post',
    data
  })
}

export default {
  getDisplayItemList,
  getDisplayLabelList,
  getItemShowList,
  customerPickItem,
  cancelAllPickItems,
  customerSubmitItem
}

