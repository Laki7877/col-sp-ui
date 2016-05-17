var angular = require('angular');
module.exports = ['$q', 'common', function ($q, common) {

    var service = common.Rest('/Promotion/Buy1Get1');

    service.getAll = function (parameters) {
        var req = {
            method: 'GET',
            url: '/Promotion/Buy1Get1',
            params: {
                _order: parameters.orderBy || 'PromotionBuy1Get1ItemId',
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
            url: '/Promotion/Buy1Get1/' + id
        });
    };

    service.create = function (obj) {
        return common.makeRequest({
            method: 'POST',
            url: '/Promotion/Buy1Get1/Create',
            data: obj
        });
    };

    service.update = function (PromotionBuy1Get1ItemId, obj) {
        return common.makeRequest({
            method: 'PUT',
            url: '/Promotion/Buy1Get1/Update' + PromotionBuy1Get1ItemId,
            data: obj
        });
    };
    service.getStatus = function (abbreviation) {
        return StatusLookup[abbreviation];
    }
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
