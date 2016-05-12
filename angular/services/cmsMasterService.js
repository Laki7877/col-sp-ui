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

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSMaster/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/CMS/CMSMaster',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.getStatus = function (abbreviation) {
            return StatusLookup[abbreviation];
        }

        service.searchCMSCategory = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/SearchCMSCategory',
                params: parameters
            };
            return common.makeRequest(req);
        };

        service.approve = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSMaster/Approve',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        };

        service.reject = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSMaster/Reject',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        };

        service.searchProduct = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/SearchFeatureProduct',
                params: parameters
            };

            return common.makeRequest(req);
        };

        return service;
    }
];
