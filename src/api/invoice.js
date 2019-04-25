import request from '@/utils/request'

export function GetApplies(orders) {
    return request({
        url: '/api/invoice/applies?orders='+orders,
        method: 'Get',
    })
}
export function ApplyInvoice(orders, invoice) {
    return request({
        url: '/api/invoice/apply?orders='+orders,
        method: 'Post',
        data:invoice,
    })
}
export function GetNoInvOrders() {
    return request({
        url: '/api/invoice/noinvorders',
        method: 'Get',
    })
}
export function GetInvoices() {
    return request({
        url: '/api/invoices',
        method: 'Get',
    })
}
