
//module.exports = ['$http', 'common', 'util', 'config', 'KnownException',
//    function ($http, common, util, config, KnownException) {
//        'use strict';
//        var service = common.Rest('/CMSCategoryList');

//        service.getOne = function (OnTopCreditCardId) {
//            var req = {
//                method: 'GET',
//                url: '/Promotion/Ontopcredit/' + OnTopCreditCardId
//            };
//            return common.makeRequest(req);
//        };

//        service.create = function (obj) {
//            return common.makeRequest({
//                method: 'POST',
//                url: '/Promotion/OnTopCreate',
//                data: obj,
//                headers: {
//                    'Content-Type': 'application/json;charset=UTF-8'
//                }
//            });
//        };

//        service.update = function (OnTopCreditCardId, obj) {
//            return common.makeRequest({
//                method: 'PUT',
//                url: '/Promotion/OntopUpdate/' + OnTopCreditCardId,
//                data: obj,
//                headers: {
//                    'Content-Type': 'application/json;charset=UTF-8'
//                }
//            });
//        };

//        service.getAll = function (parameters) {
//            var req = {
//                method: 'GET',
//                url: '/CMSCategoryList',
//                params: {
//                    _order: parameters.orderBy || 'CMSCollectionCategoryId',
//                    _limit: parameters.pageSize || 10,
//                    _offset: parameters.page * parameters.pageSize || 0,
//                    _direction: parameters.direction || 'asc',
//                    _filter: parameters.filter || 'ALL',
//                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
//                }
//            };

//            return common.makeRequest(req);
//        };

//        service.searchProduct = function (parameters) {
//            var req = {
//                method: 'GET',
//                url: '/CMSCategoryList',
//                params: {
//                    _order: parameters.orderBy || 'CMSCollectionCategoryId',
//                    _limit: parameters.pageSize || 10,
//                    _offset: parameters.page * parameters.pageSize || 0,
//                    _direction: parameters.direction || 'asc',
//                    _filter: parameters.filter || 'ALL',
//                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
//                }
//            }
//            return common.makeRequest(req);
//        }

//        return service;
//    }
//];


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

        service.getBrand = function (cateId) {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetBrand/' + cateId
            });
        };

        service.getAllCategory = function () {
            return common.makeRequest({
                method: 'GET',
                url: '/CMS/GetAllCategory'
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
