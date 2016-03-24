module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/Shops/Profile');
    return service;
};