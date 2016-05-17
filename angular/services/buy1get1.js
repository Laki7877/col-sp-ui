//Buy 1 Get 1 Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand', 'config',
    function ($http, common, util, LocalCategory, Brand, config) {
        'use strict';
        var service = common.Rest('/ProductStages');

        service.getOne = function (PromotionBuy1Get1ItemId) {
            var req = {
                method: 'GET',
                url: '/ProBuy1Get1/' + PromotionBuy1Get1ItemId
            };
            return common.makeRequest(req);
        };
     
        service.duplicate = function (PromotionBuy1Get1ItemId) {
            //this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/ProBuy1Get1/duplicate/' + PromotionBuy1Get1ItemId
            };

            return common.makeRequest(req);
        };

        service.getAll = function (parameters) {
            var req = {
                method: 'GET',
                url: '/ProBuy1Get1/List',
                params: {
                    _order: parameters.orderBy || 'UpdateDate',
                    _limit: parameters.pageSize || 10,
                    _offset: parameters.page * parameters.pageSize || 0,
                    _direction: parameters.direction || 'asc',
                    _filter: parameters.filter || 'ALL',
                    searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
                }
            };

            return common.makeRequest(req);
        };

        service.export = function (tobj) {
            var path = '/ProBuy1Get1/Export';
            return common.makeRequest({
                responseType: 'arraybuffer',
                method: 'POST',
                url: path,
                data: tobj
            });
        };

        service.publish = function (tobj, Status) {
           var path = '/ProBuy1Get1/Create';
            if(typeof tobj.length != "undefined"){path = "/ProBuy1Get1/UpdateList";}
                       
            return common.makeRequest({
                method: 'POST',
                url: path,
                data: tobj
            });
        };


        service.bulkPublish = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/ProBuy1Get1/UpdateList',
                data: tobj
            });
        };

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/ProBuy1Get1/UpdateList',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
        service.deleteBulk = function (arr) {
            return common.makeRequest({
                method: 'POST',
                url: '/ProBuy1Get1/UpdateList',
                data: arr,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

        var StatusLookup = {};
        config.PRODUCT_STATUS.forEach(function (object) {
            StatusLookup[object.value] = object;
        });
        service.getStatus = function (abbreviation) {
            return StatusLookup[abbreviation];
        }

        service.serialize = function (fd) {
            var hasVariants = (!util.nullOrUndefined(fd.Variants) && fd.Variants.length > 0);

            //Cleaned data
            var clean = {};
            clean.Variants = [];


            try {
                
                clean.PromotionBuy1Get1ItemId   = fd.PromotionBuy1Get1ItemId;
                clean.NameEN                    = fd.NameEN;
                clean.NameTH                    = fd.NameTH;
                clean.URLKey                    = fd.URLKey;
                clean.PIDBuy                    = fd.PIDBuy;
                clean.PIDGet                    = fd.PIDGet;
                clean.ShortDescriptionTH        = fd.ShortDescriptionTH;
                clean.LongDescriptionTH         = fd.LongDescriptionTH;
                clean.ShortDescriptionEN        = fd.ShortDescriptionEN;
                clean.LongDescriptionEN         = fd.LongDescriptionEN;
               
                clean.ProductBoxBadge           = null;
                clean.Sequence                  = null;
                clean.Status                    = fd.Status;
                clean.CreateBy                  = fd.CreateBy;
                clean.Createdate                = null              
                clean.UpdateBy                  = fd.UpdateBy;
                clean.UpdateDate                = null
                clean.CreateIP                  = fd.CreateIP;
                clean.UpdateIP                  = fd.UpdateIP;
                clean.CMSStatusFlowId           = fd.CMSStatusFlowId;
                clean.Visibility           = fd.Visibility;


                if(fd.ExpiryDate && fd.EffectiveDate){
                    var cpdate = angular.copy(fd.ExpiryDate);
                    clean.ExpiryDate = moment(cpdate).format('LL');
                    clean.ExpiryTime = moment(cpdate).format('HH:mm:ss');

                    cpdate = angular.copy(fd.EffectiveDate);
                    clean.EffectiveDate = moment(cpdate).format('LL');
                    clean.EffectiveTime = moment(cpdate).format('HH:mm:ss');
                }
                
                console.log('buy 1 get 1 create', clean);
            } catch (ex) {
                console.warn("buy 1 get 1 create exception", ex);
            }
           

            return clean;
        }

         service.arrSerialize = function (fd) {
            var retObjArr =[]

            for(var index = 0 ; index <= fd.length ; index ++){
                var clean = {};
                try {

//console.log("loop value : " + index + ", cmsid : "+ fd[index].CMSId +", status : "+ fd[index].Status + ", EffectiveDate : " + fd[index].EffectiveDate );

                clean.PromotionBuy1Get1ItemId  = fd[index].PromotionBuy1Get1ItemId;
                clean.NameEN                    = fd[index].NameEN;
                clean.NameTH                    = fd[index].NameTH;
                clean.URLKey                    = fd[index].URLKey;
                clean.PIDBuy                    = fd[index].PIDBuy;
                clean.PIDGet                    = fd[index].PIDGet;
                clean.ShortDescriptionTH        = fd[index].ShortDescriptionTH;
                clean.LongDescriptionTH         = fd[index].LongDescriptionTH;
                clean.ShortDescriptionEN        = fd[index].ShortDescriptionEN;
                clean.LongDescriptionEN         = fd[index].LongDescriptionEN;
               
                clean.ProductBoxBadge           = fd[index].ProductBoxBadge;
                clean.Sequence                  = fd[index].Sequence;
                clean.Status                    = fd[index].Status;
                clean.CreateBy                  = fd[index].CreateBy;
                clean.Createdate                = fd[index].Createdate ;              
                clean.UpdateBy                  = fd[index].UpdateBy;
                clean.UpdateDate                = fd[index].UpdateDate ;
                clean.CreateIP                  = fd[index].CreateIP;
                clean.UpdateIP                  = fd[index].UpdateIP;
                clean.CMSStatusFlowId           = fd[index].CMSStatusFlowId;
                clean.Visibility           = fd[index].Visibility;


                if(fd[index].ExpiryDate && fd[index].EffectiveDate){
                    var cpdate = angular.copy(fd[index].ExpiryDate);
                    clean.ExpiryDate = moment(cpdate).format('LL');
                    clean.ExpiryTime = moment(cpdate).format('HH:mm:ss');

                    cpdate = angular.copy(fd[index].EffectiveDate);
                    clean.EffectiveDate = moment(cpdate).format('LL');
                    clean.EffectiveTime = moment(cpdate).format('HH:mm:ss');
                }
                               
               retObjArr.push(clean);
            } catch (ex) {
                console.warn("Arr serialize error", ex);
            }
            }
            
            return retObjArr;
        }

        service.deserialize = function (invFd, FullAttributeSet) {
       

            var transformed = {
                formData: invFd
            };



            console.log('transformation array', transformed);

            return transformed;
        };

        return service;
    }
];
