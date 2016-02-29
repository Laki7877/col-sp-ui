module.exports = function (common, config, util) {
    'ngInject';
    'use strict';

    var service = common.Rest('/Shops');

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

    service.serialize = function(data) {
        var processed = _.merge({}, data);
        processed.Status = processed.Status.value;
        return processed;
    };

    service.deserialize = function(data) {
        var processed = _.merge({}, data);
        processed.Status = util.getDropdownItem(config.DROPDOWN.DEFAULT_STATUS_DROPDOWN, processed.Status);
        return processed;
    };

    service.generate = function(data) {
        return {
            Status: config.DROPDOWN.DEFAULT_STATUS_DROPDOWN[0]
        };
    };

    return service;
};
