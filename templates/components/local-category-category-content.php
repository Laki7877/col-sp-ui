<div class="category-content row no-margin">
	<div class="category-content-padding">
		<span class="col-xs-8 column-lc-name">
			<span class="lc-icon-name-warpper">
				<? if ($parent): ?>
					<i class="fa fa-chevron-down toggle-button local-category-toggle-area"></i>
				<? elseif ($no_child): ?>
					<span class="no-children-row"></span>
				<? else: ?>
					<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
				<? endif ?>
				<span><?= $category ?></span>
			</span>
		</span>
		<span class="col-xs-1"><?= $product_count ?></span>
		<span class="col-xs-1 text-align-center">
			<? if ($visible): ?>
				<i class="fa fa-eye color-dark-grey icon-size-20"></i>
			<? else: ?>
				<i class="fa fa-eye-slash color-grey icon-size-20"></i>
			<? endif ?>
		</span>
		<span class="col-xs-1 text-align-center">
			<i class="fa fa-gear color-dark-grey icon-size-20"></i>
			<i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div>
				<div>View Products</div>
				<div>Delete</div>">
			</i>	
		</span>
		<span class="col-xs-1 text-align-center">
			<i class="fa fa-arrows color-dark-grey icon-size-20"></i>
		</span>
	</div>
</div>