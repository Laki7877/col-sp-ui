angular.module('nc')
    .directive('ncBreadcrumbTitle', function ($templateCache) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                title: '=ncTitles',
                link: '=ncLinks',
                css: '=?ncClass'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/breadcrumb-title.html');
                return templateHTML;
            }
        };
    });