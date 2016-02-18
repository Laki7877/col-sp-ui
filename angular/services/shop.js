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
    service.getProfile = function () {
        return common.makeRequest({
            url: '/Shop/Profile',
            method: 'GET'
        });
    };

    service.saveProfile = function (ShopProfile) {
        return common.makeRequest({
            url: '/Shop/Profile',
            method: 'PUT',
            data: ShopProfile
        });
    };

    return service;
}];
