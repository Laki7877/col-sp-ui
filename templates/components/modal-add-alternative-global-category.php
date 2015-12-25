<?php
    $numberOfColumn = 4;
?>
<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-category-section column-<?= $numberOfColumn ?>">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
            <div class="category-section column-<?= $numberOfColumn ?>">
                <div class="category-section-border-box">
                    <div class="category-header">
                        <span class="required">Global Category</span>
                    </div>
                    <div class="category-content no-padding">
                        <ul class="content-column">
                            <li class="category-active">Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                            <li>Electronic</li>
                            <li>Fashion</li>
                            <li>Home & Living</li>
                            <li>Mom & Kids</li>
                        </ul>
                        <ul class="content-column">
                            <li>Computer</li>
                            <li class="category-active">Phone</li>
                            <li>Speaker</li>
                        </ul>
                        <ul class="content-column">
                            <li>Smart Phone</li>
                            <li>Office Phone</li>
                            <li class="category-active">Accessory</li>
                        </ul>
                        <ul class="empty-column content-column"></ul>
                    </div>
                </div>
                <div class="category-footer no-padding">
                    <span>Only shown categories that are allowed for this store.</span>
                    <span class="float-right">
                        <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                        <button type="button" class="btn btn-blue btn-width-xl">Select</button>
                    </span>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>