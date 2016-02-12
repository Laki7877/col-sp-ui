//Products Collection Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand',
    function ($http, common, util, LocalCategory, Brand) {
        'use strict';
        var service = {};

        service.getOne = function (productId) {
            var req = {
                method: 'GET',
                url: '/ProductStages/' + productId
            };
            return common.makeRequest(req);
        };

        service.getAllVariants = function (parameters) {
            var req = {
                method: 'GET',
                url: '/ProductStages/All',
                params: parameters
            };

            return common.makeRequest(req);
        }

        service.duplicate = function (ProductId) {
            //this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/ProductStages/' + ProductId
            };

            return common.makeRequest(req);
        };

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMSShopList',
                params: {
                    _order: parameters.orderBy || 'UpdateDate',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'desc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined ,
                    ShopId: parameters.shopId|| 0
                }
            };

            console.log(req);

            return common.makeRequest(req);
        };

     
        service.export = function (tobj) {
            var path = '/ProductStages/Export';
            return common.makeRequest({
                responseType: 'arraybuffer',
                method: 'POST',
                url: path,
                data: tobj
            });
        };

        service.publish = function (tobj, Status) {
            //tobj.Status = Status;
            var mode = 'POST';
            var path = '/CMSStages';
            if (tobj.CMSId) {
                mode = 'PUT';
                path = path + '/' + tobj.CMSId;
            }
            return common.makeRequest({
                method: mode,
                url: path,
                data: tobj
            });
        };


        service.bulkPublish = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/ProductStages/Publish',
                data: tobj
            });
        };

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/ProductStages/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/ProductStages',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        service.serialize = function (fd) {
            var hasVariants = (!util.nullOrUndefined(fd.Variants) && fd.Variants.length > 0);

            //Cleaned data
            var clean = {};
          

            try {
               
                clean.CMSNameEN = fd.CMSNameEN;
                clean.CMSNameTH = fd.CMSNameTH;
                clean.URLKey = fd.URLKey ;
                clean.CMSTypeId = fd.CMSTypeId ;
                clean.CMSStatusId = fd.Status;
                clean.Status = true;
                clean.UpdateBy =1;
                clean.CreateBy =1;
                clean.Visibility = 1;

                clean.CreateIP ='203.146.156.34';
                clean.ShortDescriptionTH = fd.ShortDescriptionTH ;
                clean.LongDescriptionTH = fd.LongDescriptionTH;
                clean.ShortDescriptionEN = fd.ShortDescriptionEN ;
                clean.LongDescriptionEN = fd.LongDescriptionEN;


                var cpdate = angular.copy(fd.ExpiryDate);
                clean.ExpiryDate = moment(cpdate).format('LL');
                clean.ExpiryTime = moment(cpdate).format('HH:mm:ss');

                cpdate = angular.copy(fd.EffectiveDate);

                clean.EffectiveDate = moment(cpdate).format('LL');
                clean.EffectiveTime = moment(cpdate).format('HH:mm:ss');

                console.log('1-1', clean);
            } catch (ex) {
                console.warn("One-To-One Fields", ex);
            }

           

            //HardCoD
            clean.SellerId = 1;
            clean.ShopId = 1;

            return clean;
        }

        service.deserialize = function (invFd, FullAttributeSet, _Loading) {
            console.log('FullAttributeSet', FullAttributeSet);

            invFd.AttributeSet = FullAttributeSet;
            invFd.PrepareDay = invFd.PrepareDay || '';

            if (invFd.EffectiveDate != "" && invFd.EffectiveDate != null) {
                invFd.EffectiveDate = moment(invFd.EffectiveDate + " " + invFd.EffectiveTime);
                invFd.EffectiveTime = invFd.EffectiveTime;
            }

            if (invFd.ExpireDate != "" && invFd.ExpireDate != null) {
                invFd.ExpireDate = moment(invFd.ExpireDate + " " + invFd.ExpireTime);
                invFd.ExpireTime = invFd.ExpireTime;
            }

            var BrandId = invFd.Brand.BrandId;
            Brand.getOne(BrandId).then(function (data) {
                invFd.Brand = data;
                delete invFd.Brand.$id;
                invFd.Brand.id = BrandId;
            }, function () {
                console.log("brand resolve failure");
                invFd.Brand = {
                    BrandId: null,
                    BrandNameEn: 'Please select brand..'
                };
            });

            var invMapper = {
                VideoLinks: function (m) {
                    return m.Url;
                },
                Variants: function (m) {
                    m.Visibility = m.Visibility;
                    m.Images = m.Images || [];
                    m.Images360 = m.Images360 || [];
                    m.hash = util.variant.hash(m.FirstAttribute, m.SecondAttribute);
                    m.text = util.variant.toString(m.FirstAttribute, m.SecondAttribute);
                    return m;
                }
            };

            try {
                _Loading.message = "Setting Default Variant..";
                var DefaultVariantIndex = (invFd.Variants || []).map(function (o) {
                    return o.DefaultVariant || false;
                }).indexOf(true);

                invFd.DefaultVariant = invFd.Variants[DefaultVariantIndex];
            } catch (er) {
                console.warn("Unable to set DefaultVariant, will not set", er);
            }

            try {
                _Loading.message = "Setting Variants..";
                invFd.Variants = (invFd.Variants || []).map(invMapper.Variants);
            } catch (er) {
                console.warn("Unable to set Variants, will set empty", er);
                invFd.Variants = [];
            }

            var MasterAttribute = {};
            try {
                _Loading.message = "Setting Master Attributes..";
                invFd.MasterAttribute.forEach(function (ma) {
                    MasterAttribute[ma.AttributeId] = ma.ValueEn;
                });
            } catch (ex) {
                console.warn("Unable to set MasterAttribute", ex);
            }
            invFd.MasterAttribute = MasterAttribute;

            _Loading.message = "Setting Local Categories..";



            if (!invFd.LocalCategories) {
                invFd.LocalCategories = [];
            }

            if (invFd.LocalCategories.length == 0) {
                invFd.LocalCategories = [null, null, null];
            } else {
                var kmax = invFd.LocalCategories.length;
                for (var k = 0; k < 3 - kmax; k++) {
                    console.log("pushing null")
                    invFd.LocalCategories.push(null);
                }
            }

            if (invFd.LocalCategory) {
                LocalCategory.getOne(invFd.LocalCategory).then(function (locat) {
                    invFd.LocalCategories.unshift(locat);

                    if (invFd.LocalCategories.length > 3) {
                        invFd.LocalCategories.pop();
                    }

                })
            }

            _Loading.message = "Setting Video Links..";
            //TODO: replace with try-catch
            if (invFd.MasterVariant.VideoLinks) {
                invFd.MasterVariant.VideoLinks = invFd.MasterVariant.VideoLinks.map(invMapper.VideoLinks);
            } else {
                invFd.MasterVariant.VideoLinks = [];
            }


            invFd.Variants.forEach(function (variant, index) {
                try {
                    variant.VideoLinks = (variant.VideoLinks || []).map(invMapper.VideoLinks);
                } catch (ex) {
                    variant.VideoLinks = [];
                }
            });



            if (!invFd.GlobalCategories) {
                invFd.GlobalCategories = [null, null, null];
            }

            if (invFd.GlobalCategories.length == 0) {
                invFd.GlobalCategories = [null, null, null];
            } else {
                var kmax = invFd.GlobalCategories.length;
                for (var k = 0; k < 3 - kmax; k++) {
                    console.log("pushing null")
                    invFd.GlobalCategories.push(null);
                }
            }

            invFd.GlobalCategories.unshift({
                CategoryId: invFd.GlobalCategory
            });

            if (invFd.GlobalCategories.length > 3) {
                invFd.GlobalCategories.pop();
            }

            delete invFd.GlobalCategory;
            delete invFd.LocalCategory;


            //TODO: Just change ngmodel to bind to MasterVariant.MasterImages Directly
            invFd.MasterImages = invFd.MasterVariant.Images || [];
            delete invFd.MasterVariant.Images;
            invFd.MasterImages360 = invFd.MasterVariant.Images360 || [];
            delete invFd.MasterVariant.Images360;

            try {
                invFd.MasterVariant.WeightUnit = invFd.MasterVariant.WeightUnit.trim();
            } catch (ex) {
                invFd.MasterVariant.WeightUnit = undefined;
            }

            try {
                invFd.MasterVariant.DimensionUnit = invFd.MasterVariant.DimensionUnit.trim();
            } catch (ex) {
                invFd.MasterVariant.DimensionUnit = undefined;
            }

            try {
                var _split = invFd.Keywords.trim().split(",");
                if (_split[0] == "") {
                    invFd.Keywords = [];
                } else {
                    invFd.Keywords = util.uniqueSet(_split);
                }
            } catch (ex) {
                invFd.Keywords = [];
            }

            if (invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; //TODO: Hardcode

            var transformed = {
                formData: invFd
            };

            _Loading.message = "Producing Variation Factorization..";
            if (invFd.Variants.length > 0) {

                var HasTwoAttr = !util.nullOrUndefined(invFd.Variants[0].SecondAttribute['AttributeId']);

                //Generate attributeOptions
                var map0_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
                    return a.Attribute.AttributeId;
                }).indexOf(invFd.Variants[0].FirstAttribute.AttributeId);

                var map1_index, SecondArray;
                if (HasTwoAttr) {
                    map1_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
                        return a.Attribute.AttributeId;
                    }).indexOf(invFd.Variants[0].SecondAttribute.AttributeId);
                }

                var FirstArray = invFd.Variants.map(function (variant) {
                    return variant.FirstAttribute.ValueEn.trim();
                });

                if (HasTwoAttr) {
                    SecondArray = invFd.Variants.map(function (variant) {
                        return variant.SecondAttribute.ValueEn.trim();
                    });
                }

                //Get updated map from invFd.AttributeSet
                //and load factorization array
                transformed.attributeOptions = [{
                    Attribute: FullAttributeSet.AttributeSetMaps[map0_index].Attribute,
                    options: util.uniqueSet(FirstArray)
                }];

                if (HasTwoAttr) {
                    transformed.attributeOptions.push({
                        Attribute: FullAttributeSet.AttributeSetMaps[map1_index].Attribute,
                        options: util.uniqueSet(SecondArray)
                    });
                } else {
                    transformed.attributeOptions.push({
                        Attribute: null,
                        options: []
                    });
                }


            }

            console.log('transformation array', transformed);

            return transformed;
        };

        return service;
    }
];
