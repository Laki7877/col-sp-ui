//Products Service
module.exports = ['$http', 'common', 'util', 'config', 'KnownException',
    function ($http, common, util, config, KnownException) {
        'use strict';
        var service = common.Rest('/CMS/CMSMaster');

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/CMSMaster',
                params: {
                    _order: parameters.orderBy || 'CMSMasterId',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            };

            return common.makeRequest(req);
        };

        service.getOne = function (id) {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetCMSMaster/' + id
            });
        };

        service.create = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMS/CMSMaster',
                data: obj
            });
        };

        service.update = function (CMSMasterId, obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSMaster/' + CMSMasterId,
                data: obj
            });
        };

        //service.duplicate = function (CMSMasterId) {
        //    var req = {
        //        method: 'POST',
        //        url: '/cms/master/' + CMSMasterId
        //    };

        //    return common.makeRequest(req);
        //};

        //service.visible = function (obj) {
        //    return common.makeRequest({
        //        method: 'PUT',
        //        url: '/cms/master/Visibility',
        //        data: obj,
        //        headers: {
        //            'Content-Type': 'application/json;charset=UTF-8'
        //        }
        //    });
        //};

        //service.deleteBulk = function (arr) {
        //    return common.makeRequest({
        //        method: 'DELETE',
        //        url: '/cms/master/delete',
        //        data: arr,
        //        headers: {
        //            'Content-Type': 'application/json;charset=UTF-8'
        //        }
        //    });
        //};

        //service.getStatus = function (abbreviation) {
        //    return StatusLookup[abbreviation];
        //}

        service.searchCMSCategory = function (parameters) {
            var req = {
                method: 'GET',
                url: '/cms/SearchCMSCategory',
                params: parameters
            };
            return common.makeRequest(req);
        };

        return service;
    }
];
