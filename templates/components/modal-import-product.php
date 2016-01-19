<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-size-warning">
		<div class="modal-content">
			<div class="modal-body confirmation-modal no-margin">
				<div class="row">
					<div class="col-xs-12">
						<h2 class="font-size-20 text-centerx text-normal">Ready to import</h2>
						
						<div class="margin-top-20"><?= $newProductNum ?> new products to be imported</div>
						<div class="margin-bottom-30"><?= $updatedProductNum ?> products to be updated</div>
						
					</div>
					<div class="confirmation-action no-margin">
						<button class="btn btn-white" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-blue">Continue</button>
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->