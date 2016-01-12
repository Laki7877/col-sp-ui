/**
 * Util class for category
 * @author poonwu
 */
var angular = require('angular');

module.exports = ['config', function(config) {
    'use strict';
	var service = {};
    /**
     * Transform angular-ui-tree data to nested set
     * see https://en.wikipedia.org/wiki/Nested_set_model
     */
    service.transformUITreeToNestedSet = function(tree) {
        var set = [];
        var inc = 1; //start with 1, left-right exclusive
        var traverse = function(node) {
            //Create shallow copy
            var cnode = angular.extend({}, node);

            //Assign Left
            cnode.Lft = inc++;

            //Navigate to sub children
            if(angular.isDefined(node.nodes)) {
                for (var i = 0; i < node.nodes.length; i++) {
                    traverse(node.nodes[i]);
                }
            }
            
            //Assign Right
            cnode.Rgt = inc++;

            //Remove subnodes ptr
            delete cnode['nodes'];  
            delete cnode['reverse'];  
            set.push(cnode);
        };

        for (var i = 0; i < tree.length; i++) {
            traverse(tree[i]);
        }
        return set;
    }

    /**
     * Transform nested set to angular-ui-tree
     */
    service.transformNestedSetToUITree = function(set) {
        var tree = [];
        var compare = function(a, b) {
            return a.Lft - b.Lft;
        };
        var reverse = function(set) {
            var array = [];
            var pivot = null;

            while(set.length > 0) {
                //Get front queue item
                var item = set.shift();
                if(angular.isUndefined(item.nodes)) {
                    item.nodes = [];
                }

                if (array.length <= 0) {
                    //First item, set as pivot
                    pivot = item;
                    array.push(pivot);
                } else {
                    if (item.Rgt < pivot.Rgt) {
                        //This item belong to pivot's children
                        pivot.nodes.push(item);
                    } else {
                        //Run reverse on current pivot if any
                        if(pivot.nodes.length > 0) {
                            pivot.nodes = reverse(pivot.nodes);
                            pivot.reverse = true; 
                        }
                        
                        //Change pivot
                        pivot = item;
                        array.push(pivot);
                    }
                }
            }

            if (angular.isUndefined(pivot.reverse) && pivot.nodes.length > 0) {
                pivot.nodes = reverse(pivot.nodes);
                pivot.reverse = true;
            }

            return array;
        }
        
        //Sort array by Lft
        set.sort(compare);

        //Reverse of deep copy
        return reverse(angular.copy(set));
    }

    /**
     * Create selection function for ng-click 
     * use in category selection 
     * **can only be used with UITree
     */
    service.createSelectFunc = function(columns, selectEvent) {
    	return function(item, indx, parentIndx) {
			columns[parentIndx].active = indx;

			for (var i = parentIndx+1; i < columns.length; i++) {
				columns[i].active = -1;
				columns[i].list = [];
			};
			
			if (parentIndx+1 < columns.length) {
				columns[parentIndx+1].list = item.nodes || [];
				columns[parentIndx+1].active = -1;
			}

			if (item.nodes.length <= 0) {
				selectEvent(item);
			} else {
            		        selectEvent(null);
			}
		};
    };

    /**
     * Create array of column from item in template or blank
     * use in category selection
     */
    service.createColumns = function(item, template) {
        var array = [];
        for (var i = 0; i < config.MAX_GLOBAL_CAT_COLUMN; i++) {
            array.push({
                active: -1,
                list: []
            })
        }

        if(angular.isDefined(item) && item != null) {
            var parent = item.parent;
            for (var i = item.Depth - 1; i >= 0; i--) {
                array[i].list = parent.nodes;
                array[i].active = array[i].list.indexOf(item);
                parent = parent.parent;
            }
        }
        else if (angular.isDefined(template)) {
            array[0].list = template;
        }
        return array;
    };

    /**
     * Search Depth Array for catId
     */
    service.findByCatId = function(catId, tmp) {
        if(angular.isArray(tmp)) {
            //Init
            var search = [];
            for (var t in tmp) {
                search.push(tmp[t]);
            }

            //Recursion
            while(search.length > 0) {
                var head = search.pop();
                if(head.CategoryId == catId)
                    return head;
                if(angular.isDefined(head.children)) {
                    for (var j in head.children) {
                        search.push(head.children[j]);
                    }
                }
            }
        }
        return null;
    };

    return service;
}];
