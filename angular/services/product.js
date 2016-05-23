// Products Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand', 'config', 'KnownException',
	function ($http, common, util, LocalCategory, Brand, config, KnownException) {
		'use strict';
		var service = common.Rest('/ProductStages');

		service.getRevision = function (revId) {
			return common.makeRequest({
				method: 'GET',
				url: '/ProductHistories/' + revId
			});
		}

		service.getUnlockedFields = function () {
			//Get list of fields that are always enabled (unlocked)	
			return common.makeRequest({
				method: 'GET',
				url: '/ProductStages/IgnoreApprove'
			});
		}


		service.savePendingProduct = function (apgp) {
			return common.makeRequest({
				method: 'POST',
				url: '/ProductStages/PendingProduct',
				data: apgp
			})
		}

		service.addTags = function (arr) {
			return common.makeRequest({
				method: 'PUT',
				url: '/ProductStages/Tags',
				data: arr
			})
		};
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

		service.getUngrouped = function(q, attributeSetId, shopId, categoryId){
			var x =  {
					AttributeSetId: attributeSetId,
					ShopId: shopId,
					CategoryId: categoryId,
					_limit: 8,
					_offset: 0,
					_direction: 'asc'
			};
			if(q){
				x.searchText = q;
			}
			var req = {
				method: 'GET',
				url: '/ProductStages/UnGroup/',
				params: x
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
				data: tobj,
				rollbar: 'AP: Product publish or save'
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
			StatusLookup[object.value] = object;
		})
		service.getStatus = function (abbreviation) {
			if (_.isNil(abbreviation)) {
				return {
					name: 'No Status',
					color: 'color-grey'
				}
			}
			return StatusLookup[abbreviation];
		}

		/**
		 * @param  {Product Object} fd
		 */
		service.serialize = function (fd) {

			var clean = {}
			var serializer = {
				Variants: {
					serialize: function (data) {
						return data.map(function (v) {
							var ts = util.variant.toString(v.FirstAttribute, v.SecondAttribute);
							var rs = util.variant.toString(fd.DefaultVariant.FirstAttribute, fd.DefaultVariant.SecondAttribute);
							v.DefaultVariant = (ts == rs);
							return v;
						});
					},
					fallback: function (data) {
						throw new KnownException("No serialization fallback for Variants");
					}
				},
				GlobalCategories: {
					serialize: function (data) {
						return data.map(function (lcat) {
							if (lcat == null) return null;
							return {
								CategoryId: lcat.CategoryId
							}
						});
					},
					fallback: function (data) {
						throw new KnownException("No serialization fallback for Global Categories");
					}
				},
				LocalCategories: {
					serialize: function (data) {
						return data.map(function (lcat) {
							if (lcat == null) return null;
							return {
								CategoryId: lcat.CategoryId
							}
						});
					},
					fallback: function (data) {
						return [null, null, null];
					}
				},
				AttributeSet: {
					serialize: function (data) {
						var k = null;
						if (data.AttributeSetId) k = data.AttributeSetId;
						return {
							AttributeSetId: k
						};
					},
					fallback: function (data) {
						return {
							AttributeSetId: null
						};
					}
				},
				Images: {
					serialize: function (images) {
						return images.map(function (image) {
							image.position = pos;
							return image;
						});
					},
					fallback: function (x) {
						return [];
					}
				},
				MasterAttribute: {
					serialize: function (ma) {
						var t = [];

						Object.keys(ma).forEach(function (key) {
							//key is Attribute Id
							if (ma[key]._checkbox) {

								var g = {
									AttributeValues: [],
									AttributeId: Number(key),
									ValueEn: ""
								};

								//xKey is a essentially a list of ValueIds
								var xKey = Object.keys(ma[key]);
								for (var x = 0; x < xKey.length; x++) {
									if (xKey[x] == "_checkbox") continue;
									if (_.isNaN(Number(xKey[x]))) continue;


									var valueId = xKey[x];
									var valueTf = ma[key][valueId];

									g.AttributeValues.push({
										AttributeValueId: Number(valueId),
										CheckboxValue: valueTf
									});
								}

								t.push(g);
							} else if (ma[key].AttributeValueId) {
								//Dropdown LT (items are not freetext)
								var g = {
									AttributeValues: [],
									AttributeId: ma[key].AttributeId,
									ValueEn: ma[key].AttributeValueEn
								};

								g.AttributeValues.push(ma[key]);
								t.push(g);
							} else if (!_.isEmpty(ma[key])) {
								//Freetext
								if (_.isObject(ma[key])) {
									//ma[key] will look like { ValueEn: '', ValueTh: '' }
									t.push(_.merge({
										AttributeValues: [],
										AttributeId: Number(key)
									}, ma[key]));
								} else {
									//Legacy freetext, theoretically 
									//this will never be reached
									t.push({
										AttributeValues: [],
										AttributeId: Number(key),
										ValueEn: ma[key]
									});
								}
							}

						});

						return t;
					},
					fallback: function () {
						return [];
					}
				}
			};

			//parse each key according to serializer
			for (var key in fd) {
				if (_.has(fd[key], 'queue')) delete fd[key].queue;
				if (_.has(fd[key], '$id')) delete fd[key].$id;
				if (key in serializer) {
					var f = serializer[key];
					var v = fd[key];
					try {
						clean[key] = f.serialize(v);
					} catch (ex) {
						console.warn("Using fallback strategy to serialize " + key, ex);
						clean[key] = f.fallback(v);
					}
				} else {
					clean[key] = fd[key];
				}
			}

			//Other corner cases
			clean.MainGlobalCategory = clean.GlobalCategories.shift();
			clean.MainLocalCategory = clean.LocalCategories.shift();
			clean.GlobalCategories = _.filter(clean.GlobalCategories, _.identity);
			clean.LocalCategories = _.filter(clean.LocalCategories, _.identity);
			return clean;
		}

		/*
		 * Deserialize server format
		 * invFd {Server FormData}
		 */
		service.deserialize = function (pap, FullAttributeSet) {
			var invFd = angular.copy(pap);
			//Load attribute set
			invFd.AttributeSet = FullAttributeSet;

			

			var MasterAttribute = {};
			try {
				invFd.MasterAttribute.forEach(function (ma) {
					//Hacky AF
					if (ma.DataType == "CB") {
						for (var i = 0; i < ma.AttributeValues.length; i++) {
							var item = ma.AttributeValues[i];

							if (!MasterAttribute[ma.AttributeId]) {
								MasterAttribute[ma.AttributeId] = {
									_checkbox: true
								};
							}

							MasterAttribute[ma.AttributeId][item.AttributeValueId] = item.CheckboxValue;
						}
					} else {
						var k = {};
						if (ma.AttributeValues[0]) {
							k['AttributeValue'] = ma.AttributeValues[0];
						}

						if (ma.AttributeValues.length > 0 && ma.AttributeValues[0].AttributeValueId) {
							k.AttributeId = ma.AttributeId;
							k.AttributeValueId = ma.AttributeValues[0].AttributeValueId;
						}

						MasterAttribute[ma.AttributeId] = ((ma.ValueEn || ma.ValueTh) ? ma : k);
					}
				});
			} catch (ex) {
				throw new KnownException('Unable to deserialize MasterAttribute');
			}

			invFd.MasterAttribute = MasterAttribute;

			if (!invFd.LocalCategories) {
				invFd.LocalCategories = [];
			}

			if (invFd.LocalCategories.length == 0) {
				invFd.LocalCategories = [null, null, null];
			} else {
				var kmax = invFd.LocalCategories.length;
				for (var k = 0; k < 3 - kmax; k++) {
					invFd.LocalCategories.push(null);
				}
			}

			if (invFd.MainLocalCategory && Number(invFd.MainLocalCategory.CategoryId) > 0) {
				LocalCategory.getOne(invFd.MainLocalCategory.CategoryId).then(function (locat) {
					invFd.LocalCategories.unshift(locat);
					if (invFd.LocalCategories.length > 3) {
						invFd.LocalCategories.pop();
					}
				});
			};

			var invMapper = {
				Variants: function (m) {
					m.text = util.variant.toString(m.FirstAttribute, m.SecondAttribute);
					return m;
				}
			};

			try {
				invFd.Variants = (invFd.Variants || []).map(invMapper.Variants);
			} catch (er) {
				console.warn("Unable to set deserialize variants, will set empty", er);
				invFd.Variants = [];
			}

			if (invFd.GlobalCategories.length == 0) {
				invFd.GlobalCategories = [null, null, null];
			} else {
				var kmax = invFd.GlobalCategories.length;
				for (var k = 0; k < 3 - kmax; k++) {
					invFd.GlobalCategories.push(null);
				}
			}

			invFd.GlobalCategories.unshift(invFd.MainGlobalCategory)

			if (invFd.GlobalCategories.length > 3) {
				invFd.GlobalCategories.pop()
			}

			delete invFd.MainGlobalCategory;
			delete invFd.MainLocalCategory;

			try {
				var _split = invFd.Keywords.trim().split(',');
				if (_split[0] == '') {
					invFd.Keywords = [];
				} else {
					invFd.Keywords = util.uniqueSet(_split);
				}
			} catch (ex) {
				invFd.Keywords = [];
			}

			//Find out which variant is default variant
			// if (invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; // TODO: Hardcode
			
			//Find which variant is default
			
			
			var transformed = {
				formData: invFd
			};

			//Figure out attribute options from loaded data
			if (invFd.Variants.length > 0) {
				// Figure out the Attributes that make up each Variant
				var HasTwoAttr = _.has(invFd.Variants[0], 'SecondAttribute.AttributeId') && invFd.Variants[0].SecondAttribute.AttributeId != 0;
				// Generate attributeOptions
				var map0_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
					return a.Attribute.AttributeId
				}).indexOf(invFd.Variants[0].FirstAttribute.AttributeId);

				var map1_index, SecondArray;
				if (HasTwoAttr) {
					map1_index = FullAttributeSet.AttributeSetMaps.map(function (a) {
						return a.Attribute.AttributeId
					}).indexOf(invFd.Variants[0].SecondAttribute.AttributeId);
				}

				// Find array of values to populate factors array that can be used to reproduce
				// the expanded variants
				var FirstArray = invFd.Variants.map(function (variant) {
					if (variant.FirstAttribute.AttributeValues.length > 0) {
						return {
							'AttributeValue': variant.FirstAttribute.AttributeValues[0],
							'AttributeId': variant.FirstAttribute.AttributeId,
							'_locked': true
						}
					}

					return {
						'ValueEn': variant.FirstAttribute.ValueEn.trim(),
						'_locked': true
					}
				});

				if (HasTwoAttr) {
					SecondArray = invFd.Variants.map(function (variant) {
						if (variant.SecondAttribute.AttributeValues.length > 0) {
							return {
								'AttributeValue': variant.SecondAttribute.AttributeValues[0],
								'AttributeId': variant.SecondAttribute.AttributeId,
								'_locked': true
							}
						}
						return {
							'ValueEn': variant.SecondAttribute.ValueEn.trim(),
							'_locked': true
						}
					})
				}

				// Get updated map from invFd.AttributeSet
				// and load factorization array
				var uniqueFirst = util.uniqueSet(FirstArray, 'AttributeValue.AttributeValueId');
				if (_.has(FirstArray[0], 'ValueEn')) {
					uniqueFirst = util.uniqueSet(FirstArray, 'ValueEn');
				}

				transformed.attributeOptions = [{
					Attribute: FullAttributeSet.AttributeSetMaps[map0_index].Attribute,
					options: uniqueFirst
				}];

				if (HasTwoAttr) {
					var uniqueSecond = util.uniqueSet(SecondArray, 'AttributeValue.AttributeValueId');
					if (_.has(SecondArray[0], 'ValueEn')) {
						uniqueSecond = util.uniqueSet(SecondArray, 'ValueEn');
					}
					transformed.attributeOptions.push({
						Attribute: FullAttributeSet.AttributeSetMaps[map1_index].Attribute,
						options: uniqueSecond
					});
				} else {
					transformed.attributeOptions.push({
						Attribute: 0,
						options: []
					});
				}

			}
			
			var DefaultVariantIndex = (invFd.Variants || []).map(function (o) {
					return o.DefaultVariant || false;
			}).indexOf(true);
			invFd.DefaultVariant = invFd.Variants[DefaultVariantIndex];
			console.log('DefaultVariant' , invFd.DefaultVariant);

			console.log('Deserialized Wrapper', transformed);

			return transformed;
		}

		return service
	}
]
