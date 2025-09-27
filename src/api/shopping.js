import request from '@/utils/request'

export function queryProduct(params) {
  console.log('queryProduct called with original params:', params)

  // 支持旧的调用方式（三个参数）和新的调用方式（对象参数）
  if (typeof params === 'number' || typeof params === 'string') {
    // 旧的调用方式：queryProduct(pageNo, pageSize, labelId)
    const pageNo = arguments[0]
    const pageSize = arguments[1]
    const labelId = arguments[2]
    params = {
      pageNo: pageNo,
      pageSize: pageSize,
      firstLabelId: labelId
    }
    console.log('Using old calling method, converted params:', params)
  } else {
    // 新的调用方式：queryProduct({pageNo, pageSize, labelId, year, season})
    console.log('=== SHOPPING.JS DEBUG ===')
    console.log('Using new calling method, input params:', params)
    console.log('params.year:', params.year, 'type:', typeof params.year)
    console.log('params.season:', params.season, 'type:', typeof params.season)
    console.log('params.labelId:', params.labelId, 'type:', typeof params.labelId)

    const requestParams = {
      pageNo: params.pageNo,
      pageSize: params.pageSize
    }

    // 添加labelId参数（如果存在且不为null）
    if (params.labelId !== null && params.labelId !== undefined) {
      requestParams.firstLabelId = params.labelId
      console.log('Added firstLabelId:', params.labelId)
    } else {
      console.log('firstLabelId NOT added. labelId:', params.labelId)
    }

    // 添加year参数（如果存在且不为null）
    if (params.year !== null && params.year !== undefined) {
      requestParams.year = params.year
      console.log('Added year:', params.year)
    } else {
      console.log('year NOT added. year:', params.year)
    }

    // 添加season参数（如果存在且不为null）
    if (params.season !== null && params.season !== undefined) {
      requestParams.season = params.season
      console.log('Added season:', params.season)
    } else {
      console.log('season NOT added. season:', params.season)
    }

    params = requestParams
    console.log('Using new calling method, final params:', params)
    console.log('=== END SHOPPING.JS DEBUG ===')
  }

  console.log('API call - final params before request:', params)
  console.log('Will call URL: /api/item/list with params:', JSON.stringify(params))

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
