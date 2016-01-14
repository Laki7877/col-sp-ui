<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-size-warning">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<div class="modal-body confirmation-modal">
				<div class="row">
					<div class="confirmation-modal-text">
						<div class="sign-icon color-yellow"><i class="fa fa-exclamation-circle"></i></div>
						<span class="warning-text font-size-18">You are about to leave this page</span>
						<span class="warning-text">Do you want to save changes before exit?</span>
					</div>
					<div class="confirmation-action">
						<button class="col-xs-6 btn btn-white" data-dismiss="modal">Don't Save and Exit</button>
						<button type="button" class="col-xs-6 btn btn-blue">Save and Exit</button>
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->