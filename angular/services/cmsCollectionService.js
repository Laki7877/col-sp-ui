//Products Service
module.exports = ['$http', 'common', 'util', 'config', 'KnownException',
    function ($http, common, util, config, KnownException) {
        'use strict';
        var service = common.Rest('/CMSShopList');

        service.getOne = function (OnTopCreditCardId) {
            var req = {
                method: 'GET',
                url: '/Promotion/Ontopcredit/' + OnTopCreditCardId
            };
            return common.makeRequest(req);
        };

        service.create = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/Promotion/OnTopCreate',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.update = function (OnTopCreditCardId, obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/Promotion/OntopUpdate/' + OnTopCreditCardId,
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMSShopList',
                params: {
                    _order: parameters.orderBy || 'CMSCollectionCategoryId',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            };

            return common.makeRequest(req);
        };

        service.searchProduct = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMSCategoryList',
                params: {
                    _order: parameters.orderBy || 'CMSCollectionCategoryId',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            }
            return common.makeRequest(req);
        }

        return service;
    }
];
