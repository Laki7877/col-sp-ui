module.exports = function ($scope, $controller, CMSMasterService, ImageService, NcAlert, common, config, $uibModal, $timeout) {
    'ngInject';

    $scope.alert            = new NcAlert();
    $scope.formData         = {};
    $scope.products         = [];
    $scope.product          = {};
    $scope.featureProducts  = [];
    $scope.CategoryList     = [];

    $scope.Schedule = {
        EffectiveDate: null,
        ExpiryDate: null,
        //CategoryList: []
    };

    $scope.bannerUploader = ImageService.getUploaderFn('/CMS/CMSImage', {
        data: { Type: 'Banner' }
    });
    $scope.bannerOptions = {
        validateDimensionMin: [1920, 1080],
        validateDimensionMax: [1920, 1080]
    };

    $scope.formData         = CMSMasterService.generate();
    
    $scope.uploadBannerFail = function (e, response) {
        // if (e == 'onmaxsize') {
        //     $scope.alert.error('Maximum number of banner reached. Please remove previous banner before adding a new one');
        // }
        // else {
        //     $scope.alert.error(common.getError(response.data));
        // }
        debugger;
        if(e == 'onmaxsize') {
            $scope.alert.error('Cannot exceed 8 images');
        }
        else if(e == 'ondimension') {
            $scope.alert.error('Image must be 1920x1080 pixels');
        }
        else if(e == 'onfilesize') {
            $scope.alert.error('Each image file size must not exceed 5MB')
        }
        else {
            $scope.alert.error(common.getError(response.data));
        }
    };

    var sortableEle;

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    }
    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

         $scope.CategoryList.splice(end, 0,
             $scope.CategoryList.splice(start, 1)[0]);

        $scope.$apply();

        $timeout(function () {
            updateSequence();
        }, 200);

    }

    sortableEle = $('#sortable').sortable({
        start: $scope.dragStart,
        update: $scope.dragEnd
    });

    $scope.moveUp = function (start, end) {

        // swap object
         $scope.CategoryList.splice(end, 0,
            $scope.CategoryList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
         $scope.CategoryList.splice(end, 0,
            $scope.CategoryList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach( $scope.CategoryList, function (item) {
            seq++;
            item.Sequence = seq;
        });
    }

    $scope.selectOptionText = '- Choose Action -';
    $scope.selectOption = function (param) {
        $scope.selectOptionText = param;
    };

    // check all item
    $scope.checkAll = function (isChecked) {

        $scope.isCheckedAll != isChecked;

        if (!isChecked) {
            angular.forEach( $scope.CategoryList, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach( $scope.CategoryList, function (item) {
                item.IsChecked = true;
            });
        }

        $scope.sumCategorySelected();
    };

    // check once item
    $scope.checkOnce = function (item, isChecked) {

        if (!isChecked) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }

        $scope.sumCategorySelected();
    };

    $scope.sumCategorySelected = function () {

        var sum = 0;

        angular.forEach( $scope.CategoryList, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };

    $('#add_cms_master_body ul.nav li').click(function () {

        var index = $('#add_cms_master_body ul.nav li').index(this);

        if (index != 1) {
            $('#collections').hide();
        }
        else {
            $('#collections').show();
        }
    });

    $scope.typeChanged = function (type) {

        if (type == 'ST') {
            $('#collections').hide();
            $('#add_cms_master_body ul.nav li:nth-child(2)').hide();
            $scope.formData.CMSMasterType = 'ST';
        }
        else {
            $('#add_cms_master_body ul.nav li:nth-child(2)').show();
            $scope.formData.CMSMasterType = 'CT';
        }
    };

    $scope.$watch('formData.CMSMasterURLKey', function (newVal, oldVal) {
        if (newVal === undefined)
            return;

        $scope.formData.CMSMasterLink = 'http://www.thecentral.com/collections/' + newVal;
    });

    $scope.copyFieldValue = function(e, id) {
        var field = document.getElementById(id)
        field.focus()
        field.setSelectionRange(0, field.value.length)
        var copySuccess = copySelectionText()
        if (copySuccess) {
            showTooltip(e)
        }
    }

    function copySelectionText() {
        var copysuccess;
        try {
            copysuccess = document.execCommand("copy");
        } catch (e) {
            copysuccess = false
        }
        return copysuccess
    }

    var tooltip, // global variables oh my! Refactor when deploying!
	hidetooltiptimer

    function createTooltip() { // call this function ONCE at the end of page to create tool tip object
        tooltip = document.createElement('div')
        tooltip.style.cssText =
            'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
            + 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
            + 'opacity:0;transition:opacity 0.3s'
        tooltip.innerHTML = 'Copied!'
        document.body.appendChild(tooltip)
    }

    function showTooltip(e) {
        var evt = e || event
        clearTimeout(hidetooltiptimer)
        tooltip.style.left = evt.pageX - 10 + 'px'
        tooltip.style.top = evt.pageY + 15 + 'px'
        tooltip.style.opacity = 1
        hidetooltiptimer = setTimeout(function () {
            tooltip.style.opacity = 0
        }, 500)
    }

    createTooltip();


    // add category to collection
    $scope.addCategoryItem = function () {

        $uibModal.open({
            templateUrl: 'templates/admin-cms-master-add-item.html',
            size: 'lg',
            controller: function ($scope, $uibModalInstance) {

                $scope.categories = [];

                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.message = 'Empty list.';

                // Search
                $scope.search = function (searchText) {

                    $scope.loading = true;
                    $scope.isEmpty = false;

                    var params = {
                        SearchText: $scope.searchText
                    };

                    // search product
                    CMSMasterService.searchCMSCategory(params)
                    .then(function (data) {
                        console.log(data)
                        $scope.categories = data;
                        $scope.isEmpty = false;
                        $scope.loading = false;
                        $scope.message = '';
                    },
                    function (error) {
                        $scope.categories = [];
                        $scope.isEmpty = true;
                        $scope.loading = false;
                        $scope.message = 'Not Found CMS Category';
                    });

                };

                $scope.ok = function () {

                    var itemSelected = [];

                    angular.forEach($scope.categories, function (item) {
                        if (item.IsChecked) {
                            itemSelected.push(item);
                        }
                    });

                    $uibModalInstance.close(itemSelected);
                };

                // check all item
                $scope.checkAll = function (isChecked) {

                    $scope.isCheckedAll != isChecked;

                    if (!isChecked) {
                        angular.forEach($scope.categories, function (item) {
                            item.IsChecked = false;
                        });
                    }
                    else {
                        angular.forEach($scope.categories, function (item) {
                            item.IsChecked = true;
                        });
                    }

                    $scope.sumCategorySelected();
                };

                // check once item
                $scope.checkOnce = function (item, isChecked) {

                    if (!isChecked) {
                        item.IsChecked = false;
                    }
                    else {
                        item.IsChecked = true;
                    }

                    $scope.sumCategorySelected();
                };

                $scope.sumCategorySelected = function () {

                    var sum = 0;

                    angular.forEach($scope.categories, function (item) {
                        if (item.IsChecked) {
                            sum++;
                        }
                    });

                    return sum;
                };
            }
        })
        .result.then(function (result) {

            if ( $scope.CategoryList === undefined) {
                 $scope.CategoryList = [];
            }

            if ($scope.formData.ScheduleList === undefined) {
                $scope.formData.ScheduleList = [];
            }

            angular.forEach(result, function (category) {
                if (!isDuplicateCategory(category.CMSCategoryId)) {
                    category.Sequence = getNewCategorySequence();
                     $scope.CategoryList.push(category);
                }
            })

        });
    };

    // check product duplicate before add to list
    function isDuplicateCategory(cId) {
        var isDuplicate = false;
        angular.forEach( $scope.CategoryList, function (category) {
            if (category.CMSCategoryId == cId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen category seq
    function getNewCategorySequence() {
        return  $scope.CategoryList.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
         $scope.CategoryList.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i =  $scope.CategoryList.length - 1; i >= 0; i--) {
            if ( $scope.CategoryList[i].IsChecked) {
                 $scope.CategoryList.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return  $scope.CategoryList === undefined ? 0 :  $scope.CategoryList.length;
    };

    // load product
    CMSMasterService.searchProduct({ SearchBy: 'ProductName' })
    .then(function (data) {
        console.log(data)
        $scope.products = data;
    });

    // search product
    $('#form-master :input[type=text]').keyup(function () {

        var val = $(this).val();
        console.log(val)
        var param = {
            SearchText: val,
            CMSCategoryIds: getCMSCategoryIds($scope.CategoryList)
        };

        CMSMasterService.searchProduct(param)
        .then(function (data) {
            $scope.products = data;
        });
    });

    
    function getCMSCategoryIds(categories) {
        var ids = [];
        angular.forEach(categories, function (c) {
            ids.push(c.CMSCategoryId);
        });
        return ids;
    }
        
    // when select product
    $scope.$watch('product.selected', function (newValue, oldValue) {
        if (newValue === undefined || newValue == oldValue)
            return;

        console.log(newValue)
        angular.forEach(newValue, function(item){
            var featureProduct = {
                ProductId: item.Pid,
                CMSMasterId: $scope.formData.CMSMasterId
            };

            if (!isDuplicationPid(item.Pid)) {
                $scope.featureProducts.push(featureProduct);
            }
        });
        
    });

    function isDuplicationPid(pid) {
        var isDuplication = false;
        angular.forEach($scope.featureProducts, function (item) {
            if (item.ProductId === pid) {
                isDuplication = true;
            }
        });
        return isDuplication;
    }

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/cms/master',
            service: CMSMasterService,
            item: 'CMS Master',
            order: 'UpdateDate',
            id: 'CMSMasterId',
            init: function (scope) {

            },
            onLoad: function (scope, load) {
                
                $scope.Schedule             = scope.formData.ScheduleList[0];
                $scope.featureProducts      = scope.formData.FeatureProductList;
                $scope.CategoryList         = scope.formData.CategoryList;
                setProducts(getProductIds($scope.featureProducts));


                if (scope.formData.CMSMasterType == 'ST') {
                    $('#collections').hide();
                    $('#add_cms_master_body ul.nav li:nth-child(2)').hide();
                }
                else {
                    $('#add_cms_master_body ul.nav li:nth-child(2)').show();
                }

                $scope.product = {};

                function setProducts(params) {
                    CMSMasterService.searchProduct({ ProductIds: params })
                    .then(function (data) {
                        console.log(data)
                        $scope.products = data;
                        $scope.product.selected = data;
                    });
                }

                function getProductIds(featureProducts) {
                    var ids = [];
                    angular.forEach(featureProducts, function (p) {
                        ids.push(p.ProductId);
                    });
                    return ids;
                }

            },
            onSave: function (scope) {
                if ($scope.formData.ScheduleList === undefined)
                    $scope.formData.ScheduleList = [];

                if ($scope.formData.FeatureProductList === undefined || $scope.formData.FeatureProductList == null)
                    $scope.formData.FeatureProductList = [];

                if ($scope.formData.CategoryList === undefined || $scope.formData.CategoryList == null)
                    $scope.formData.CategoryList = [];

                $scope.formData.FeatureProductList = $scope.featureProducts;
                $scope.formData.ScheduleList.push($scope.Schedule);
                $scope.formData.CategoryList = $scope.CategoryList;
            }
        }
    });
};
