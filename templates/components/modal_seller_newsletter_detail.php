<div class="modal fade modal-custom" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section-content">
                <div class="color-grey"><?=$date?></div>
                <div class="color-grey"><?=$author?></div>
                <p class="margin-top-30">
                  <?=$content?>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- <div class="modal-footer">
            
      </div> -->
    </div>
  </div>
</div>