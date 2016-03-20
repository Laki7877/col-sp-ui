module.exports = function (storage, config, common, $window, $rootScope, $interpolate, KnownException, $uibModal) {
    'ngInject';
    'use strict';
    var service = {};

    service.variant = {};

    service.variant.toString = function (a, b) {
        var left = null;
        var right = null;
        left = (a.ValueEn || a.AttributeValueEn || a.AttributeValues.length > 0 && a.AttributeValues[0].AttributeValueEn || '');
        if(b == null){
          right = '';
        }else{
          right = (b.ValueEn || b.AttributeValueEn || b.AttributeValues.length > 0 && b.AttributeValues[0].AttributeValueEn || '');
        }

        return left + (right ? ", " + right : "");
    };

    service.uniqueSet = function (a, prop) {

        return _.uniqWith(a, function(x,y){
            if(x == y) return true;
            if(prop && _.get(x, prop) && _.get(y, prop)){
                return _.get(x, prop) == _.get(y, prop);
            }
            return false;
        });
    };

    service.nullOrUndefined = function (a) {
        return angular.isUndefined(a) || a === null;
    };

    /**
     * Function to check if any user is currently logged in
     */
    service.isLoggedIn = function () {
        var profile = storage.getCurrentUserProfile();
        var sessionToken = storage.getSessionToken();
        return !!(profile && sessionToken);
    };

    var DataTypeDropDown = {};
    if (!('DROPDOWN' in config)) throw new KnownException("Config is malformed. Expect 'DROPDOWN'");
    if (!('DATA_TYPE_DROPDOWN' in config.DROPDOWN)) throw new KnownException("Config is malformed. Expect 'DROPDOWN.DATA_TYPE_DROPDOWN'");
    config.DROPDOWN.DATA_TYPE_DROPDOWN.forEach(function (dt) {
        DataTypeDropDown[dt.value] = dt.name;
    });


    service.isFreeTextDataType = function (dataType) {
        if (!('ST' in DataTypeDropDown)) throw new KnownException("FreeText in no longer 'ST' in config");
        return (dataType == "ST");
    };

    service.isListDataType = function (dataType) {
        if (!('LT' in DataTypeDropDown)) throw new KnownException("List in no longer 'LT' in config");
        return (dataType == "LT");
    };

    service.isHtmlDataType = function (dataType) {
        if (!('HB' in DataTypeDropDown)) throw new KnownException("HTML Box in no longer 'HB' in config");
        return (dataType == 'HB');
    }

    service.isCheckboxDataType = function (dataType) {
        if (!('CB' in DataTypeDropDown)) throw new KnownException("Checkbox in no longer 'CB' in config");
        return (dataType == 'CB');
    }


    service.tableSortClass = function ($scope) {
        return function (id, flag) {

            if (flag) {
                return $scope.tableParams.orderBy == id ? ['active-underline'] : [''];
            }

            var classes = ['fa'];
            if ($scope.tableParams.orderBy == id) {
                if ($scope.tableParams.direction == 'desc') {
                    classes.push('fa-caret-down');
                } else {
                    classes.push('fa-caret-up');
                }
            } else {
                classes.push('fa-caret-down');
                classes.push('color-grey');
            }
            return classes;
        }
    };
    service.getCheckedArray = function (arr) {
        return arr.filter(function (elem) {
            return angular.isDefined(elem.checked) && elem.checked;
        });
    };

    //Goto 404
    service.page404 = function () {
        $window.location.href = "/error";
    };
    service.warningOnLeave = function (fn) {
        $window.onbeforeunload = function () {
            if (!fn()) {
                //not dirty
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
        };
    };

    //Convert ncTable params to our older params version
    service.ncParams = function (param) {
        return {
            orderBy: param._order,
            pageSize: param._limit,
            direction: param._direction,
            filter: param._filter,
            searchText: param.searchText
        };
    };

    //Generate Success message for add-<stuff> pages
    service.saveAlertError = function () {
        return config.DEFAULT_ERROR_MESSAGE;
    };
    service.saveAlertSuccess = function (itemName, link) {
        return config.DEFAULT_SUCCESS_MESSAGE + ' View <a href="' + link + '">' + itemName + ' List</a>';
    };

    service.bulkTemplate = function (actionName, restFn, id, item, confirmOpts) {
        return function (scope) {
             return {
                name: actionName,
                fail: function() {
                    scope.alert.error('Unable to ' + actionName.toLowerCase() + '. Please select ' + item + ' for this action.');
                },
                fn: function (array, cb) {
                    scope.alert.close();

                    //Only pass ShopId
                    var array = _.map(array, function (e) {
                        return _.pick(e, [id]);
                    });

                    //On launch endpoint
                    scope.onLoad();

                    //generic bulk
                    restFn(array)
                        .then(function () {
                            scope.alert.success(actionName + ' successful.');
                            cb();
                        }, function (err) {
                            scope.alert.error(common.getError(err));
                        })
                        .finally(scope.reload);
                },
                confirmation: _.extend({
                    title: 'Confirm to ' + actionName.toLowerCase(),
                    message: 'Are you sure you want to '+ actionName.toLowerCase() + ' {{model.length}} items?'
                }, confirmOpts || {})
            };
        };
    };

    //Create bulk-action from template
    service.bulkDelete = function (rest, id, item, alert, reload, onload) {
        return {
            name: 'Delete',
            fail: function() {
                alert.error('Unable to delete. Please select ' + item + ' for this action.');
            },
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    return _.pick(e, [id]);
                });

                //On launch endpoint
                (onload || _.noop)();

                //Delete bulk
                rest.delete(array)
                    .then(function () {
                        alert.success('Delete successful.');
                        cb();
                    }, function (err) {
                        alert.error(common.getError(err));
                    })
                    .finally(reload);
            },
            confirmation: {
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete {{model.length}} items?',
                btnConfirm: 'Delete',
                btnClass: 'btn-red'
            }
        };
    };

    service.bulkShow = function (rest, id, item, alert, reload) {
        return {
            name: 'Show',
            fail: function() {
                alert.error('Unable to change visibility. Please select ' + item + ' for this action.');
            },
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    var i = _.pick(e, [id]);
                    i.Visibility = true;
                    return i;
                });

                //Delete bulk
                rest.visible(array)
                    .then(function () {
                        alert.success('Changed successful.');
                        cb();
                    }, function (err) {
                        alert.error(common.getError(err));
                    })
                    .finally(reload);
            },
            confirmation: {
                title: 'Confirm to show',
                message: 'Are you sure you want to change visibility of {{model.length}} items?',
                btnConfirm: 'Show'
            }
        };
    };

    service.bulkHide = function (rest, id, item, alert, reload) {
        return {
            name: 'Hide',
            fail: function() {
                alert.error('Unable to hide. Please select ' + item + ' for this action.');
            },
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    var i = _.pick(e, [id]);
                    i.Visibility = false;
                    return i;
                });

                //Delete bulk
                rest.visible(array)
                    .then(function () {
                        alert.success('Changed successful.');
                        cb();
                    }, function (err) {
                        alert.error(common.getError(err));
                    })
                    .finally(reload);
            },
            confirmation: {
                title: 'Confirm to hide',
                message: 'Are you sure you want to hide {{model.length}} items?',
                btnConfirm: 'Hide',
                btnClass: 'btn-red'
            }
        };
    };

    //Create action from template
    service.actionView = function (uri, id, name) {
        return {
            name: name || 'View / Edit',
            fn: function (item) {
                $window.location.href = uri + '/' + item[id];
            }
        };
    };

    //Create action from template
    service.actionDelete = function (rest, id, item, alert, reload, cb) {
        return {
            name: 'Delete',
            fn: function (obj) {
                alert.close();

                //Only pass id
                var obj = _.pick(obj, [id]);


                //Delete bulk
                rest.delete([obj])
                    .then(function () {
                        alert.success('Delete successful.');
                        cb(obj, id);
                    }, function (err) {
                        alert.error(common.getError(err));
                    })
                    .finally(reload);
            },
            confirmation: {
                title: 'Delete',
                message: 'Are you sure you want to delete selected ' + item + '?',
                btnConfirm: 'Delete',
                btnClass: 'btn-red'
            }
        };
    };
    //Create action from template
    service.actionDuplicate = function (rest, id, item, alert, reload) {
        return {
            name: 'Duplicate',
            fn: function (obj) {
                alert.close();

                //Delete bulk
                rest.duplicate(obj[id])
                    .then(function () {
                        alert.success('Duplicate successful.');
                    }, function (err) {
                        alert.error(common.getError(err));
                    })
                    .finally(reload);
            },
            confirmation: {
                title: 'Duplicate',
                message: 'Are you sure you want to duplicate selected ' + item + '?',
                btnConfirm: 'Duplicate'
            }
        };
    };

    service.eyeToggle = function (rest, id, alert, reload) {
        return function (item) {
            item.Visibility = !item.Visibility;
            rest.visible([_.pick(item, [id, 'Visibility'])])
                .then(function () {
                    //success
                }, function (err) {
                    alert.error(common.getError(err));
                })
                .finally(reload);
        };
    };

    //Map value to dropdown name&value
    service.getDropdownItem = function (array, value) {
        return array.find(function (element) {
            if (element.value === value) {
                return true;
            }
            return false;
        });
    };

    service.getTitle = function (id, item) {
        var scope = $rootScope.$new(true);
        var content = '';
        scope.content = item;

        if (id != 0) {
            content = pluralize(item) + '/' + $interpolate(config.TITLE.DETAIL)(scope);
        } else {
            content = pluralize(item) + '/' + $interpolate(config.TITLE.CREATE)(scope);
        }
        return content;
    }

    service.confirm = function(title, message, yes, no, cls) {
        return $uibModal.open({
            size: 'size-warning',
            templateUrl: 'common/ncActionModal',
            controller: function($scope, $uibModalInstance) {
                'ngInject';
                $scope.title = title;
                $scope.message = message;
                $scope.btnClass = cls;
                $scope.btnYes = yes;
                $scope.btnNo = no;
                $scope.no = function() {
                    $uibModalInstance.dismiss();
                };
                $scope.yes = function() {
                    $uibModalInstance.close();
                };
            }
        });
    }

    //Open preview image modal
    service.previewImage = function(url) {
        $uibModal.open({
            size: 'product-image',
            template: '<img ng-src="{{url}}" alt=""/>',
            controller: function($scope, url) {
                $scope.url = url;
            },
            resolve: {
                url: function() {
                    return url;
                }
            }
        });
    };
    return service;
};
