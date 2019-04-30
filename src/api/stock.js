import request from '@/utils/request'


export function createDealer(params){
  return request({
    url:'/api/stock/dealer/create',
    method:'post',
    params:params
  })
}


export function modifyDealer(params){
  return request({
    url:'/api/stock/dealer/modify',
    method:'post',
    params:params
  })
}



export function getDealersList(params){
  return request({
    url:'/api/stock/dealer/list',
    method:'get',
    params:params
  })
}


export function deleteDealer(params){
  return request({
    url:'/api/stock/dealer/delete',
    method:'post',
    params:params
  })
}



export function GetDealer(params){
  return request({
    url:'/api/stock/dealer/get',
    method:'get',
    params:params
  })
}





export function createManufacturer(params){
  return request({
    url:'/api/stock/manufacturer/create',
    method:'post',
    params:params
  })
}


export function modifyManufacturer(params){
  return request({
    url:'/api/stock/manufacturer/modify',
    method:'post',
    params:params
  })
}



export function getManufacturerList(params){
  return request({
    url:'/api/stock/manufacturer/list',
    method:'get',
    params:params
  })
}


export function deleteManufacturer(params){
  return request({
    url:'/api/stock/manufacturer/delete',
    method:'post',
    params:params
  })
}



export function GetManufacturer(params){
  return request({
    url:'/api/stock/manufacturer/get',
    method:'get',
    params:params
  })
}










export function createGoodType(params){
  return request({
    url:'/api/stock/good/type/create',
    method:'post',
    params:params
  })
}


export function modifyGoodType(params){
  return request({
    url:'/api/stock/good/type/modify',
    method:'post',
    params:params
  })
}



export function getGoodTypeList(params){
  return request({
    url:'/api/stock/good/type/list',
    method:'get',
    params:params
  })
}


export function deleteGoodType(params){
  return request({
    url:'/api/type/delete',
    method:'post',
    params:params
  })
}



export function GetGoodType(params){
  return request({
    url:'/api/stock/good/type/get',
    method:'get',
    params:params
  })
}









export function createGoodInfo(params){
  return request({
    url:'/api/stock/good/info/create',
    method:'post',
    params:params
  })
}


export function modifyGoodInfo(params){
  return request({
    url:'/api/stock/good/info/modify',
    method:'post',
    params:params
  })
}



export function getGoodInfoList(params){
  return request({
    url:'/api/stock/good/info/list',
    method:'get',
    params:params
  })
}


export function deleteGoodInfo(params){
  return request({
    url:'/api/info/delete',
    method:'post',
    params:params
  })
}



export function GetGoodInfoByGoodId(params){
  return request({
    url:'/api/stock/good/info/get',
    method:'get',
    params:params
  })
}

export function GetGoodInfo(params){
  return request({
    url:'/api/stock/good/info',
    method:'get',
    params:params
  })
}



export function GetAllDeals(params){
  return request({
    url:'/api/stock/dealer/all',
    method:'get',
    params:params
  })
}


export function GetAllManufacturer(params){
  return request({
    url:'/api/stock/manufacturer/all',
    method:'get',
    params:params
  })
}


export function GetAllGoodType(params){
  return request({
    url:'/api/stock/good/type/all',
    method:'get',
    params:params
  })
}


export function GetAllGoodInfo(params){
  return request({
    url:'/api/stock/good/info/all',
    method:'get',
    params:params
  })
}

export function postWarehouse(params,warehousing_time,warehousing_order){
  return request({
    url:'/api/stock/warehouse/create?warehousing_time='+warehousing_time+"&warehousing_order="+warehousing_order,
    method:'post',
    data:params
  })
}


export function getWarehouseList(params){
  return request({
    url:'/api/stock/warehouse/list',
    method:'get',
    params:params
  })
}

export function getWarehouseInfoList(params){
  return request({
    url:'/api/stock/warehouseinfo/list',
    method:'get',
    params:params
  })
}


export function postSalesReturn(params,salesReturnTime,salesReturnTotal,ids,orderNumber){
  return request({
    url:'/api/warehouse/return?time='+salesReturnTime+"&total="+salesReturnTotal+"&ids="+ids+"&order_number="+orderNumber,
    method:'post',
    data:params
  })
}

export function getWarehouseInfo(params){
  return request({
    url:'/api/info/get',
    method:'get',
    params:params
  })
}



export function getSalesReturnList(params){
  return request({
    url:'/api/return/list',
    method:'get',
    params:params
  })
}


export function getSalesReturnInfoList(params){
  return request({
    url:'/api/return/info',
    method:'get',
    params:params
  })
}

export function getAllWarehouseInfo(params){
  return request({
    url:'/api/warehouseinfo',
    method:'get',
    params:params
  })
}






export function getWarehouseOutList(params){
  return request({
    url:'/api/stock/out/list',
    method:'get',
    params:params
  })
}

export function getWarehouseOutInfoList(params){
  return request({
    url:'/api/stock/out/info',
    method:'get',
    params:params
  })
}


export function postWarehouseOut(params,warehousing_time,warehousing_out_order){
  return request({
    url:'/api/stock/out/create?warehousing_out_time='+warehousing_time+"&warehousing_out_order="+warehousing_out_order,
    method:'post',
    data:params
  })
}


export function getWarehouseInfoCountByGoodId(params){
  return request({
    url:'/api/info/count',
    method:'get',
    params:params
  })
}

export function getWarehouseInfoByGoodTypeId(params){
  return request({
    url:'/api/warehouse/type',
    method:'get',
    params:params
  })
}

export function getWarehouseOutInfo(params){
  return request({
    url:'/api/out/info',
    method:'get',
    params:params
  })
}


export function postCancelStock(params,cancelStockTime,cancelStockTotal,ids,orderNumber){
  return request({
    url:'/api/stock/cancel?time='+cancelStockTime+"&total="+cancelStockTotal+"&ids="+ids+"&order_number="+orderNumber,
    method:'post',
    data:params
  })
}



export function getCancelStockList(params){
  return request({
    url:'/api/cancel/list',
    method:'get',
    params:params
  })
}

export function getCancelStockInfoList(params){
  return request({
    url:'/api/cancel/info',
    method:'get',
    params:params
  })
}


export function getAllStockOutList(params){
  return request({
    url:'/api/out/list',
    method:'get',
    params:params
  })
}




export function getAllStockQueryList(params){
  return request({
    url:'/api/stock/query',
    method:'get',
    params:params
  })
}


export function getWarehouseInfoByOrdeNumber(params){
  return request({
    url:'/api/stock/warehouse/get',
    method:'get',
    params:params
  })
}


export function modifyWarehouseInfo(params){
  return request({
    url:'/api/stock/warehouse/edit',
    method:'post',
    params:params
  })
}


export function deleteWarehouseInfo(params){
  return request({
    url:'/api/stock/warehouse/delete',
    method:'post',
    params:params
  })
}


export function getWarehouseOutInfoByOrdeNumber(params){
  return request({
    url:'/api/stock/out/get',
    method:'get',
    params:params
  })
}

export function modifyWarehouseOutInfo(params){
  return request({
    url:'/api/stock/out/edit',
    method:'post',
    params:params
  })
}


export function deleteWarehouseOutInfo(params){
  return request({
    url:'/api/stock/out/delete',
    method:'post',
    params:params
  })
}


export function deleteStockInRecord(params){
  return request({
    url:'/api/warehouse/delete',
    method:'post',
    params:params
  })
}











