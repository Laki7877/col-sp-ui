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
							<? $this->insert('components/image-thumbs-list', [
								"action" => 2, 
								"images" => '[{}]',
								"uploader" => '']) ?>
						</div>
					</div>
					<div class="drop-zone-container">
						<? $this->insert('components/image-dropzone-inline-text', ["id" => "images-management1", 'texts' =>['<i class="fa fa-image fa-3x color-theme"></i>', 'Drop images here', '<a href="#" data-trigger="file" data-target="#images-management1">or select images</a>']]) ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>