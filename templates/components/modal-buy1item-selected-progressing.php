<?
$progress = "0";
if (isset($percent)) $progress = $percent;
?>

<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-size-warning">
		<div class="modal-content">
			<div class="modal-header no-border">
	        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="padding-left-15" aria-hidden="true">&times;</span></button>
	        </div>
			<div class="modal-body confirmation-modal no-margin">
				<div class="row">
					<div class="col-xs-12 margin-bottom-30">
						<h2 class="font-size-20 text-centerx text-normal margin-bottom-20">{{ exporter.title }}</h2>
						<div class="progress">
						  <div class="progress-bar" role="progressbar" aria-valuenow="<?=$progress?>" aria-valuemin="0" aria-valuemax="100" style="width: {{ exporter.progress }}%;">
						    <span class="sr-only"><?=$progress?>% Complete</span>
						  </div>
						</div>
					</div>
					<div class="confirmation-action no-margin">
						<button class="btn btn-blue" data-dismiss="modal">Ok</button>
						<button class="btn btn-white" data-dismiss="modal">Cancel</button>						
						<!-- <button type="button" disabled class="btn btn-grey">Download</button> -->
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->