<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section form-section-content-grey">
				<div class="form-section-header"><h2>Admin Panel</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/multiple-radio', ["label" => "Information Tab", "choices" => ['Wait for Approval','Approved','Not Approved'], "size" => "xxl", "label_class" => ["color-yellow","color-green margin-left-10","color-red margin-left-10"] ]) ?>
			        <?php $this->insert('components/forms/multiple-radio', ["label" => "Image Tab", "choices" => ['Wait for Approval','Approved','Not Approved'], "size" => "xxl", "label_class" => ["color-yellow","color-green margin-left-10","color-red margin-left-10"] ]) ?>
			        <?php $this->insert('components/forms/multiple-radio', ["label" => "Category Tab", "choices" => ['Wait for Approval','Approved','Not Approved'], "size" => "xxl", "label_class" => ["color-yellow","color-green margin-left-10","color-red margin-left-10"] ]) ?>
			        <?php $this->insert('components/forms/multiple-radio', ["label" => "Variation", "choices" => ['Wait for Approval','Approved','Not Approved'], "size" => "xxl", "label_class" => ["color-yellow","color-green margin-left-10","color-red margin-left-10"] ]) ?>
			        <?php $this->insert('components/forms/multiple-radio', ["label" => "More Options", "choices" => ['Wait for Approval','Approved','Not Approved'], "size" => "xxl", "label_class" => ["color-yellow","color-green margin-left-10","color-red margin-left-10"] ]) ?>
			        <?php $this->insert('components/forms/textarea-with-label', ["label" => "Reject Reason", "rows" => "4", "placeholder" => "Reason why you do not approve this product" ]) ?>

					<div class="form-group">
						<div class="width-label"><label class="control-label"></label></div>
						<div class="button-size-normal">
							<a class="button-size-normal btn btn-green btn-width-xl">Approve</a>
						</div>
			            <div class="button-size-normal margin-left-10">
			              <a class="button-size-normal btn btn-green btn-width-xl">Force Approve</a>
			            </div>
						<div class="button-size-normal margin-left-10">
							<a class="button-size-normal btn btn-red btn-width-xl">Reject</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>