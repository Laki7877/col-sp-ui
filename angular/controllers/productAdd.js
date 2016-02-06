var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', '$rootScope',
function ($scope, $window, util, config, Product, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair, $rootScope) {
    'use strict';

    //TODO: use Poons' Alert class
    
    var MAX_FILESIZE = 5000000; //5MB
    var QUEUE_LIMIT = 20;
    var QUEUE_LIMIT_360 = 60;
    var MAX_VARIANT = 100;

    $window.onbeforeunload = function (e)
    {
        if (!$scope.addProductForm.$dirty) {
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


    var onImageUploadFail = function(item, filter){
        alert("File Size must not exceed 5 MB");
    }

    var onQueueLimit = function(){
        //TODO: Poon? Wtf is queue limit handler
    }


    $scope.keywordValidConditions = {};
    $scope.variationOptionWarning = [[], []];
    $scope.onKeywordAdded = function(item, model){

    	$scope.keywordValidConditions = {};
		if(!item) return $scope.formData.Keywords.pop();

		if($scope.formData.Keywords.length > 20){
			$scope.keywordValidConditions['tagcount'] = true;
		}

		if(item.length > 30){
			$scope.keywordValidConditions['taglength'] = true;
		}

		if(!item.match(/^[a-zA-Z0-9ก-ฮ\s\-]+$/)){
			$scope.keywordValidConditions['pattern'] = true;
		}

		if(Object.keys($scope.keywordValidConditions).length > 0){
			//if there is error, revert
			$scope.formData.Keywords.pop();
		}
    }

    $scope.onKeywordRemoved = function(item, model){
	console.log($scope.formData.Keywords);
    }

    var StatusLookup = {
	    'DF' : {
		    Class: 'fa-circle-o',
		    Text: 'Draft',
		    Color: 'color-grey'
	    },
	    'WA' : {
		    Class: 'fa-clock-o',
		    Text: 'Wait for Approval',
		    Color: 'color-yellow'
	    }

    }

    $scope.asStatus = function(ab){
	    return StatusLookup[ab];
    };

    $scope.onVariationOptionFreeTextAdded = function(item, model, jth){
	    $scope.variationOptionWarning[jth] = [];
	    if(!item) return;
	    if(item.length > 30) $scope.variationOptionWarning[jth].push("Variation option must contain 30 characters or less");
	    if(!item.match(/^[a-zA-Z0-9\s]+$/)) $scope.variationOptionWarning[jth].push("Only english letters and numbers allowed");

	    var optlen1 = $scope.attributeOptions[0].options.length;
	    var optlen2 = $scope.attributeOptions[1].options.length;
	    if((optlen1 == 0? 1: optlen1) * (optlen2 == 0 ? 1: optlen2) > MAX_VARIANT){
		    $scope.variationOptionWarning[jth].push("Maximum combination of variants (" + MAX_VARIANT + ") reached.");
	    }

	    if($scope.variationOptionWarning[jth].length > 0){
		    $scope.attributeOptions[jth].options.pop();
	    }

    }


    var watchVariantChanges = function ()
    {

	    $scope.$watch('attributeOptions', function () {

		    var vHashSet = {};
		    var prevVariants = angular.copy($scope.formData.Variants);
		    prevVariants.forEach(function (elem, index) {
			    vHashSet[elem.text] = prevVariants[index];
		    });
		    //Unset
		    prevVariants = undefined;

		    $scope.formData.Variants = [];

		    var expand = function (A, B)
	    {

		    if (A['AttributeValue']) {
			    A = A.AttributeValue.AttributeValueEn;
		    }

		    var BId = null;

		    if (angular.isDefined(B)) {
			    BId = $scope.attributeOptions[1].Attribute.AttributeId;
			    if (B['AttributeValue']) {
				    B = B.AttributeValue.AttributeValueEn;
			    }
		    } else {
			    B = ''
				    BId = null;
		    }

		    var kpair = new VariantPair({
			    AttributeId: $scope.attributeOptions[0].Attribute.AttributeId,
			ValueEn: A
		    }, {
			    AttributeId: BId,
			ValueEn: B
		    });

		    //Initialize
		    kpair.ProductNameEn = $scope.formData.MasterVariant.ProductNameEn;
		    kpair.ProductNameTh = $scope.formData.MasterVariant.ProductNameTh;
		    kpair.Display = $scope.availableVariantDisplayOption[0];
		    kpair.Visibility = true;

		    if (kpair.text in vHashSet) {
			    //Replace with value from vHashSet
			    kpair = vHashSet[kpair.text];
		    }

		    //Only push new variant if don't exist
		    $scope.formData.Variants.push(kpair);

	    }


	    console.log("Recalculating Factors", $scope.attributeOptions);
	    //Multiply out unmultiplied options
	    if ($scope.attributeOptions && Object.keys($scope.attributeOptions).length > 0) {
		    for (var aKey in $scope.attributeOptions[0].options) {
			    var A = $scope.attributeOptions[0].options[aKey];

			    if (angular.isDefined($scope.attributeOptions[1]['options']) && $scope.attributeOptions[1].options.length == 0) {
				    console.log("expanding A");
				    expand(A);
			    }

			    for (var bKey in $scope.attributeOptions[1].options) {
				    var B = $scope.attributeOptions[1].options[bKey];
				    console.log("Expanding A,B");
				    expand(A, B);
			    }
		    }
	    }

	    $scope.formData.DefaultVariant = $scope.formData.Variants[0];
	    }, true); //end of $watch

    } //end of watch func

    //Attribute Options to be filled via API
    $scope.availableAttributeSets = [];
    $scope.availableGlobalCategories = [];
    $scope.availableLocalCategories = [];
    $scope.availableBrands = [];
    $scope.availableSearchTags = [];
    $scope.availableRelatedProducts = [];
    $scope.availableStockTypes = ['Stock', 'Pre-Order'];
    $scope.availableVariantDisplayOption = [{ text: 'Show as group of variants', value: 'GROUP' }, { text: 'Show as individual product',  value: 'INDIVIDUAL' }];

    $scope.overview = {}

    $scope.formData = {
	    Brand: { id: null, BrandNameEn: "Search for Brand Name.." },
	    MasterVariant: { DimensionUnit: "MM", WeightUnit: "G", StockType: "Stock" },
	    ShippingMethod: "1",
	    AttributeSet: {
		    AttributeSetTagMaps : []
	    },
	    RelatedProducts: [],
	    MasterImages: [],
	    MasterImages360: [],
	    VideoLinks: [],
	    Variants: [],
	    GlobalCategories: [null, null, null],
	    LocalCategories: [null, null, null],
	    SEO: { ProductBoostingWeight: 5000 },
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
	    load: function(msg){
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

    $scope.refreshBrands = function (q) {
        if(q == "" || !q || q == null) return;
	    Brand.getAll({
		    pageSize: 10,
		    searchText: q
	    }).then(function (dataSet) {
		    $scope.availableBrands = dataSet.data;
	    });
    };



    $scope.$watch('formData.MasterVariant.SalePrice', function(){
	    var form = $scope.addProductForm;
	    form.MasterVariant_SalePrice.$setValidity("min", true);
	    if(!form.MasterVariant_SalePrice) return;
	    if($scope.formData.MasterVariant.SalePrice == "") return;

	    if(Number($scope.formData.MasterVariant.SalePrice) >= Number($scope.formData.MasterVariant.OriginalPrice) ){
		    form.MasterVariant_SalePrice.$setValidity("min", false);
		    form.MasterVariant_SalePrice.$error["min"] = "Sale Price must not exceed Original Price";
	    }
    });

    $scope.$watch('formData.ExpireDate', function(){
	    var form = $scope.addProductForm;
	    form.ExpireDate.$setValidity("min", true);
	    if($scope.formData.ExpireDate < $scope.formData.EffectiveDate){
		    if(!form.ExpireDate) return;
		    form.ExpireDate.$setValidity("min", false);
		    form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
	    }
    });

    var manualValidate = function(){
	    var mat = [];
	    if(!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == ""){
		    mat.push("Missing Description (Thai)");
	    }

	    if(!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == ""){
		    mat.push("Missing Description (English)");
	    }

	    if(!$scope.formData.Brand.BrandId){
		    mat.push("Missing Brand");
	    }

	    return mat;
    };

    /*
     *  Publish (both Draft and WA)
     */
    $scope.publish = function (Status) {

	    $scope.pageState.reset();
	    $scope.pageState.load('Validating..');

	    $scope.onPublishing = (Status == "WA");

	    //On click validation
	    var validateMat = manualValidate();
	    if(validateMat.length > 0 && Status == 'WA'){
		    $scope.pageState.reset();
		    $scope.pageState.failure = true;
		    $scope.pageState.failure_message = validateMat[0];
		    $window.location.hash = 'alert';
		    $window.location.hash = 'alert-failure';
		    return;
	    }

	    //Basic validation
	    if ($scope.addProductForm.$invalid) {

		    $scope.pageState.reset();
		    //scroll to top and show alert div
		    $window.location.hash = 'alert';
		    $window.location.hash = 'alert-validation';
		    $scope.pageState.invalid = true;
		    return;
	    }

	    $scope.pageState.load('Publishing..');
	    cleanData();
	    console.log("Publishing with Status = ", Status);
	    //Error Handling too Messi
	    try {
		    var apiRequest = Product.serialize($scope.formData);
		    Product.publish(apiRequest, Status).then(function (res) {
			    $scope.pageState.reset();
			    if (res.ProductId) {
				    $scope.overview = res;
				    $scope.pageState.success = true;
				    $scope.formData.ProductId = res.ProductId;
				    $scope.formData.MasterVariant.Pid = res.MasterVariant.Pid;
				    $scope.addProductForm.$setPristine(true)
			    }else{
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


    $scope.uploader = ImageService.getUploader('/ProductImages', {
	    queueLimit: QUEUE_LIMIT
    });

    $scope.uploader.filters.push({
	    'name': 'enforceMaxFileSize',
	    'fn': function(item){
		    return item.size <= MAX_FILESIZE;
	    }
    });

    $scope.uploader360 = ImageService.getUploader('/ProductImages', {
	    queueLimit: QUEUE_LIMIT_360
    });


    $scope.init = function (viewBag) {
	    //TODO: Refactor, use better callback mechanism

	    var shopId = 1;

	    for (var page in tabPage) {
		    tabPage[page].angular();
	    }

	    var angularReady = function () {
		    $scope.pageState.reset();
	    };

	    var loadFormData = function (ivFormData, FullAttributeSet) {

		    $scope.pageState.load('Loading product data..');

		    if (!('VideoLinks' in ivFormData)) {
			    ivFormData['VideoLinks'] = [];
		    }
		    var inverseResult = Product.deserialize(ivFormData,
				    FullAttributeSet,
				    $scope.pageState.loading);

		    $scope.formData = inverseResult.formData;
		    console.log("After Inverse Transformation", $scope.formData, inverseResult.attributeOptions);

		    if ($scope.formData.Variants.length > 0) {
			    $scope.enableProductVariations = "enable";
		    }

		    $scope.attributeOptions = inverseResult.attributeOptions || $scope.attributeOptions;

		    if ($scope.attributeOptions[1].options.length > 0) $scope.variationFactorIndices.pushSecond();


		    //Initialize Uploader
		    ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onQueueLimit, onImageUploadFail);
		    ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onQueueLimit, onImageUploadFail);

	    };

	    var catReady = function (catId, ivFormData, callback) {
		    //Dependecy chain
		    // catId

		    $scope.pageState.load('Downloading Attribute Sets..');

		    AttributeSet.getByCategory(catId).then(function (data) {

			    //remove complex structure we dont need
			    $scope.availableAttributeSets = data.map(function (aset) {

				    aset.AttributeSetTagMaps = aset.AttributeSetTagMaps.map(function (asti) {
					    return asti.Tag.TagName;
				    });

				    aset.AttributeSetMaps = aset.AttributeSetMaps.map(function (asetmapi) {
					    asetmapi.Attribute.AttributeValueMaps = asetmapi.Attribute.AttributeValueMaps.map(function (value) {
						    return value.AttributeValue.AttributeValueEn;
					    });

					    return asetmapi;
				    });

				    return aset;
			    });

			    //Load Attribute Set (edit mode only, in add mode AttributeSet is not set)
			    if (ivFormData.AttributeSet && ivFormData.AttributeSet.AttributeSetId) {

				    $scope.pageState.load('Indexing AttributeSet');
				    var idx = $scope.availableAttributeSets.map(function (o) {
					    return o.AttributeSetId
				    }).indexOf(ivFormData.AttributeSet.AttributeSetId);

				    $scope.formData.AttributeSet = $scope.availableAttributeSets[idx];
			    }

			    if (ivFormData.ProductId) {
				    loadFormData(ivFormData, $scope.formData.AttributeSet);
			    }

			    $scope.pageState.load('Downloading Category Tree..');
			    //Load Global Cat
			    GlobalCategory.getAll().then(function (data) {

				    $scope.availableGlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
				    $scope.formData.GlobalCategories[0] = Category.findByCatId(catId, $scope.availableGlobalCategories);
				    $scope.globalCategoryBreadcrumb = Category.createCatStringById(catId, $scope.availableGlobalCategories);
				    callback();
			    });


			    watchVariantChanges();
		    });
	    };

	    if ("productId" in viewBag) {
		    //EDIT MODE

		    var productId = viewBag.productId;
		    $scope.pageState.load('Loading Basis..');
		    Product.getOne(productId).then(function (ivFormData) {
			    var gcat = ivFormData.GlobalCategory;
			    $scope.overview =  angular.copy(ivFormData); //snapshot
			    catReady(gcat, ivFormData, function () {
				    $scope.formData.ProductId = Number(productId);
				    angularReady();
			    });

		    }, function () {
			    $window.onbeforeunload = function () { };
			    $window.location.href = "/products";
		    });
	    }

	    if ("catId" in viewBag) {
		    //ADD MODE
		    $scope.pageState.reset();
		    catReady(viewBag.catId, {}, angularReady);
		    watchVariantChanges();
	    }

	    //Load Local Cat
	    Shop.getLocalCategories(shopId).then(function (data) {
		    $scope.availableLocalCategories = Category.transformNestedSetToUITree(data);
	    });


    }

    var tabPage = {};

    tabPage.images = {
	    angular: function ()
	    {


		    //Assign uploader images
		    ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onQueueLimit, onImageUploadFail);
		    ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onQueueLimit, onImageUploadFail);

		    /**
		     * IMAGE THUMBNAIL EVENTS
		     */
		    $scope.$on('left', function (evt, item, array, index) {
			    var to = index - 1;
			    if (to < 0) to = array.length - 1;

			    var tmp = array[to];
			    array[to] = item;
			    array[index] = tmp;
		    });
		    $scope.$on('right', function (evt, item, array, index) {
			    var to = index + 1;
			    if (to >= array.length) to = 0;

			    var tmp = array[to];
			    array[to] = item;
			    array[index] = tmp;
		    });
		    $scope.$on('delete', function (evt, item, array, index) {
			    array.splice(index, 1);
		    });
		    $scope.$on('zoom', function (evt, item, array, index) {
			    //Should use angular way, but ok whatever
			    $('#product-image-zoom img').attr('src', item.url);
			    $('#product-image-zoom').modal('show');
		    });
	    }
    };

    tabPage.category = {
	    angular: function ()
	    {
		    //For viewing only
		    $scope.viewCategoryColumns = [];
		    $scope.viewCategorySelected = null;
		    $scope.viewCategoryIndex = 0;
		    $scope.selectCategory = angular.noop;

		    //Events
		    $scope.$on('openGlobalCat', function (evt, item, indx) {
			    console.log('openGloCat', item, $scope.availableGlobalCategories);
			    $scope.viewCategoryColumns = Category.createColumns(item, $scope.availableGlobalCategories);
			    $scope.viewCategorySelected = item;
			    $scope.viewCategoryIndex = indx;
			    $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function (selectedItem) {
				    $scope.viewCategorySelected = selectedItem;
			    });
		    });
		    $scope.$on('deleteGlobalCat', function (evt, indx) {
			    $scope.formData.GlobalCategories[indx] = null;
		    });
		    $scope.$on('selectGlobalCat', function (evt, row, indx, parentIndx) {
			    $scope.selectCategory(row, indx, parentIndx);
		    });
		    $scope.$on('saveGlobalCat', function (evt) {
			    $scope.formData.GlobalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
		    });

		    //Events
		    $scope.$on('openLocalCat', function (evt, item, indx) {
			    console.log(item, $scope.availableLocalCategories);
			    $scope.viewCategoryColumns = Category.createColumns(item, $scope.availableLocalCategories);
			    $scope.viewCategorySelected = item;
			    $scope.viewCategoryIndex = indx;
			    $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function (selectedItem) {
				    $scope.viewCategorySelected = selectedItem;
			    });
		    });
		    $scope.$on('deleteLocalCat', function (evt, indx) {
			    $scope.formData.LocalCategories[indx] = null;
		    });
		    $scope.$on('selectLocalCat', function (evt, row, indx, parentIndx) {
			    $scope.selectCategory(row, indx, parentIndx);
		    });
		    $scope.$on('saveLocalCat', function (evt) {
			    $scope.formData.LocalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
		    });
	    }
    }

    tabPage.variation = {

	    angular: function ()
	    {
		    /**
		     * This part handles when user click on More Detail and open pair form
		     */

		    $scope.uploaderModal = ImageService.getUploader('/ProductImages', {
			    queueLimit: QUEUE_LIMIT
		    });

		    $scope.uploaderModal.filters.push({
			    'name': 'enforceMaxFileSize',
			    'fn': function(item){
				    return item.size <= MAX_FILESIZE;
			    }
		    });

		    $scope.$on('openPairModal', function (evt, pair, array, index) {
			    //Define if not defined
			    if (angular.isUndefined(pair.Images)) {
				    pair.Images = [];
			    }
			    if (angular.isUndefined(pair.queue)) {
				    pair.queue = [];
			    }
			    //Modal target (for viewing pair)
			    $scope.pairModal = angular.copy(pair);
			    $scope.pairIndex = index;
			    $scope.uploaderModal.queue = $scope.pairModal.queue;
			    ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images, onQueueLimit, onImageUploadFail);
		    });
		    $scope.$on('savePairModal', function (evt) {
			    $scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
		    });
	    }
    };




}];
