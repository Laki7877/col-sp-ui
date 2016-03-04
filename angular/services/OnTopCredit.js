//Products Service
module.exports = ['$http', 'common', 'util', 'config', 'KnownException',
    function ($http, common, util, config, KnownException) {
        'use strict';
        var service = common.Rest('/Promotion/Ontopcredit');

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
        service.duplicate = function (OnTopCreditCardId) {
            //this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/Promotion/' + OnTopCreditCardId
            };

            return common.makeRequest(req);
        };

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/Promotion/Ontopcredit',
                params: {
                    _order: parameters.orderBy || 'OnTopCreditCardId',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    _text: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            };

            return common.makeRequest(req);
        };


        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/Promotion/Ontopcredit/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/Promotion/Ontopcredit',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };


        return service;
    }
];
