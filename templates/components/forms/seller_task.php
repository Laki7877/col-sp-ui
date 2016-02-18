<div class="home_task home_task_space">
  <div class="image-thumbs-img-wrapper">
      <img class="logo-imgx" src="<?= $this->asset('/assets/img/'.$image_name.'.png') ?>" />
  </div>
  <div class="home_task_text">
    <div class="font-size-18"><?=$field_header?></div>
    <div class="color-dark-grey"><?=$field_text?></div>
  </div>
  <div class="home_task_button">
    <div>
      <button class="btn btn-white btn-width-xxl" <?=$disble_status?> type="button"><?=$button_text?></button>
    </div>
  </div>
</div>