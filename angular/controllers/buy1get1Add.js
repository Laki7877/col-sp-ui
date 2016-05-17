var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config','Product', 'Buy1Get1','Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', '$rootScope', '$q', 'KnownException', 'NcAlert', '$Buy1Get1Add',
function ($scope, $window, util, config,Product,  Buy1Get1, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair, $rootScope , $q, KnownException, NcAlert, $Buy1Get1Add) {
    'use strict';

    //TODO: use Poons' Alert class

    $window.onbeforeunload = function (e) {
        if (!$scope.addBuy1Get1Form.$dirty) {
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

//start buy 1 item select modal
$scope.BuyItemSelected = function () {
        $scope.exporter = {
            progress: 10,
            title: 'Select Buy 1 Item...'
        };
            $scope.reloadData();

        $("#modal-buy1item-selected").modal('show');
    };
    
    $scope.confirmBuy1ItemSelected = function(){
        $("#modal-buy1item-selected").modal('hide');
        var chb_product_buy_val=$("input[name='chb_product_buy']:checked").val();
        var jsonObjBuy = jQuery.parseJSON(chb_product_buy_val);
    
        $scope.formData.BuyItemSelStatus = true;
        $scope.formData.PIDBuy = jsonObjBuy.ProductId;
        $scope.formData.PNameBuy = jsonObjBuy.ProductNameEn;     
    }
//end buy 1 get item

//start get 1 item select modal
$scope.GetItemSelected = function () {
        $scope.exporter = {
            progress: 10,
            title: 'Select Get 1 Item...'
        };
            $scope.reloadData();

        $("#modal-get1item-selected").modal('show');
    };
    
    $scope.confirmGet1ItemSelected = function(){
        $("#modal-get1item-selected").modal('hide');
        var chb_product_get_val=$("input[name='chb_product_get']:checked").val();
        var jsonObjGet = jQuery.parseJSON(chb_product_get_val);
    
        $scope.formData.GetItemSelStatus = true;
        $scope.formData.PIDGet = jsonObjGet.ProductId;
        $scope.formData.PNameGet = jsonObjGet.ProductNameEn;
        // var arr = [];
        // Object.keys($scope.checkBoxCache).forEach(function (m) {
        //     if (!$scope.checkBoxCache[m]) return;
        //     arr.push({
        //         ProductId: Number(m)
        //     });
        // });
    }

//end get 1 get item
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
  
    $scope.onVariationOptionFreeTextAdded = function (item, model, jth) {
        $scope.variationOptionWarning[jth] = [];
        if (!item) return;
        if (item.length > 30) $scope.variationOptionWarning[jth].push("Variation option must contain 30 characters or less");
        if (!item.match(/^[a-zA-Z0-9\s]+$/)) $scope.variationOptionWarning[jth].push("Only letters and numbers allowed");

        var optlen1 = $scope.attributeOptions[0].options.length;
        var optlen2 = $scope.attributeOptions[1].options.length;
        if ((optlen1 == 0 ? 1 : optlen1) * (optlen2 == 0 ? 1 : optlen2) > MAX_VARIANT) {
            $scope.variationOptionWarning[jth].push("Maximum combination of variants (" + MAX_VARIANT + ") reached.");
        }

        if ($scope.variationOptionWarning[jth].length > 0) {
            $scope.attributeOptions[jth].options.pop();
        }
    }

    //Attribute Options to be filled via API
    $scope.availableAttributeSets = [];
    $scope.availableGlobalCategories = [];
    $scope.availableLocalCategories = [];
    $scope.availableBrands = [];
    $scope.availableSearchTags = [];
    $scope.availableRelatedProducts = [];
    $scope.availableStockTypes = ['Stock', 'Pre-Order'];
    $scope.availableVariantDisplayOption = [{ text: 'Show as group of variants', value: 'GROUP' }, { text: 'Show as individual product', value: 'INDIVIDUAL' }];

    $scope.overview = {}

    $scope.formData = {
        PIDBuy :"",
        PIDGet : "",
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
    //Variation Factor Indices are used as index
    //for ng-repeat in variation tab
    $scope.variationFactorIndices = {};
    $scope.variationFactorIndices.iterator = [0];
    $scope.variationFactorIndices.length = function () {
        return $scope.variationFactorIndices.iterator.length;
    }
    $scope.variationFactorIndices.popSecond = function () {
        $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
        $scope.attributeOptions[1].options = [];
    }
    $scope.variationFactorIndices.pushSecond = function () {
        $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
    }

    //Unmultiplied Variants (factor)
    $scope.attributeOptions = {
        0: {
            Attribute: false,
            options: []
        },
        1: {
            Attribute: false,
            options: []
        }
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
    //Modal State
    $scope.formData.BuyItemSelStatus = true;
    $scope.formData.GetItemSelStatus = true;
    // $scope.formData.PNameBuy = "";
    // $scope.formData.PNameGet = "";
    //TODO: Initialize non-formData variable
    $scope.enableProductVariations = "disable";

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
        var apiRequest = Buy1Get1.serialize($scope.formData);
        console.log(JSON.stringify(apiRequest));
    };

    $scope.$watch('formData.ExpireDate', function () {
        var form = $scope.addBuy1Get1Form;
            if (!form.ExpireDate) return;
            form.ExpireDate.$setValidity("min", true);
                
        if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
            if (!form.ExpireDate) return;
            form.ExpireDate.$setValidity("min", false);
            form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
        }
    });

    var manualValidate = function () {
        var mat = [];
         if (!$scope.formData.NameTH || $scope.formData.NameTH == "") {
            mat.push("Missing Thai Name");
        }
        if (!$scope.formData.NameEN || $scope.formData.NameEN == "") {
            mat.push("Missing English Name");
        }       
        if (!$scope.formData.PIDBuy || $scope.formData.PIDBuy == "") {
            mat.push("Please Select Buy Item");
        }
        if (!$scope.formData.PIDGet || $scope.formData.PIDGet == "") {
            mat.push("Please Select Get Item");
        }        
        return mat;
    };

    /*
     *  Publish (both Draft and WA)
     */
    $scope.publish = function (Status) {

        $scope.pageState.reset();
        $scope.pageState.load('Validating..');

        $scope.onPublishing = (Status == "4");
        console.log("befor validate");
        //On click validation
        var validateMat = manualValidate();
        if (validateMat.length > 0 ) {
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
                $scope.formData.CMSStatusFlowId = Status
                $scope.formData.Status = true;
                $scope.formData.UpdateBy =1;
                $scope.formData.CreateBy =1;
                $scope.formData.Visibility = 1;
                $scope.formData.CreateIP ='203.146.156.34';


                var apiRequest =  Buy1Get1.serialize($scope.formData);  
                var tmpObjArr =[];
                var apiParameter ;
                if($scope.formData.PromotionBuy1Get1ItemId != null && typeof $scope.formData.PromotionBuy1Get1ItemId != "undefined"){
                    tmpObjArr.push(apiRequest);
                    apiParameter = tmpObjArr;
                }else{ apiParameter = apiRequest;}


                Buy1Get1.publish(apiParameter, Status).then(function (res) {
                $scope.pageState.reset();
                if (res.PromotionBuy1Get1ItemId) {
                    $scope.overview = res;
                    $scope.pageState.success = true;
                    $scope.formData.PromotionBuy1Get1ItemId = res.PromotionBuy1Get1ItemId;
                    $scope.addBuy1Get1Form.$setPristine(true)
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
        var _editMode = ("PromotionBuy1Get1ItemId" in viewBag)
      

        if (_editMode) {
                        var PromotionBuy1Get1ItemId = viewBag.PromotionBuy1Get1ItemId;
                        $scope.pageState.load('Loading Buy 1 Get 1 ..');

                        Buy1Get1.getOne(PromotionBuy1Get1ItemId)
                            .then(function (inverseFormData) {
                                $scope.overview = angular.copy(inverseFormData);
                              
                                $Buy1Get1Add.fill( $scope.pageState, $scope.dataSet, $scope.formData,  $scope.controlFlags,
                                    $scope.variationFactorIndices, inverseFormData).then(function () {
                                        $scope.formData.PromotionBuy1Get1ItemId = Number(PromotionBuy1Get1ItemId);                                      
                                        $scope.pageState.reset();
                                      
                                    });
                            }, function (error) {
                                 console.log("function (error)");
                                throw new KnownException("Unable to fetch buLy 1 get 1 with id " + PromotionBuy1Get1ItemId);
                            });

                    } else if ('catId' in viewBag) {
                        // var catId = Number(viewBag.catId);
                        // $Buy1Get1Add.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs,
                        //     $scope.controlFlags, $scope.variationFactorIndices).then(function () {
                        //         $scope.pageState.reset();
                             
                        //     });
                    } else {
                        throw new KnownException("Invalid mode, viewBag garbage");
        }


    }//end init

    var tabPage = {};

   
}];
