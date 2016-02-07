module.exports = function($rootScope, $parse, $animate) {
  'ngInject';
  return {
    multiElement: true,
    transclude: 'element',
    priority: 600,
    terminal: true,
    restrict: 'A',
    $$tlb: true,
    link: function($scope, $element, $attr, ctrl, $transclude) {
        var block, childScope, previousElements, value;
        var parse = $parse($attr.ngPermission);

        $rootScope.$watch('Profile', function (obj) {
          //Check permission existence
          if(!_.isUndefined(obj) && !_.isUndefined(obj.Permission)){
            value = parse(_.fromPairs(_.map(obj.Permission, function(e) {
              return [e.Permission, true];
            })));

            if(_.isUndefined(value)) {
              value = false;
            }
          } else {
            value = false;
          }

          //COPIED FROM NG-IF
          if (value) {
            if (!childScope) {
              $transclude(function(clone, newScope) {
                childScope = newScope;
                clone[clone.length++] = document.createComment(' end ngPermission: ' + $attr.ngPermission + ' ');
                // Note: We only need the first/last node of the cloned nodes.
                // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                // by a directive with templateUrl when its template arrives.
                block = {
                  clone: clone
                };
                $animate.enter(clone, $element.parent(), $element);
              });
            }
          } else {
            if (previousElements) {
              previousElements.remove();
              previousElements = null;
            }
            if (childScope) {
              childScope.$destroy();
              childScope = null;
            }
            if (block) {
              previousElements = getBlockNodes(block.clone);
              $animate.leave(previousElements).then(function() {
                previousElements = null;
              });
              block = null;
            }
          }
        //END OF COPY
        //DON"T ASK ME WHY
        });
    }
  }
};