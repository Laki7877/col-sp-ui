
var angular = require('angular');
module.exports = ['$q', 'common', function ($q, common) {

        var service = common.Rest('/CMS/CMSGroup');

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/CMSGroup',
                params: {
                    _order: parameters.orderBy || 'CMSGroupId',
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
                url: '/CMS/GetCMSGroup/' + id
            });
        };

        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/CMS/CMSGroup',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.create = function (obj) {
            console.log(obj)
            return common.makeRequest({
                method: 'POST',
                url: '/CMS/CMSGroup',
                data: obj
            });
        };

        service.update = function (id, obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSGroup/' + id,
                data: obj
            });
        };

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSGroup/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.searchCMSMaster = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/SearchCMSMaster',
                params: parameters
            };

            return common.makeRequest(req);
        };

        return service;
    }
];
