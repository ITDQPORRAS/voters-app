import request from 'src/utils/request';


/**
 * Simple RESTful resource class
 */
class Resource {
    constructor(uri) {
        this.uri = uri;
    }
    list(query) {
        return request({
            url: '/' + this.uri,
            method: 'get',
            params: query,
        });
    }
    post(query) {
        return request({
            url: '/' + this.uri,
            method: 'post',
            data: query,
        });
    }

    get(id) {
        return request({
            url: '/' + this.uri + '/' + id,
            method: 'get',
        });
    }
    get2(id, socketId) {
        return request({
            url: '/' + this.uri + '/' + id + '/' + socketId,
            method: 'get',
        });
    }
    store(resource) {
        return request({
            url: '/' + this.uri,
            method: 'post',
            data: resource,
        });
    }
    print(resource) {
        return request({
            url: '/' + this.uri,
            method: 'post',
            data: resource,
        });
    }
    update(id, resource) {
        return request({
            url: '/' + this.uri + '/' + id,
            method: 'put',
            data: resource,
        });
    }
    destroy(id) {
        return request({
            url: '/' + this.uri + '/' + id,
            method: 'delete',
        });
    }
    getProvince() {
        return request({
            url: '/Address/province/',
            method: 'get',
        });
    }
    getCity(id) {
        return request({
            url: '/Address/city' + '/' + id,
            method: 'get',
        });
    }
    getBarangay(id) {
        return request({
            url: '/Address/barangay' + '/' + id,
            method: 'get',
        });
    }
    toDouble(val) {
        let x = (val / 1).toFixed(2).replace('.', ',')
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    toInterger(val) {
        let x = (val / 1).toFixed(0).replace('.', ',')
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
}

export { Resource as default };