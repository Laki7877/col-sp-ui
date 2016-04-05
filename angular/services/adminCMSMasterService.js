//Products Service
module.exports = ['$http', 'common', 'util', 'config', 'KnownException',
    function ($http, common, util, config, KnownException) {
        'use strict';
        var service = common.Rest('/cms/master');

        service.getOne = function (CMSMasterId) {
            var req = {
                method: 'GET',
                url: '/cms/master/' + CMSMasterId
            };
            return common.makeRequest(req);
        };
        service.create = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/cms/master/create',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.update = function (CMSMasterId, obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/cms/master/update/' + CMSMasterId,
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.duplicate = function (CMSMasterId) {
            //this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/cms/master/' + CMSMasterId
            };

            return common.makeRequest(req);
        };

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/cms/master',
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


        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/cms/master/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/cms/master/delete',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };


        service.getStatus = function (abbreviation) {
            return StatusLookup[abbreviation];
        }


        return service;
    }
];
