
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


		//TODO: PendingProduct is now called ProductGrouping
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

		service.exportAbort = function (ps) {
			var req = {
				method: 'POST',
				url: '/ProductStages/Export/Abort'
			}
			return common.makeRequest(req)
		}


		service.exportProgress = function (ps) {
			var req = {
				method: 'GET',
				url: '/ProductStages/Export/Progress'
			}
			return common.makeRequest(req)
		}

		service.exportGet = function (ps) {
			var req = {
				method: 'GET',
				url: '/ProductStages/Export'
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
					EmptyAttributeSet: true,
					_limit: 8,
					_offset: 0,
					_direction: 'asc'
			};

			if(categoryId){
				x.CategoryId =  categoryId;
			}

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
							var ts = util.variant.asString(v.FirstAttribute, v.SecondAttribute);
							var rs = util.variant.asString(fd.DefaultVariant.FirstAttribute, fd.DefaultVariant.SecondAttribute);
							v.DefaultVariant = (ts == rs);
							v.ExpireDatePromotion = moment(v.ExpireDatePromotion).toDate();
							v.EffectiveDatePromotion = moment(v.EffectiveDatePromotion).toDate();
							v.SEO.ProductUrlKeyEn = v.SEO.ProductUrlKeyEn.toLowerCase();
							return v;
						});
					},
					fallback: function (data) {
						throw new KnownException("No serialization fallback for Variants");
					}
				},
				Tags: {
					serialize: function (data) {
						return data.map(function (tag) {
							return tag.TagName;
						});
					},
					fallback: function (data) {
						throw new KnownException("No serialization fallback for Tags");
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
                RelatedProducts: {
                    serialize: function(A){
                        return A.map(function(d){
                            d._text = d.ProductNameEn + " (" + d.Pid + ")"
                            return d;
                        });
                    },
                    fallback: function(x){
                        return []
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

						/*
						*  `ma` is a dictionary with keys
						*  equal to Attribute Id
						*  UI uses `ma` to iterate (key,value) for each row
						*  of Attribute-like section.
						*/

						//let t be the result of the serialization
						//we will convert `ma` a dictionary of attributes indexed by id
						//to `t` which is an array of attribute object

						var t = [];
						Object.keys(ma).forEach(function (key) {
							//`key` is Attribute id

							//if ma has type checkbox
							// (note _checkbox is a front-end private
							// control variable indicating that DataType == CB)

							if (ma[key]._checkbox) {

								//Let g be the AttributeObject that we will push into `t` array
								//See documentation for full detail on "Attribute Object" structure

								var g = {};
								//ValueEn for checkbox is don't care
								g.ValueEn = "";
								//AttributeId is the key of the ma
								g.AttributeId = Number(key);
								//AttributeValue is also not used for type CB
								g.AttributeValues = [];

								//Note: Attribute Checkbox Object is a front-end structure only
								//For checkbox type we will need to iterate
								//over the Attribute Checkbox Object (see doc)
								// which looks something like:
								//   { <attributeValueId> : true/false  }
								//where its key are the value of the AttrbiuteValueId

								var attributeProps = Object.keys(ma[key]);
								for (var x = 0; x < attributeProps.length; x++) {
									if (attributeProps[x] == "_checkbox") continue;
									if (_.isNaN(Number(attributeProps[x]))) continue;

									//key of the Attribute Checkbox object
									var valueId = attributeProps[x];
									//boolean value of Attribute checkbox object
									var valueTf = ma[key][valueId];

									//Data storage for CB type is done via Attribute Value array of
									//Attribute Object

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
									debugger;
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
				//Remove control keys (contains circular structure used by image upload)
				if (_.has(fd[key], 'queue')) delete fd[key].queue;
				if (_.has(fd[key], '$id')) delete fd[key].$id;

				//serialize each properties
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

			invFd.Brand.display =  (invFd.Brand.DisplayNameEn || invFd.Brand.BrandNameEn) + " (" + invFd.Brand.BrandId + ")";

			//Convert List of attributes (Backend)
			//to Dictionary of attributes (Frontend) indexed by attribute id

			var MasterAttribute = {};
			try {
				invFd.MasterAttribute.forEach(function (ma) {

					if (ma.DataType == "CB") {
						//For CB type attributes we need to
						//convert them to UI domain structure called
						//Attribute Checkbox Object
						//so that it can be efficiently used in UI generation

						//Iterate through all the attribute values array
						//of the `ma` attribute object (see Attribute Object documentation)

						for (var i = 0; i < ma.AttributeValues.length; i++) {
							var item = ma.AttributeValues[i];

							//Mark the attribute as checkbox
							//Used internally to indicate that this is a
							//Attribute Checkbox Object type (see documentation)

							if (!MasterAttribute[ma.AttributeId]) {
								MasterAttribute[ma.AttributeId] = {
									_checkbox: true
								};
							}

							//Reason we convert everything to dict type datastructure
							//is that its easier to work with

							//Backend uses a field called "CheckboxValue"
							//Which we will just convert to the value of dictionary
							//indexed at that AttributeValueId
							MasterAttribute[ma.AttributeId][item.AttributeValueId] = item.CheckboxValue;
						}
					} else {
						//For other data types its  straight forward conversion

						//Let k be the Attribute object
						var k = {};

						//Propagate property from AttributeValue list
						//up to top level
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
					m.text = util.variant.asString(m.FirstAttribute, m.SecondAttribute);
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


			invFd.Tags = invFd.Tags.map(function(tag){
				return {
					TagName: tag
				};
			})

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
