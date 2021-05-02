import request from 'src/utils/request';
export function getSupplier() {
    return request({
        url: '/Supplier/showBillAddress',
        method: 'get',
    });
}
export function getWarehouse() {
    return request({
        url: '/Storage',
        method: 'get',
    });
}
export function getBrand() {
    return request({
        url: '/Brand',
        method: 'get',
    });
}