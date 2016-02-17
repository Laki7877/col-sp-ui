module.exports = ['common', function (common) {
    'use strict';
    var service = {};

    service.getLocalCategories = function (id) {
        return common.makeRequest({
            url: '/Shops/' + id + '/LocalCategories',
            method: 'GET'
        });
    };

    service.upsertLocalCategories = function (id, data) {
        return common.makeRequest({
            url: '/Shops/' + id + '/LocalCategories',
            method: 'PUT',
            data: data
        });
    };
    
    //get shop profile
    service.get = function (ShopId) {
        return common.makeRequest({
            url: '/Shops/' + ShopId,
            method: 'GET'
        });
    };

    service.save = function (ShopProfile) {
        return common.makeRequest({
            url: '/Shops',
            method: 'PUT',
            data: ShopProfile
        });
    };

    return service;
}];