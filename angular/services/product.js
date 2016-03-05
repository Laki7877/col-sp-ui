// Products Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand', 'config', 'KnownException',
    function ($http, common, util, LocalCategory, Brand, config, KnownException) {
        'use strict'
        var service = common.Rest('/ProductStages')

        service.getExportableFields = function () {
            var req = {
                method: 'GET',
                url: '/ProductStages/Guidance/Export'
            }
            return common.makeRequest(req)
        }

        service.downloadTemplate = function (globalCat, aset) {
            var req = {
                method: 'POST',
                url: '/ProductStages/Template',
                data: {
                    GlobalCategories: [globalCat],
                    AttributeSets: _.isNil(aset) ? [] : [aset]
                }
            }
            return common.makeRequest(req)
        }

        service.getAllAttributeSetsForProducts = function (productList) {
            var req = {
                method: 'POST',
                url: '/ProductStages/AttributeSet',
                data: productList
            }
            return common.makeRequest(req)
        }

        service.export = function (ps) {
            var req = {
                method: 'POST',
                url: '/ProductStages/Export',
                data: ps
            }
            return common.makeRequest(req)
        }

        service.guideline = function (params) {
            var req = {
                method: 'GET',
                url: '/ProductStages/Guidance',
                params: params
            }
            return common.makeRequest(req)
        }
        service.approve = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/ProductStages/Approve',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }
        service.reject = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/ProductStages/Reject',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        service.getOne = function (productId) {
            var req = {
                method: 'GET',
                url: '/ProductStages/' + productId
            }
            return common.makeRequest(req)
        }

        service.getAllVariants = function (parameters) {
            var req = {
                method: 'GET',
                url: '/ProductStages/All',
                params: parameters
            }

            return common.makeRequest(req)
        }

        service.updateAllVariants = function (obj) {
            var req = {
                method: 'PUT',
                url: '/ProductStages/All/Image',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }

            return common.makeRequest(req)
        }

        service.duplicate = function (ProductId) {
            // this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/ProductStages/' + ProductId
            }

            return common.makeRequest(req)
        }

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/ProductStages/',
                params: {
                    _order: parameters.orderBy || 'ProductId',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            }

            return common.makeRequest(req)
        }

        service.export = function (tobj) {
            var path = '/ProductStages/Export'
            return common.makeRequest({
                responseType: 'arraybuffer',
                method: 'POST',
                url: path,
                data: tobj
            })
        }

        service.publish = function (tobj, Status) {
            tobj.Status = Status
            var mode = 'POST'
            var path = '/ProductStages'
            if (tobj.ProductId) {
                mode = 'PUT'
                path = path + '/' + tobj.ProductId
            }
            return common.makeRequest({
                method: mode,
                url: path,
                data: tobj
            })
        }

        service.bulkPublish = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/ProductStages/Publish',
                data: tobj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'PUT',
                url: '/ProductStages/Visibility',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }
        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'DELETE',
                url: '/ProductStages',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        var StatusLookup = {}
        config.PRODUCT_STATUS.forEach(function (object) {
            StatusLookup[object.value] = object
        })
        service.getStatus = function (abbreviation) {
            if (_.isNil(abbreviation)) {
                return {
                    name: 'No Status',
                    color: 'color-grey'
                }
            }
            return StatusLookup[abbreviation]
        }

        service.serialize = function (fd) {
            var hasVariants = (!util.nullOrUndefined(fd.Variants) && fd.Variants.length > 0)

            // Cleaned data
            var clean = {}
            clean.Variants = []

            var objectMapper = {
                VideoLinks: function (vlink) {
                    var f = []
                    Object.keys(vlink).forEach(function (key) {
                        var value = vlink[key]
                        var obj = {
                            'Url': value
                        }

                        f.push(obj)
                    })
                    return f
                }
            }
            // Mapper functions
            var mapper = {
                Images: function (image, pos) {
                    if (image.$id) delete image.$id
                    image.position = pos
                    return image
                },
                Variants: function (_variant) {
                    var variant = angular.copy(_variant)

                    if (util.nullOrUndefined(variant['VideoLinks'])) variant.VideoLinks = []
                    if (util.nullOrUndefined(variant['VideoLinks'])) variant.Images = []
                    if ('queue' in variant) delete variant.queue // circular

                    variant.Visibility = variant.Visibility
                    variant.Images = (variant.Images || []).map(mapper.Images)
                    variant.Images360 = [] // for future

                    try {
                        variant.VideoLinks = objectMapper.VideoLinks(variant.VideoLinks)
                    } catch (ex) {
                        variant.VideoLinks = []
                    }

                    return variant
                },
                Categories: function (lcat) {
                    if (lcat == null) return null
                    return {
                        CategoryId: lcat.CategoryId
                    }
                }
            }

            try {
                clean.GlobalCategories = fd.GlobalCategories.map(mapper.Categories)
            } catch (ex) {
                console.warn('Unable to map Global Cat Array, Global Cat array is mandatory', ex)
            }

            try {
                clean.LocalCategories = fd.LocalCategories.map(mapper.Categories)
            } catch (ex) {
                console.warn('Unable to map Local Cat array, Initializing', ex)
                clean.LocalCategories = [null, null, null]
            }

            try {
                fd.Keywords = util.uniqueSet(fd.Keywords)
                clean.Keywords = (!fd.Keywords ? '' : fd.Keywords.join(','))
            } catch (ex) {
                console.warn('Keyword not set, will not serialize', ex)
            }

            try {
                clean.AttributeSet = {
                    AttributeSetId: fd.AttributeSet.AttributeSetId
                }
            } catch (ex) {
                console.warn('AttributeSet not set, will not serialize', ex)
            }

            try {
                clean.MasterAttribute = []
                Object.keys(fd.MasterAttribute).forEach(function (key) {
                    if (fd.MasterAttribute[key].AttributeValueId) {
                        var g = {
                            AttributeValues: [],
                            AttributeId: fd.MasterAttribute[key].AttributeId,
                            ValueEn: fd.MasterAttribute[key].AttributeValueEn
                        }

                        g.AttributeValues.push(fd.MasterAttribute[key])
                        clean.MasterAttribute.push(g)
                    } else {
                        clean.MasterAttribute.push({
                            AttributeValues: [],
                            AttributeId: Number(key),
                            ValueEn: fd.MasterAttribute[key]
                        })
                    }

                })
            } catch (ex) {
                console.warn('Master Attributes', ex)
            }

            try {
                clean.Remark = fd.Remark
                clean.PrepareDay = fd.PrepareDay || 0
                clean.SEO = fd.SEO
                clean.ControlFlags = fd.ControlFlags
                clean.Brand = fd.Brand
                clean.ShippingMethod = fd.ShippingMethod
                clean.EffectiveDate = null
                clean.ExpireDate = null
                clean.ExpireTime = null
                clean.ExpireDate = null

                if (fd.ExpireDate && fd.EffectiveDate) {
                    var cpdate = angular.copy(fd.ExpireDate)
                    clean.ExpireDate = moment(cpdate).format('LL')
                    clean.ExpireTime = moment(cpdate).format('HH:mm:ss')

                    cpdate = angular.copy(fd.EffectiveDate)

                    clean.EffectiveDate = moment(cpdate).format('LL')
                    clean.EffectiveTime = moment(cpdate).format('HH:mm:ss')
                }


            } catch (ex) {
                console.warn('One-To-One Fields', ex)
            }

            try {
                // Move first entry of Categories out into Category
                clean.GlobalCategory = clean.GlobalCategories[0].CategoryId
                clean.GlobalCategories.shift()

            } catch (ex) {
                console.warn('shift global cat', ex)
            }

            try {
                clean.LocalCategory = clean.LocalCategories[0].CategoryId
                clean.LocalCategories.shift()

            } catch (ex) {
                console.warn('shfiting local cat', ex)
                // Local cat can be null
                clean.LocalCategories = [null, null]
                clean.LocalCategory = null
            }

            try {
                clean.RelatedProducts = []
                Object.keys(fd.RelatedProducts || []).forEach(function (key) {
                    clean.RelatedProducts.push(
                        fd.RelatedProducts[key]
                        )
                })
            } catch (ex) {
                console.warn('Organizing Related Products', ex)
            }

            // MasterVariant
            clean.MasterVariant = fd.MasterVariant

            if (fd.ProductId) clean.ProductId = fd.ProductId

            try {
                clean.MasterVariant.VideoLinks = objectMapper.VideoLinks(fd.VideoLinks)
            } catch (ex) {
                clean.MasterVariant.VideoLinks = []
            }

            try {
                clean.MasterVariant.Images = (fd.MasterVariant.Images || []).map(mapper.Images)
            } catch (ex) {
                clean.MasterVariant.Images = []
            }

            try {
                if (hasVariants) {
                    clean.Variants = (fd.Variants || []).map(mapper.Variants)
                    // Find DefaultVariant
                    var target = fd.DefaultVariant.text
                    clean.Variants.forEach(function (vari, index) {
                        vari.SafetyStock = 0; // Placeholder, no UI yet
                        vari.StockType = 0 // Placeholder
                        vari.DefaultVariant = false
                        if (vari.text == target) {
                            clean.Variants[index].DefaultVariant = true
                        }
                    })
                }
            } catch (ex) {
                console.warn('Variant Distribute', ex)
            }

            // HardCoD
            clean.SellerId = 1
            clean.ShopId = 1

            return clean
        }

        service.deserialize = function (invFd, FullAttributeSet) {
            console.log('FullAttributeSet', FullAttributeSet)

            invFd.AttributeSet = FullAttributeSet
            invFd.PrepareDay = invFd.PrepareDay || ''

            if (invFd.EffectiveDate != '' && invFd.EffectiveDate != null) {
                invFd.EffectiveDate = moment(invFd.EffectiveDate + ' ' + invFd.EffectiveTime).toDate()
                invFd.EffectiveTime = invFd.EffectiveTime
            }

            if (invFd.ExpireDate != '' && invFd.ExpireDate != null) {
                invFd.ExpireDate = moment(invFd.ExpireDate + ' ' + invFd.ExpireTime).toDate()
                invFd.ExpireTime = invFd.ExpireTime
            }

            var BrandId = invFd.Brand.BrandId
            Brand.getOne(BrandId).then(function (data) {
                invFd.Brand = data
                delete invFd.Brand.$id
                invFd.Brand.id = BrandId
            }, function () {
                console.log('brand resolve failure')
                invFd.Brand = {
                    BrandId: null,
                    BrandNameEn: 'Please select brand..'
                }
            })

            var invMapper = {
                VideoLinks: function (m) {
                    return m.Url
                },
                Variants: function (m) {
                    m.Visibility = m.Visibility
                    m.Images = m.Images || []
                    m.Images360 = m.Images360 || []
                    m.WeightUnit = (m.WeightUnit || '').trim()
                    m.DimensionUnit = (m.DimensionUnit || '').trim()
                    m.text = util.variant.toString(m.FirstAttribute, m.SecondAttribute)
                    return m
                }
            }

            try {
                var DefaultVariantIndex = (invFd.Variants || []).map(function (o) {
                    return o.DefaultVariant || false
                }).indexOf(true)

                invFd.DefaultVariant = invFd.Variants[DefaultVariantIndex]
            } catch (er) {
                console.warn('Unable to set DefaultVariant, will not set', er)
            }

            try {
                invFd.Variants = (invFd.Variants || []).map(invMapper.Variants)
            } catch (er) {
                console.warn('Unable to set Variants, will set empty', er)
                invFd.Variants = []
            }

            var MasterAttribute = {}
            try {
                invFd.MasterAttribute.forEach(function (ma) {
                    var k = { 'AttributeValue': ma.AttributeValues[0] }
                    if (ma.AttributeValues.length > 0 && ma.AttributeValues[0].AttributeValueId) {
                        k.AttributeId = ma.AttributeId
                        k.AttributeValueId = ma.AttributeValues[0].AttributeValueId
                    }
                    MasterAttribute[ma.AttributeId] = ma.ValueEn || k
                })
            } catch (ex) {
                console.warn('Unable to set MasterAttribute', ex)
            }
            invFd.MasterAttribute = MasterAttribute

            if (!invFd.LocalCategories) {
                invFd.LocalCategories = []
            }

            if (invFd.LocalCategories.length == 0) {
                invFd.LocalCategories = [null, null, null]
            } else {
                var kmax = invFd.LocalCategories.length
                for (var k = 0; k < 3 - kmax; k++) {
                    console.log('pushing null')
                    invFd.LocalCategories.push(null)
                }
            }

            if (invFd.LocalCategory) {
                LocalCategory.getOne(invFd.LocalCategory).then(function (locat) {
                    invFd.LocalCategories.unshift(locat)

                    if (invFd.LocalCategories.length > 3) {
                        invFd.LocalCategories.pop()
                    }

                })
            }

            // TODO: replace with try-catch
            if (invFd.MasterVariant.VideoLinks) {
                invFd.MasterVariant.VideoLinks = invFd.MasterVariant.VideoLinks.map(invMapper.VideoLinks)
            } else {
                invFd.MasterVariant.VideoLinks = []
            }

            invFd.Variants.forEach(function (variant, index) {
                try {
                    variant.VideoLinks = (variant.VideoLinks || []).map(invMapper.VideoLinks)
                } catch (ex) {
                    variant.VideoLinks = []
                }
            })

            if (!invFd.GlobalCategories) {
                invFd.GlobalCategories = [null, null, null]
            }

            if (invFd.GlobalCategories.length == 0) {
                invFd.GlobalCategories = [null, null, null]
            } else {
                var kmax = invFd.GlobalCategories.length
                for (var k = 0; k < 3 - kmax; k++) {
                    console.log('pushing null')
                    invFd.GlobalCategories.push(null)
                }
            }

            invFd.GlobalCategories.unshift({
                CategoryId: invFd.GlobalCategory
            })

            if (invFd.GlobalCategories.length > 3) {
                invFd.GlobalCategories.pop()
            }

            delete invFd.GlobalCategory
            delete invFd.LocalCategory

            // TODO: Just change ngmodel to bind to MasterVariant.MasterImages Directly
            // invFd.MasterImages = invFd.MasterVariant.Images || []
            // delete invFd.MasterVariant.Images
            // invFd.MasterImages360 = invFd.MasterVariant.Images360 || []
            // delete invFd.MasterVariant.Images360

            try {
                invFd.MasterVariant.WeightUnit = invFd.MasterVariant.WeightUnit.trim()
            } catch (ex) {
                invFd.MasterVariant.WeightUnit = undefined
            }

            try {
                invFd.MasterVariant.DimensionUnit = invFd.MasterVariant.DimensionUnit.trim()
            } catch (ex) {
                invFd.MasterVariant.DimensionUnit = undefined
            }

            try {
                var _split = invFd.Keywords.trim().split(',')
                if (_split[0] == '') {
                    invFd.Keywords = []
                } else {
                    invFd.Keywords = util.uniqueSet(_split)
                }
            } catch (ex) {
                invFd.Keywords = []
            }

            if (invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; // TODO: Hardcode

            var transformed = {
                formData: invFd
            }

            if (invFd.Variants.length > 0) {
                // Figure out the Attributes that make up each Variant
                var HasTwoAttr = !util.nullOrUndefined(invFd.Variants[0].SecondAttribute['AttributeId'])

                // Generate attributeOptions
                var map0_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
                    return a.Attribute.AttributeId
                }).indexOf(invFd.Variants[0].FirstAttribute.AttributeId)

                var map1_index, SecondArray
                if (HasTwoAttr) {
                    map1_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
                        return a.Attribute.AttributeId
                    }).indexOf(invFd.Variants[0].SecondAttribute.AttributeId)
                }

                // Find array of values to populate factors array that can be used to reproduce
                // the expanded variants
                var FirstArray = invFd.Variants.map(function (variant) {
                    if (variant.FirstAttribute.AttributeValues.length > 0) {
                        return {
                            'AttributeValue': variant.FirstAttribute.AttributeValues[0],
                            'AttributeId': variant.FirstAttribute.AttributeId
                        }
                    }

                    return variant.FirstAttribute.ValueEn.trim()
                })

                if (HasTwoAttr) {
                    SecondArray = invFd.Variants.map(function (variant) {
                        if (variant.SecondAttribute.AttributeValues.length > 0) {
                            return {
                                'AttributeValue': variant.SecondAttribute.AttributeValues[0],
                                'AttributeId': variant.SecondAttribute.AttributeId
                            }
                        }
                        return variant.SecondAttribute.ValueEn.trim()
                    })
                }

                // Get updated map from invFd.AttributeSet
                // and load factorization array
                var uniqueFirst = util.uniqueSet(FirstArray, 'AttributeValue.AttributeValueId')
                console.log('ufirst', uniqueFirst)
                transformed.attributeOptions = [{
                    Attribute: FullAttributeSet.AttributeSetMaps[map0_index].Attribute,
                    options: uniqueFirst
                }]

                if (HasTwoAttr) {
                    var uniqueSecond = util.uniqueSet(SecondArray, 'AttributeValue.AttributeValueId')
                    console.log(uniqueSecond)
                    transformed.attributeOptions.push({
                        Attribute: FullAttributeSet.AttributeSetMaps[map1_index].Attribute,
                        options: uniqueSecond
                    })
                } else {
                    transformed.attributeOptions.push({
                        Attribute: null,
                        options: []
                    })
                }

            }

            console.log('transformation array', transformed)

            return transformed
        }

        return service
    }
]
