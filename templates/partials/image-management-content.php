<div id="image-management-content-page">
	<div class="row" ng-repeat="product in response.data">
		<div class="col-xs-12">
			<div class="form-section image-management">
				<div class="form-section-content">
					<div class="content-text">
						<div><h4>{{ product.ProductNameEn }}</h4>{{ product.VariantValue }}</div>
						<hr/>
						<div class="margin-top-5">PID: {{ product.Pid }}</div>
						<div class="margin-top-5">Status:</div>
						<div class="color-grey"><i class="fa fa-circle-o padding-right-5"></i>Draft</div>
					</div>
					<div class="picture-container">
						<div class="col-xs-12 padding-left-0">
							<nc-image-gallery ng-if="product.IsVariant" nc-model="product.VariantImg"></nc-image-gallery>
							<nc-image-gallery ng-if="!product.IsVariant" nc-model="product.MasterImg"></nc-image-gallery>
						</div>
					</div>
					<div class="drop-zone-container">
						<nc-image-dropzone ng-if="product.IsVariant" nc-model="product.VariantImg" nc-image-template="'common/product/dropzone/normal'"></nc-image-dropzone>
						<nc-image-dropzone ng-if="!product.IsVariant" nc-model="product.MasterImg" nc-image-template="'common/product/dropzone/normal'"></nc-image-dropzone>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>