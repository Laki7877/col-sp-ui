var angular = require('angular');

module.exports = ['$scope', '$filter' ,'$window', 'util', 'config', 'Product', 'Collection','Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', '$rootScope', '$q', 'KnownException', 'NcAlert', '$CollectionAddListItem',
function ($scope, $filter,$window, util, config, Product, Collection, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair, $rootScope , $q, KnownException, NcAlert, $CollectionAddListItem) {
    'use strict';


    $window.onbeforeunload = function (e) {
        if (!$scope.addProductCollectionForm.$dirty) {
            //only warn when form is dirty
            return null;
        }
        var message = "Your changes will not be saved.",
        e = e || window.event;
        // For IE and Firefox
        if (e) {
            e.returnValue = message;
        }

        // For Safari
        return message;
    }; // end onbefore unload
//productAddListItem
    $scope.productAddListItem = [];
//for modal add item list
$scope.checkBoxCache = {};
$scope.productList = [];
$scope.productTotal = 0 ;
$scope.defaultProductModalParam ={
        filter: 'All',
        searchText: null,
        orderBy: 'UpdateDate',
        direction: 'desc',
        page: 0,
        pageSize: 5
    };

$scope.statusLookup = {};
 config.PRODUCT_STATUS.forEach(function(object){
       $scope.statusLookup[object.value] = object; 
    });
 $scope.totalPage = function (x) {
        return Math.ceil($scope.productTotal / $scope.defaultProductModalParam.pageSize);
    };
 $scope.asStatus = function (ab) {
        return $scope.statusLookup[ab];
    };   
$scope.nextPage = function (m) {
    if ($scope.defaultProductModalParam.page + m >= $scope.totalPage() ||
        $scope.defaultProductModalParam.page + m < 0)
        return;

    $scope.defaultProductModalParam.page += m;
};
$scope.setOrderBy = function (nextOrderBy) {
    if ($scope.defaultProductModalParam.orderBy == nextOrderBy) {
        $scope.defaultProductModalParam.direction = ($scope.defaultProductModalParam.direction == 'asc' ? 'desc' : 'asc');
    }
    $scope.defaultProductModalParam.orderBy = nextOrderBy;
}; 
$scope.setPageSize = function (p) {
    $scope.defaultProductModalParam.pageSize = p;
}
$scope.applySearch = function () {
    $scope.defaultProductModalParam.searchText = $scope.searchText;
};
$scope.reloadData = function () {        
       $scope.notReady = true;
            Product.getAll($scope.defaultProductModalParam).then(function (x) {
            $scope.productTotal = x.total;
            $scope.productList = x.data;
            $scope.notReady = false;
        });
    };

$scope.$watch('defaultProductModalParam', function () {
        $scope.reloadData();
        $scope.allChecked = false;
    }, true);

 $scope.checkAll = function(){
    // console.log("chk all");
    // console.log($scope.productList);
    // console.log($scope.productList[0]);
        var first = $scope.productList[0];
        var tval = !($scope.checkBoxCache[first.ProductId] || false);
        $scope.productList.forEach(function (d) {
            $scope.checkBoxCache[d.ProductId] = tval;
        });
    }

    $scope.checkBoxCount = function () {
        var m = [];
        Object.keys($scope.checkBoxCache).forEach(function (key) {
            if ($scope.checkBoxCache[key]) m.push($scope.checkBoxCache[key]);
        });
        
        var chkCount = 0;
        $scope.productList.forEach(function(p){
            chkCount += ($scope.checkBoxCache[p.ProductId] ? 1 : 0);
        });
        
        if(chkCount != $scope.productList.length){
            $scope.allChecked = false;
        }else{
            $scope.allChecked = true;
        }
        return m.length;
    }

// end modal item list

//begin open and confirm modal action
//AddToList
$scope.AddToList = function () {
        $scope.exporter = {
            progress: 10,
            title: 'Select Get 1 Item...'
        };
            $scope.reloadData();

        $("#add-product-cli").modal('show');
    };
    
    $scope.AddToListConfirm = function(){
        $("#add-product-cli").modal('hide');
      
        var arr = [];
        Object.keys($scope.checkBoxCache).forEach(function (m,index) {
            if (!$scope.checkBoxCache[m]) return;
            arr.push({
                ProductId: Number(m)
            });
            var tmpObj =$filter('filter')($scope.productList, {ProductId: Number(m) })[0];
            $scope.productAddListItem[index] = tmpObj;
        });
        if (arr.length == 0) return;
      
      // var  a = $filter('filter')($scope.productList, {ProductId: arr[0].ProductId })[0];      
      //   console.log("a");
      //   console.log(a);
    }
//end open and confirm modal action

 $scope.actions = {       
        remove: function (index,row) {
            console.log($scope.checkBoxCache);
            var uid= row.ProductId;
            delete $scope.checkBoxCache[uid] ;
             console.log($scope.checkBoxCache);
            $scope.productAddListItem.splice(index, 1);
        }
    };

    $scope.keywordValidConditions = {};
    $scope.variationOptionWarning = [[], []];
    $scope.onKeywordAdded = function (item, model) {

        $scope.keywordValidConditions = {};
        if (!item) return $scope.formData.Keywords.pop();

        if ($scope.formData.Keywords.length > 20) {
            $scope.keywordValidConditions['tagcount'] = true;
        }

        if (item.length > 30) {
            $scope.keywordValidConditions['taglength'] = true;
        }

        if (!item.match(/^[a-zA-Z0-9ก-ฮ\s\-]+$/)) {
            $scope.keywordValidConditions['pattern'] = true;
        }

        if (Object.keys($scope.keywordValidConditions).length > 0) {
            //if there is error, revert
            $scope.formData.Keywords.pop();
        }
    }

    $scope.onKeywordRemoved = function (item, model) {
        console.log($scope.formData.Keywords);
    }

   
   
    $scope.overview = {}

    $scope.formData = {
        Brand: { id: null, BrandNameEn: "Please select brand.." },
        MasterVariant: { DimensionUnit: "CM", WeightUnit: "G", StockType: "Stock" },
        ShippingMethod: "1",
        AttributeSet: {
            AttributeSetTagMaps: []
        },
        RelatedProducts: [],
        MasterImages: [],
        MasterImages360: [],
        VideoLinks: [],
        Variants: [],
        GlobalCategories: [null, null, null],
        LocalCategories: [null, null, null],
        SEO: { ProductBoostingWeight: 10000 },
        ControlFlags: [],
        Keywords: []
    };
  
    //TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
    $scope._attrEnTh = function (t) { return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
    $scope._isFreeTextInput = util.isFreeTextDataType;
    $scope._isListInput = util.isListDataType;

    //CK editor options
    $scope.ckOptions = config.CK_DEFAULT_OPTIONS;

    /*
     * Page can be in 3 states
     * --------------------------------
     *  success: OK stat
     *  failure: L2 validation error (client + server)
     *  invalid: L1 validation error (client)
     */
    $scope.pageState = {
        success: false,
        failure: false,
        invalid: false,
        loading: {
            state: true,
            message: 'Loading..'
        },
        load: function (msg) {
            $scope.pageState.loading.message = msg;
            $scope.pageState.loading.state = true;
        },
        reset: function () {
            $scope.pageState.success = false;
            $scope.pageState.failure = false;
            $scope.pageState.invalid = false;
            $scope.pageState.loading.state = false;
        }
    };

  
    /*
     *  Run clean data before any publishing
     *  which will try to reduce imperfection before
     *  serialization
     */
    var cleanData = function () {

    };

    $scope.preview = function () {
        return console.log($scope.formData);
        cleanData();
        var apiRequest = Product.serialize($scope.formData);
        console.log(JSON.stringify(apiRequest));
    };


    /*
     *  refresh functions
     *  for dropdown suggestions
     */

    $scope.refreshRelatedProducts = function (q) {
        return Product.getAll({
            searchText: q
        }).then(function (dataSet) {
            $scope.availableRelatedProducts = dataSet.data;
        });
    };

   

    $scope.$watch('formData.ExpireDate', function () {
        var form = $scope.addProductCollectionForm;
        if (form.ExpireDate)
        form.ExpireDate.$setValidity("min", true);
        if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
            if (!form.ExpireDate) return;
            form.ExpireDate.$setValidity("min", false);
            form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
        }
    });

    var manualValidate = function () {
        var mat = [];
        // if (!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == "") {
        //     mat.push("Missing Description (Thai)");
        // }

        // if (!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == "") {
        //     mat.push("Missing Description (English)");
        // }

        // if (!$scope.formData.Brand.BrandId) {
        //     mat.push("Missing Brand");
        // }

        return mat;
    };

    /*
     *  Publish (both Draft and WA)
     */
    $scope.publish = function (Status) {

        $scope.pageState.reset();
        $scope.pageState.load('Validating..');

        $scope.onPublishing = (Status == "4");
        //On click validation
        var validateMat = manualValidate();
        if (validateMat.length > 0 && Status == '4') {
            $scope.pageState.reset();
            $scope.pageState.failure = true;
            $scope.pageState.failure_message = validateMat[0];
            $window.location.hash = 'alert';
            $window.location.hash = 'alert-failure';
            return;
        }


        $scope.pageState.load('Publishing..');
        cleanData();
        console.log("Publishing with Status = ", Status);
        //Error Handling too Messi
        try {
            // var apiRequest = Product.serialize($scope.formData);            
            //Product.publish(apiRequest, Status).then(function (res) {
                //console.log($scope.formData);
                $scope.formData.CMSStatusId = Status
                $scope.formData.Status = true;
                $scope.formData.CMSTypeId = 1;
                $scope.formData.UpdateBy =1;
                $scope.formData.CreateBy =1;
                $scope.formData.Visibility = 1;
                $scope.formData.CreateIP ='203.146.156.34';
               
                var apiRequest =  Collection.serialize($scope.formData);  
                var tmpObjArr =[];
                var apiParameter ;
                if($scope.formData.CMSId != null && typeof $scope.formData.CMSId != "undefined"){
                    tmpObjArr.push(apiRequest);
                    apiParameter = tmpObjArr;
                }else{ apiParameter = apiRequest;}


                Collection.publish(apiParameter, Status).then(function (res) {
                $scope.pageState.reset();
                if (res.CMSId) {
                    $scope.overview = res;
                    $scope.pageState.success = true;
                    $scope.formData.CMSId = res.ProductId;
                    $scope.addProductCollectionForm.$setPristine(true)
                } else {
                    $scope.pageState.failure = true;
                    $scope.pageState.failure_message = res.message || res.Message;
                    $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
                    $window.location.hash = 'alert'
                    $window.location.hash = 'alert-failure'
                }
            }, function (er) {
                $scope.pageState.reset();
                $scope.pageState.failure = true;
                $scope.pageState.failure_message = er.Message || er.message;
                $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');

                $window.location.hash = 'alert' //Need to toggle hash otherwise it wont scroll
                $window.location.hash = 'alert-failure'
            });

        } catch (ex) {
            console.log("catch exception from publish process");
            $scope.pageState.reset();
            $scope.pageState.failure = true;
            $scope.pageState.failure_message = ex.message;
            $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
            $window.location.hash = 'alert'
            $window.location.hash = 'alert-failure'
            console.log('publish failure', ex);
            return;
        }
    };


    $scope.init = function (viewBag) {
        //TODO: Refactor, use better callback mechanism
        if (!angular.isObject(viewBag)) throw new KnownException("View bag is corrupted");

        var shopId = 1;
        var _editMode = ("CMSId" in viewBag)
        for (var page in tabPage) {
            tabPage[page].angular();
        }


        for (var page in tabPage) {
            tabPage[page].angular();
        }

        if (_editMode) {
                        var CMSId = viewBag.CMSId;
                        $scope.pageState.load('Loading Collection..');

                        Collection.getOne(CMSId)
                            .then(function (inverseFormData) {
                                $scope.overview = angular.copy(inverseFormData);
                              
                                $CollectionAddListItem.fill( $scope.pageState, $scope.dataSet, $scope.formData,  $scope.controlFlags,
                                     inverseFormData).then(function () {
                                        $scope.formData.CMSId = Number(CMSId);
                                        $scope.pageState.reset();
                                        console.log("$scope.formData");
                                        console.log($scope.formData);
                                    });
                            }, function (error) {
                                 console.log("function (error)");
                                throw new KnownException("Unable to fetch collection with id " + CMSId);
                            });

                    } 
                    // else if ('catId' in viewBag) {
                    //     var catId = Number(viewBag.catId);
                    //     $CollectionAddListItem.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs,
                    //         $scope.controlFlags).then(function () {
                    //             $scope.pageState.reset();
                             
                    //         });
                    // }  else {
                    //     throw new KnownException("Invalid mode, viewBag garbage"); }


    }//end init

    var tabPage = {};

}];
