module.exports = [function() {
  
var search = function(catId, tmp) {
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
            if(angular.isDefined(head.nodes)) {
                for (var j in head.nodes) {
                    search.push(head.nodes[j]);
                }
            }
        }
    }
    return null;
}

var fullyContain = function(arr, removes) {
    var result = true;
    for (var i = 0; i < removes.length; i++) {
        result = result && (arr.findIndex(function(elem) { return elem.CategoryId == removes[i].CategoryId}) != -1);
    };
    return false;
}
return function(arr, other, include) {

    if(include == null || other == null || other.length == 0) {
        return arr;
    }
    var removes = [];
/*
    //Get all removing leaf
    for (var i = 0; i < Things.length; i++) {
        Things[i]
    };

    var i = 0;
    
    //Get all removing parents and grandparents etc.
    while(i < removes.length) {
        var elem = removes[i];
        if(angular.isDefined(elem.parent)) {
            var e = elem.parent;
            while(angular.isDefined(e)) {
                if(fullyContain(e.nodes, removes)) {
                    removes.push(e);
                }
            }
        }
        i++;
    }

    //Remove all from parr
    for (var i = 0; i < removes.length; i++) {
        parr.splice(parr.indexOf(removes[i]),1);
    };
*/
    return arr;
  }
}];