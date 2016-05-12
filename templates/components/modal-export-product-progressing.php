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
					<div class="col-xs-12">
						<h2 class="font-size-20 text-centerx text-normal margin-bottom-20">{{exporter.title}}</h2>
						<div nc-loading-small="Processing..."></div>
					</div>
					<div class="confirmation-action no-margin">
						<!--button class="btn btn-white" data-dismiss="modal">Cancel</button-->

						<a id="export_download_btn" download="ProductExport.csv"></a>
						<!-- <button type="button" disabled class="btn btn-grey">Download</button> -->
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->
