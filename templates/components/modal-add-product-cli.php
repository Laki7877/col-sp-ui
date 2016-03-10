<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-size-warning" style="width:1024px;">
		<div class="modal-content">
			<div class="modal-header no-border">
	        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="padding-left-15" aria-hidden="true">&times;</span></button>
	        </div>
			<div class="modal-body confirmation-modal no-margin">
				<div class="row">
					<div class="col-xs-12 margin-bottom-30">
						<h2 class="font-size-20 text-centerx text-normal margin-bottom-20">Buy 1 Item Select</h2>

					 <?php $this->insert('partials/selected_product_item_list_content', ['text' => 'Products' ,'id' =>'buy1itemmodal' ]) ?>
				
					</div>
					<div class="confirmation-action no-margin">
						<button class="btn btn-white" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-blue" data-toggle="modal" ng-click="<?= $confirmfunc ?>" >Confirm Selected</button>
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->