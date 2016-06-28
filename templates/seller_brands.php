<?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - All Products'])
?>
<?php $this->start('page-body') ?>

<script type="text/ng-template" id="page-btn-controls">
  <div class="float-right" ng-if="!_loading.state">
    <a class="btn btn-white btn-width-xl" ng-href="/admin/products">Cancel</a>
    <button type="submit" class="btn btn-blue margin-left-10 btn-width-xl">Save</button>
  </div>
</script>

<div ng-controller="SellerBrandCtrl" >
  <div class="row">
    <h1>form-builder</h1>
    <hr/>

    <div class="col-md-8">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="panel-title" style="height:2em;">
            <h5 style="float:left;">Builder</h5>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" style="border:2px #F9B801 solid;border-radius: 3px;background-color: #FC5B3C;float:right;color:#F9B801;">
              <strong>Preview</strong>
            </button>
            <!-- Modal -->
            <div id="myModal" class="modal modal-wide fade" role="dialog">
              <div class="modal-dialog" style="width: 90%">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Form Builder</h4>
                  </div>
                  <div class="modal-body" style="margin:3px;">
                    <div class="row">
                      <form class="form-horizontal">
                        <div ng-model="input" fb-form="default" fb-default="defaultValue" id="formPreview"></div>
                      </form>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div fb-builder="default"></div>
        <div class="panel-footer">
          <div class="checkbox">
            <label>
              <input type="checkbox" ng-model="isShowScope" />
              Show scope
            </label>
          </div>
          <pre ng-if="isShowScope">{{form}}</pre>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div style="position:relative;">
        <div fb-components="" style="height:80%;overflow-y:auto;overflow-x:hidden;position: fixed;"></div>
      </div>

    </div>
  </div>
</div>

<?php $this->stop() ?>
