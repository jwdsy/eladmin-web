import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/product/v1/createOrUpdateItemDetail',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/product/v1/deleteItemDetail',
    method: 'post',
    data: { 'itemIdList': ids }
  })
}

export function edit(data) {
  return new Promise(async(resolve, reject) => {
    try {
      const result = await request({
        url: 'api/product/v1/createOrUpdateItemDetail',
        method: 'post',
        data
      })
      if (result) {
        resolve({
          ...result
        })
      } else {
        reject(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export function list(url, data) {
  return new Promise(async(resolve, reject) => {
    data.page = data.page + 1
    delete data.sort
    try {
      const result = await request({
        url: 'api/product/v1/getItemDetailList',
        method: 'post',
        data
      })
      if (result) {
        resolve({
          ...result,
          totalElements: result.totalNum,
          content: result.itemList
        })
      } else {
        reject(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export function changeStatus(data) {
  return request({
    url: 'api/product/v1/updateItemStatus',
    method: 'post',
    data
  })
}

export function exportItemDetailList(data) {
  return request({
    url: 'api/product/v1/exportItemDetailList',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 获取标签列表
export function getLabelList(data) {
  return request({
    url: 'item/label/v1/getFirstLabelList',
    method: 'post',
    data
  })
}

// 更新产品状态
export function updateItemStatus(data) {
  return request({
    url: 'api/product/v1/updateItemStatus',
    method: 'post',
    data
  })
}

export default { add, edit, del, list, changeStatus, exportItemDetailList, getLabelList, updateItemStatus }
