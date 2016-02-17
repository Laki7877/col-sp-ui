[![Gitter](https://badges.gitter.im/Laki7877/col-sp-ui.svg)](https://gitter.im/Laki7877/col-sp-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
# Seller Portal 
Very angular.

## ncPlugin Design Document

* Plugin should be declared in angular module format. One file per one plugin module (not necessarily one directive)

``` javascript
angular.module('nc')
  .directive('ncTestPlugin', function() {
    return {
      restrict: 'E',
      link: function(scope) {
        //Main ncTestPlugin link function
      }
    };
  }
  .directive('ncTestChildPlugin', function() {
    return {
      restrict: 'EA',
      require: '^ncTestPlugin',
      link: function(scope, elem, attrs, parentCtrl) {
        //Main ncChild link function
      }
    }
  });
```

* Plugin's isolate scope argument should precede by directive name except for `ncModel`.

``` javascript
angular.module('nc')
  .directive('ncTestPlugin', function() {
    return {
      restrict: 'E',
      scope: {
        options: '=ncTestPluginOptions'
      }
    }
  });
```

* Plugin's provider should be its own name precede by `$` character.

``` javascript
angular.module('nc')
  .provider('$ncTestPlugin', function() {
    this.testOptions = {};
    this.$get = function() {
      return this;
    }
  })
  .directive('ncTestPlugin', function($ncTestPlugin) {
    return {
      restrict: 'E',
      link: function(scope) {
        scope.options = $ncTestPlugin.testOptions;
      }
    }
  });
```
