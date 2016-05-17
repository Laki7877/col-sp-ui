//Products Collection Service
module.exports = ['$http', 'common', 'util', 'LocalCategory', 'Brand',
    function ($http, common, util, LocalCategory, Brand) {
        'use strict';
        var service = {};

        service.getOne = function (CMSId) {
            var req = {
                method: 'GET',
                url: '/CMSStages/' + CMSId
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

        service.duplicate = function (CMSId) {
            //this URL structure is weird dont u think
            var req = {
                method: 'POST',
                url: '/CMSStages/' + CMSId
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

     //Start CMSStage
        service.export = function (tobj) {
            var path = '/CMSStages/Export';
            return common.makeRequest({
                responseType: 'arraybuffer',
                method: 'POST',
                url: path,
                data: tobj
            });
        };

        service.publish = function (tobj, Status) {  
             var path = '/CMSStages';
            if(typeof tobj.length != "undefined"){path = "/CMSUpdateStages";}                       
            return common.makeRequest({
                method: 'POST',
                url: path,
                data: tobj
            });
        };

        service.bulkPublish = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages',
                data: tobj
            });
        };

        service.visible = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
      
         service.deleteBulk = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages',
                data: tobj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

         service.arrSerialize = function (fd) {
            var retObjArr =[]

            for(var index = 0 ; index <= fd.length ; index ++){
                var clean = {};
                try {

//console.log("loop value : " + index + ", cmsid : "+ fd[index].CMSId +", status : "+ fd[index].Status + ", EffectiveDate : " + fd[index].EffectiveDate );

                clean.CMSId = fd[index].CMSId;
                clean.CMSNameEN = fd[index].CMSNameEN;
                clean.CMSNameTH = fd[index].CMSNameTH;
                clean.URLKey = fd[index].URLKey ;
                clean.CMSTypeId = fd[index].CMSTypeId ;
                clean.CMSStatusId = fd[index].CMSStatusId;
                clean.Status = fd[index].Status ;
                clean.UpdateBy =fd[index].UpdateBy;
                clean.CreateBy =fd[index].CreateBy;
                clean.Visibility = fd[index].Visibility;

                clean.CreateIP =fd[index].CreateIP;
                clean.ShortDescriptionTH = fd[index].ShortDescriptionTH ;
                clean.LongDescriptionTH = fd[index].LongDescriptionTH;
                clean.ShortDescriptionEN = fd[index].ShortDescriptionEN ;
                clean.LongDescriptionEN = fd[index].LongDescriptionEN;

                clean.Sequence = fd[index].Sequence;
                clean.CMSCollectionGroupId =fd[index].CMSCollectionGroupId;
                clean.CMSStatusFlowId =fd[index].CMSStatusFlowId;


                if( !(typeof fd[index].ExpiryDate === 'undefined' || fd[index].ExpiryDate === null) ){
                     var cpdate = angular.copy(fd[index].ExpiryDate);
                                clean.ExpiryDate = moment(cpdate).format('LL');
                                clean.ExpiryTime = moment(cpdate).format('HH:mm:ss');
                }
               
                if( !(typeof fd[index].EffectiveDate === 'undefined' || fd[index].EffectiveDate === null) ){
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

        service.serialize = function (fd) {
            var hasVariants = (!util.nullOrUndefined(fd.Variants) && fd.Variants.length > 0);

            //Cleaned data
            var clean = {};
          

            try {

                clean.CMSId = fd.CMSId;
                clean.CMSNameEN = fd.CMSNameEN;
                clean.CMSNameTH = fd.CMSNameTH;
                clean.URLKey = fd.URLKey ;
                clean.CMSTypeId = fd.CMSTypeId ;
                clean.CMSStatusId = fd.CMSStatusId;
                clean.Status = fd.Status ;
                clean.UpdateBy =fd.UpdateBy;
                clean.CreateBy =fd.CreateBy;
                clean.Visibility = fd.Visibility;

                clean.CreateIP =fd.CreateIP;
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

        service.deserialize = function (invFd,  _Loading) {
          
            if (invFd.EffectiveDate != "" && invFd.EffectiveDate != null) {
                invFd.EffectiveDate = moment(invFd.EffectiveDate + " " + invFd.EffectiveTime);
                invFd.EffectiveTime = invFd.EffectiveTime;
            }

            if (invFd.ExpireDate != "" && invFd.ExpireDate != null) {
                invFd.ExpireDate = moment(invFd.ExpireDate + " " + invFd.ExpireTime);
                invFd.ExpireTime = invFd.ExpireTime;
            }
                  
            var transformed = {
                formData: invFd
            };
        
            console.log('transformation array', transformed);

            return transformed;
        };
    //End CMSStage


//Start CMSGroup

        service.getAllGroup = function (parameters) {
            var req = {
                method: 'GET',
                url: '/CMSGroupList',
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

        service.exportGroup = function (tobj) {
            var path = '/CMSStages/ExportGroup';
            return common.makeRequest({
                responseType: 'arraybuffer',
                method: 'POST',
                url: path,
                data: tobj
            });
        };

          service.publishGroup = function (tobj, Status) {  
             var path = '/CMSStages/Group';
            if(typeof tobj.length != "undefined"){path = "/CMSUpdateStages";}                       
            return common.makeRequest({
                method: 'POST',
                url: path,
                data: tobj
            });
        };

        service.bulkPublishGroup = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages/Group',
                data: tobj
            });
        };

        service.visibleGroup = function (obj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages/Group',
                data: obj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };
      
         service.deleteBulkGroup = function (tobj) {
            return common.makeRequest({
                method: 'POST',
                url: '/CMSUpdateStages/Group',
                data: tobj,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        };

         service.arrSerializeGroup = function (fd) {
            var retObjArr =[]

            for(var index = 0 ; index <= fd.length ; index ++){
                var clean = {};
                try {

                clean.CMSId = fd[index].CMSId;
                clean.CMSNameEN = fd[index].CMSNameEN;
                clean.CMSNameTH = fd[index].CMSNameTH;
                clean.URLKey = fd[index].URLKey ;
                clean.CMSTypeId = fd[index].CMSTypeId ;
                clean.CMSStatusId = fd[index].CMSStatusId;
                clean.Status = fd[index].Status ;
                clean.UpdateBy =fd[index].UpdateBy;
                clean.CreateBy =fd[index].CreateBy;
                clean.Visibility = fd[index].Visibility;

                clean.CreateIP =fd[index].CreateIP;
                clean.ShortDescriptionTH = fd[index].ShortDescriptionTH ;
                clean.LongDescriptionTH = fd[index].LongDescriptionTH;
                clean.ShortDescriptionEN = fd[index].ShortDescriptionEN ;
                clean.LongDescriptionEN = fd[index].LongDescriptionEN;

                clean.Sequence = fd[index].Sequence;
                clean.CMSCollectionGroupId =fd[index].CMSCollectionGroupId;
                clean.CMSStatusFlowId =fd[index].CMSStatusFlowId;


                if( !(typeof fd[index].ExpiryDate === 'undefined' || fd[index].ExpiryDate === null) ){
                     var cpdate = angular.copy(fd[index].ExpiryDate);
                                clean.ExpiryDate = moment(cpdate).format('LL');
                                clean.ExpiryTime = moment(cpdate).format('HH:mm:ss');
                }
               
                if( !(typeof fd[index].EffectiveDate === 'undefined' || fd[index].EffectiveDate === null) ){
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

        service.serializeGroup = function (fd) {
            var hasVariants = (!util.nullOrUndefined(fd.Variants) && fd.Variants.length > 0);

            //Cleaned data
            var clean = {};
          

            try {

                clean.CMSId = fd.CMSId;
                clean.CMSNameEN = fd.CMSNameEN;
                clean.CMSNameTH = fd.CMSNameTH;
                clean.URLKey = fd.URLKey ;
                clean.CMSTypeId = fd.CMSTypeId ;
                clean.CMSStatusId = fd.CMSStatusId;
                clean.Status = fd.Status ;
                clean.UpdateBy =fd.UpdateBy;
                clean.CreateBy =fd.CreateBy;
                clean.Visibility = fd.Visibility;

                clean.CreateIP =fd.CreateIP;
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

        service.deserializeGroup = function (invFd,  _Loading) {
          
            if (invFd.EffectiveDate != "" && invFd.EffectiveDate != null) {
                invFd.EffectiveDate = moment(invFd.EffectiveDate + " " + invFd.EffectiveTime);
                invFd.EffectiveTime = invFd.EffectiveTime;
            }

            if (invFd.ExpireDate != "" && invFd.ExpireDate != null) {
                invFd.ExpireDate = moment(invFd.ExpireDate + " " + invFd.ExpireTime);
                invFd.ExpireTime = invFd.ExpireTime;
            }
                  
            var transformed = {
                formData: invFd
            };
        
            console.log('transformation array', transformed);

            return transformed;
        };
//END CMSGroup

        return service;
    }
];
