
var angular = require('angular');
module.exports = ['$q', 'common', function ($q, common) {

        var service = common.Rest('/CMS/CMSCategory');

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/GetAllCMSCategory',
                params: {
                    _order: parameters.orderBy || 'CMSCategoryId',
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
                url: '/CMS/GetCMSCategory/' + id
            });
        };

        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/CMS/CMSCategory',
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
                url: '/CMS/CMSCategory',
                data: obj
            });
        };

        service.update = function (id, obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSCategory/' + id,
                data: obj
            });
        };

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSCategory/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.approve = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSCategory/Approve',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        service.reject = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/CMS/CMSCategory/Reject',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        service.getBrand = function (cateId) {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetBrand/' + cateId
            });
        };

        service.getAllCategory = function (parameters) {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetAllCategory',
                params: parameters
            });
        };

        service.getAllTag = function () {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetAllTag'
            });
        };

        service.searchProduct = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMS/SearchProduct',
                params: parameters
            };

            return common.makeRequest(req);
        };

        return service;
    }
];
