<div ng-if="<?= $uploader ?>" class="image-drop-wrapper">
	<input nv-file-select uploader="<?= $uploader ?>" type="file" ng-delegatee="<?= $uploader ?>" onclick="this.value = null"/>
	<div nv-file-drop uploader="<?= $uploader ?>" class="image-drop-zone">
		<div class="image-drop-zone-text">
			<p><i class="fa fa-image fa-3x color-theme"></i></p>
			<p>Drag &amp; drop your product images here</p>
		</div>
	</div>
	<div ng-show="<?= $uploader ?>.isHTML5" class="image-select-alternative-text">
		<span>Or</span> <a href="javascript:;" ng-delegate="<?= $uploader ?>">Select Images from your computer</a>
	</div>
</div>