<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-size-warning">
		<div class="modal-content">
			<div class="modal-header no-border">
    	    	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="padding-left-15" aria-hidden="true">&times;</span></button>
	        </div>
			<div class="modal-body confirmation-modal no-margin">
				<div class="row">
					<div class="col-xs-12 margin-bottom-30">
						<? if (empty($typeText)): ?>
							<h2 class="font-size-20 text-centerx text-normal margin-bottom-20">Ready to import</h2>
							<? if (!empty($newProductNum)): ?>
								<div><?= $newProductNum ?></div>
							<? endif ?>	
							<? if (!empty($updatedProductNum)): ?>
								<div><?= $updatedProductNum ?></div>
							<? endif ?>
						<? else :?>
							<h2 class="font-size-20 text-centerx text-normal margin-bottom-20">Ready to import</h2>
							<? if (!empty($newProductNum)): ?>
								<div><?= $newProductNum ?> new <?=$typeText?> to be imported</div>
							<? endif ?>	
							<? if (!empty($updatedProductNum)): ?>
								<div><?= $updatedProductNum ?> <?=$typeText?> to be updated</div>
							<? endif ?>	
						<? endif ?>					
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