// Products Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand', 'config', 'KnownException',
	function($http, common, util, LocalCategory, Brand, config, KnownException) {
		'use strict'
			var service = common.Rest('/ProductStages')

			service.getExportableFields = function() {
				var req = {
					method: 'GET',
					url: '/ProductStages/Guidance/Export'
				}
				return common.makeRequest(req)
			}

		service.downloadTemplate = function(globalCat, aset) {
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

		service.getAllAttributeSetsForProducts = function(productList) {
			var req = {
				method: 'POST',
				url: '/ProductStages/AttributeSet',
				data: productList
			}
			return common.makeRequest(req)
		}

		service.export = function(ps) {
			var req = {
				method: 'POST',
				url: '/ProductStages/Export',
				data: ps
			}
			return common.makeRequest(req)
		}

		service.guideline = function(params) {
			var req = {
				method: 'GET',
				url: '/ProductStages/Guidance',
				params: params
			}
			return common.makeRequest(req)
		}
		service.approve = function(obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/ProductStages/Approve',
				data: obj,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
		}
		service.reject = function(obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/ProductStages/Reject',
				data: obj,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
		}

		service.getOne = function(productId) {
			var req = {
				method: 'GET',
				url: '/ProductStages/' + productId
			}
			return common.makeRequest(req)
		}

		service.getAllVariants = function(parameters) {
			var req = {
				method: 'GET',
				url: '/ProductStages/All',
				params: parameters
			}

			return common.makeRequest(req)
		}

		service.updateAllVariants = function(obj) {
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

		service.duplicate = function(ProductId) {
			// this URL structure is weird dont u think
			var req = {
				method: 'POST',
				url: '/ProductStages/' + ProductId
			}

			return common.makeRequest(req)
		}

		service.getAll = function(parameters) {
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

		service.export = function(tobj) {
			var path = '/ProductStages/Export'
				return common.makeRequest({
					responseType: 'arraybuffer',
					method: 'POST',
					url: path,
					data: tobj
				})
		}

		service.publish = function(tobj, Status) {
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

		service.bulkPublish = function(tobj) {
			return common.makeRequest({
				method: 'POST',
				url: '/ProductStages/Publish',
				data: tobj,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
		}

		service.visible = function(obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/ProductStages/Visibility',
				data: obj,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
		}
		service.deleteBulk = function(arr) {
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
		config.PRODUCT_STATUS.forEach(function(object) {
			StatusLookup[object.value] = object;
		})
		service.getStatus = function(abbreviation) {
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
		service.serialize = function(fd) {

			var clean = {}
			var serializer = {
				GlobalCategories: {
					serialize: function(data) {
						return data.map(function(lcat) {
							if (lcat == null) return null;
							return {
								CategoryId: lcat.CategoryId
							}
						});
					},
					fallback: function(data) {
						throw new KnownException("No serialization fallback for Global Categories");
					}
				},
				LocalCategories: {
					serialize: function(data) {
						return data.map(function(lcat) {
							if (lcat == null) return null;
							return {
								CategoryId: lcat.CategoryId
							}
						});
					},
					fallback: function(data) {
						return [null, null, null];
					}
				},
				AttributeSet: {
					serialize: function(data) {
						var k = null;
						if (data.AttributeSetId) k = data.AttributeSetId;
						return {
							AttributeSetId: k
						};
					},
					fallback: function(data) {
						return {
							AttributeSetId: null
						};
					}
				},
				Images: {
					serialize: function(images) {
						return images.map(function(image) {
							image.position = pos;
							return image;
						});
					},
					fallback: function(x){
						return [];
					}
				}, 
				MasterAttribute: {
					serialize:  function(ma) {
						var t = [];
						Object.keys(ma).forEach(function(key) {
							if (ma[key].AttributeValueId) {
								var g = {
									AttributeValues: [],
									AttributeId: ma[key].AttributeId,
									ValueEn: ma[key].AttributeValueEn
								};

								g.AttributeValues.push(ma[key]);
								t.push(g);
							} else {
								t.push({
									AttributeValues: [],
									AttributeId: Number(key),
									ValueEn: ma[key]
								});
							}

						});
						return t;
					},
					fallback: function(){
						return [];
					}
				}
			};

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
			clean.GlobalCategories = _.pick(clean.GlobalCategories, _.identity);
			clean.LocalCategories = _.pick(clean.LocalCategories, _.identity);
			return clean;
		}

		/*
		 * Deserialize server format
		 * invFd {Server FormData}
		 */
		service.deserialize = function(invFd, FullAttributeSet) {

			invFd.AttributeSet = FullAttributeSet;
			var BrandId = invFd.Brand.BrandId;
			invFd.Brand = {
				BrandId: null,
				BrandNameEn: 'Search brand by name or id..'
			};

			Brand.getOne(BrandId).then(function(data) {
				invFd.Brand = data;
				delete invFd.Brand.$id;
				invFd.Brand.id = BrandId;
			});

			try {
				var DefaultVariantIndex = (invFd.Variants || []).map(function(o) {
					return o.DefaultVariant || false;
				}).indexOf(true);

				invFd.DefaultVariant = invFd.Variants[DefaultVariantIndex];
			} catch (er) {
				console.warn('Unable to set DefaultVariant, will not set', er);
			}

			try {
				invFd.Variants = (invFd.Variants || []).map(invMapper.Variants);
			} catch (er) {
				console.warn('Unable to set Variants, will set empty', er);
				invFd.Variants = [];
			}

			var MasterAttribute = {};
			try {
				invFd.MasterAttribute.forEach(function(ma) {
					var k = { 'AttributeValue': ma.AttributeValues[0] }
					if (ma.AttributeValues.length > 0 && ma.AttributeValues[0].AttributeValueId) {
						k.AttributeId = ma.AttributeId;
						k.AttributeValueId = ma.AttributeValues[0].AttributeValueId;
					}
					MasterAttribute[ma.AttributeId] = ma.ValueEn || k;
				});
			} catch (ex) {
				console.warn('Unable to set MasterAttribute', ex);
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
					console.log('pushing null');
					invFd.LocalCategories.push(null);
				}
			}

			if (invFd.LocalCategory) {
				LocalCategory.getOne(invFd.LocalCategory).then(function(locat) {
					invFd.LocalCategories.unshift(locat);
					if (invFd.LocalCategories.length > 3) {
						invFd.LocalCategories.pop();
					}
				});
			}

			if (invFd.MasterVariant.VideoLinks) {
				invFd.MasterVariant.VideoLinks = invFd.MasterVariant.VideoLinks.map(invMapper.VideoLinks);
			} else {
				invFd.MasterVariant.VideoLinks = [];
			}

			invFd.Variants.forEach(function(variant, index) {
				try {
					variant.VideoLinks = (variant.VideoLinks || []).map(invMapper.VideoLinks);
				} catch (ex) {
					variant.VideoLinks = []
				}
			})

			if (invFd.GlobalCategories.length == 0) {
				invFd.GlobalCategories = [null, null, null];
			} else {
				var kmax = invFd.GlobalCategories.length;
				for (var k = 0; k < 3 - kmax; k++) {
					console.log('pushing null');
					invFd.GlobalCategories.push(null);
				}
			}

			invFd.GlobalCategories.unshift({
				CategoryId: invFd.GlobalCategory
			})

			if (invFd.GlobalCategories.length > 3) {
				invFd.GlobalCategories.pop()
			}

			delete invFd.GlobalCategory;
			delete invFd.LocalCategory;

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
			if (invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; // TODO: Hardcode

			var transformed = {
				formData: invFd
			};

			if (invFd.Variants.length > 0) {
				// Figure out the Attributes that make up each Variant
				var HasTwoAttr = !util.nullOrUndefined(invFd.Variants[0].SecondAttribute['AttributeId'])

					// Generate attributeOptions
					var map0_index = FullAttributeSet.AttributeSetMaps.map(function(a) {
						return a.Attribute.AttributeId
					}).indexOf(invFd.Variants[0].FirstAttribute.AttributeId)

				var map1_index, SecondArray
					if (HasTwoAttr) {
						map1_index = FullAttributeSet.AttributeSetMaps.map(function(a) {
							return a.Attribute.AttributeId
						}).indexOf(invFd.Variants[0].SecondAttribute.AttributeId)
					}

				// Find array of values to populate factors array that can be used to reproduce
				// the expanded variants
				var FirstArray = invFd.Variants.map(function(variant) {
					if (variant.FirstAttribute.AttributeValues.length > 0) {
						return {
							'AttributeValue': variant.FirstAttribute.AttributeValues[0],
							'AttributeId': variant.FirstAttribute.AttributeId
						}
					}

					return variant.FirstAttribute.ValueEn.trim()
				})

				if (HasTwoAttr) {
					SecondArray = invFd.Variants.map(function(variant) {
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

			console.log('transformation array', transformed);

			return transformed;
		}

		return service
	}
]
