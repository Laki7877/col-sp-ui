[![Gitter](https://badges.gitter.im/Laki7877/col-sp-ui.svg)](https://gitter.im/Laki7877/col-sp-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
# Central Online Seller Portal 
Seller portal web application for Central Online.

## Pre-prerequisites
    - Ruby (and gem)
    - NodeJS (and npm)
    - Git
    - PHP

## Installing prerequisites (Windows)
*Caution:* Make sure `git`, `ruby`, `gem`, `php` are included in `$PATH`
   
    gem install compass
    npm install -g bower
    npm install -g grunt-cli
    npm install
    bower install
    
## Installing prerequisites (OS X / Linux)

    sudo gem install compass
    sudo npm install -g bower
    sudo npm install -g grunt-cli
    npm install
    bower install
    
## Installing prerequisites (OS X El Capitan)

    sudo gem install -n /usr/local/bin compass
    sudo npm install -g bower
    sudo npm install -g grunt-cli
    sudo npm install
    sudo bower install
    
## Compiling and running
    
    compass compile
    npm buildAll
    npm serve

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
