<div id="image-management-content-page">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section image-management">
				<div class="form-section-content">
					<div class="content-text">
						<div>Nike Air Max 2015</div>
						<div>Limited Edition</div>
						<div class="margin-top-5">PID: 1234567</div>
						<div class="margin-top-5">Status:</div>
						<div class="color-grey"><i class="fa fa-circle-o padding-right-5"></i>Draft</div>
					</div>
					<div class="picture-container">
						<div class="padding-left-15 padding-right-15">
							<div class="col-xs-12">
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<? $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '1,500', 'updatedProductNum' => '300']) ?>
