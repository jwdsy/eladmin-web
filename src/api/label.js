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
    data: { 'labelIdList': ids }
  })
}

export function edit(data) {
  return request({
    url: 'item/label/v1/createOrUpdateItemLabel',
    method: 'post',
    data
  })
}

export function getFirstLabelList() {
  return request({
    url: 'item/label/v1/getFirstLabelList',
    method: 'post'
  })
}

export function list(url, data) {
  return new Promise(async(resolve, reject) => {
    data.pageNo = data.page + 1
    data.pageSize = data.size
    delete data.page
    delete data.size
    delete data.sort
    try {
      const result = await request({
        url: 'item/label/v1/getItemLabelList',
        method: 'post',
        data
      })
      if (result) {
        resolve({
          ...result,
          totalElements: result.totalNum,
          content: result.labelList
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
    url: 'item/label/v1/updateItemLabelStatus',
    method: 'post',
    data
  })
}

export default { add, edit, del, list, changeStatus, getFirstLabelList }
