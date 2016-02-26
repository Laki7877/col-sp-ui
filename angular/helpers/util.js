var angular = require('angular');

module.exports = ['storage', 'config', 'common', '$window', '$rootScope', '$interpolate', 'KnownException', function (storage, config, common, $window, $rootScope, $interpolate, KnownException) {
    'use strict';
    var service = {};

    service.variant = {};

    // service.variant.hash = function (a, b) {
    //     if (!("ValueEn" in a) || a.ValueEn) return "[API Error]";
    //     if (!('ValueEn' in b) || b.ValueEn) return (a.AttributeId + "-" + a.ValueEn.trim() + "-" + "null" + "-");
    //     return (a.AttributeId + "-" + a.ValueEn.trim() + "-" + b.AttributeId + "-" + b.ValueEn.trim());
    // };

    service.variant.toString = function (a, b) {
        // if (!("ValueEn" in a) || !a.ValueEn) return "[API Error]";
        // if (!('ValueEn' in b) || !b.ValueEn) return a.ValueEn.trim();

        var left = null;
        var right = null;
        left = (a.ValueEn || a.AttributeValueEn);
        right = (b.ValueEn || b.AttributeValueEn);
        console.log(a,b, 'toString variant');
        return left + (right ? ", " + right : "");
    };

    service.uniqueSet = function (a, prop) {
        var seen = new Set();
        return a.filter(function (x) {
            var y = x;
            if (prop) y = x[prop];
            return !seen.has(y) && seen.add(y);
        })
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

    service.bulkTemplate = function (actionName, restFn, id, item) {
        return function (scope) {
             return {
                name: actionName,
                fn: function (array, cb) {
                    scope.alert.close();

                    //Only pass ShopId
                    var array = _.map(array, function (e) {
                        return _.pick(e, [id]);
                    });

                    //Blank array?
                    if (array.length <= 0) {
                        scope.alert.error('Unable to ' + actionName.toLowerCase() + '. Please select ' + item + ' for this action.');
                        return;
                    }

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
                confirmation: {
                    title: 'Confirm to ' + actionName.toLowerCase(),
                    message: 'Are you sure you want to '+ actionName.toLowerCase() + ' {{model.length}} items?'
                }
            };
        };
    };

    //Create bulk-action from template
    service.bulkDelete = function (rest, id, item, alert, reload, onload) {
        return {
            name: 'Delete',
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    return _.pick(e, [id]);
                });

                //Blank array?
                if (array.length <= 0) {
                    alert.error('Unable to delete. Please select ' + item + ' for this action.');
                    return;
                }

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
                message: 'Are you sure you want to delete {{model.length}} items?'
            }
        };
    };

    service.bulkShow = function (rest, id, item, alert, reload) {
        return {
            name: 'Show',
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    var i = _.pick(e, [id]);
                    i.Visibility = true;
                    return i;
                });

                //Blank array?
                if (array.length <= 0) {
                    alert.error('Unable to show. Please select ' + item + ' for this action.');
                    return;
                }

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
                message: 'Are you sure you want to change visibility of {{model.length}} items?'
            }
        };
    };

    service.bulkHide = function (rest, id, item, alert, reload) {
        return {
            name: 'Hide',
            fn: function (array, cb) {
                alert.close();

                //Only pass ShopId
                var array = _.map(array, function (e) {
                    var i = _.pick(e, [id]);
                    i.Visibility = false;
                    return i;
                });

                //Blank array?
                if (array.length <= 0) {
                    alert.error('Unable to show. Please select ' + item + ' for this action.');
                    return;
                }

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
                message: 'Are you sure you want to change visibility of {{model.length}} items?'
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
                message: 'Are you sure you want to delete selected ' + item + '?'
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
                message: 'Are you sure you want to duplicate selected ' + item + '?'
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

        if (id > 0) {
            content = $interpolate(config.TITLE.DETAIL)(scope);
        } else {
            content = $interpolate(config.TITLE.CREATE)(scope);
        }
        return content;
    }
    return service;
}];
