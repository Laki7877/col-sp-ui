module.exports = function (common, config, util, $log, $window) {
    'ngInject';
    'use strict';

    var service = common.Rest('/Onboarding');

    service.getListCompletedTask = function () {
        return common.makeRequest({
            url: '/Onboarding',
            method: 'GET'
        });
    };

    service.launchShop = function () {
        return common.makeRequest({
            url: '/Shops/Launch?Status=AT',
            method: 'GET'
        });
    };

    service.getNewsLetter = function () {
        return common.makeRequest({
            url: '/newsletters?_limit=10&_order=PublishedDt&_direction=desc',
            method: 'GET'
        });
    };

    service.getLowStockAlert = function () {
        return common.makeRequest({
            url: '/Inventories?_direction=desc&_filter=LowStock&_limit=10&_offset=0&_order=Pid',
            method: 'GET'
        });
    };

    service.getOutOfStock = function () {
        return common.makeRequest({
            url: '/Inventories?_direction=desc&_filter=OutOfStock&_limit=10&_offset=0&_order=Pid',
            method: 'GET'
        });
    };

    service.getOrders = function () {
        return common.makeRequest({
            url: '/Orders?_direction=desc&_filter=PaymentConfirmed&_limit=10&_offset=0&_order=UpdatedDt',
            method: 'GET'
        });
    };

    service.getProductRating = function () {
        return common.makeRequest({
            url: '/ProductReviews/Rating',
            method: 'GET'
        });
    };

    service.getReturnRating = function () {
        return common.makeRequest({
            url: '/Returns/Rate',
            method: 'GET'
        });
    };

    service.getTopSellingItems = function () {
        return common.makeRequest({
            url: '/Orders/TopOrder',
            method: 'GET'
        });
    };

    service.getRevenue = function (type) {
        switch (type) {

            case 'today':
                return common.makeRequest({
                    url: '/Orders/Revenue?_filter=Today',
                    method: 'GET'
                });
                break;

            case 'week':
                return common.makeRequest({
                    url: '/Orders/Revenue?_filter=ThisWeek',
                    method: 'GET'
                });
                break;

            case 'month':
                return common.makeRequest({
                    url: '/Orders/Revenue?_filter=ThisMonth',
                    method: 'GET'
                });
                break;

            case 'year':
                return common.makeRequest({
                    url: '/Orders/Revenue?_filter=ThisYear',
                    method: 'GET'
                });
                break;

            default:
                break;
        }
    };


    return service;
};
