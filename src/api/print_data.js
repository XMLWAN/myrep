import request from "@/utils/request"

export function GetBatchPrintDialysisData(sch_ids){
    return request({
        url: '/api/print/schedule/dialysis',
        method: 'get',
        params: {
            ids: sch_ids,
        },
    })
}