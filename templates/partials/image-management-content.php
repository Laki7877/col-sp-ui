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
						<div class="col-xs-12 padding-left-0">
							<div class="feature-text color-dark-grey">Feature Image</div>
							<? $this->insert('components/image-thumbs-list', ["list_class" => "image-management-list", "action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550",
																										"/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
						</div>
					</div>
					<div class="drop-zone-container">
						<? $this->insert('components/image-dropzone-inline-text', ["id" => "images-management1", 'texts' =>['<i class="fa fa-image fa-3x color-theme"></i>', 'Drop images here', '<a href="#" data-trigger="file" data-target="#images-management1">or select images</a>']]) ?>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="form-section image-management">
				<div class="form-section-content">
					<div class="content-text">
						<div>Nike Air Max 2015</div>
						<div>Limited Edition</div>
						<div class="margin-top-5">PID: 1234567</div>
						<div class="margin-top-5">Status:</div>
						<div class="color-yellow"><i class="fa fa-clock-o padding-right-5"></i>Wait for Approval</div>
					</div>
					<div class="picture-container">
						<div class="col-xs-12 padding-left-0">
							<div class="feature-text color-dark-grey">Feature Image</div>
							<? $this->insert('components/image-thumbs-list', ["list_class" => "image-management-list", "action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550",
																										"/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
						</div>
					</div>
					<div class="drop-zone-container disabled">
						<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class="fa fa-ban fa-3x color-dark-grey"></i>', 'Cannot upload', 'Wait for Approval']]) ?>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="form-section image-management">
				<div class="form-section-content">
					<div class="content-text">
						<div>Nike Air Max 2015</div>
						<div>Limited Edition</div>
						<div class="margin-top-5">PID: 1234567</div>
						<div class="margin-top-5">Status:</div>
						<div class="color-green"><i class="fa fa-check-circle-o padding-right-5"></i>Approved</div>
					</div>
					<div class="picture-container">
						<div class="col-xs-12 padding-left-0">
							<div class="feature-text color-dark-grey">Feature Image</div>
							<? $this->insert('components/image-thumbs-list', ["list_class" => "image-management-list", "action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550",
																										"/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
						</div>
					</div>
					<div class="drop-zone-container no-background">
						<? $this->insert('components/image-dropzone-inline-text', ["id" => "images-management3", 'texts' =>['This product is already approved', '<a href="#" data-trigger="file" data-target="#images-management3">Click here to edit</a>']]) ?>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="form-section image-management">
				<div class="alert-wrapper">
						<? $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'Fail to upload photos', 'header_class' => 'font-weight-bold',
						 'text_multilines' => ['- Wrong file format. Please upload only JPG or PNG file.'
						,'- Reach over maximum of 10 images per products'
						, '- Images are too large. Maximum size:2000 x 2000 px and not over 1 mb per images.'
						, '- Some wrong go wrong with the servers'
						]]) ?>
				</div>
				<div class="form-section-content">
					<div class="content-text">
						<div>Nike Air Max 2015</div>
						<div>Limited Edition</div>
						<div class="margin-top-5">PID: 1234567</div>
						<div class="margin-top-5">Status:</div>
						<div class="color-red"><i class="fa fa-ban padding-right-5"></i>Not Approved</div>
					</div>
					<div class="picture-container">
						<div class="col-xs-12 padding-left-0">
							<div class="feature-text color-dark-grey">Feature Image</div>
							<? $this->insert('components/image-thumbs-list', ["list_class" => "image-management-list", "action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550",
																										"/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
						</div>
					</div>
					<div class="drop-zone-container">
						<? $this->insert('components/image-dropzone-inline-text', ["id" => "images-management4", 'texts' =>['<i class="fa fa-image fa-3x color-theme"></i>', 'Drop images here', '<a href="#" data-trigger="file" data-target="#images-management4">or select images</a>']]) ?>
					</div>
				</div>
			</div>
		</div>
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
						<div class="col-xs-12 padding-left-0">
							<div class="feature-text color-dark-grey">Feature Image</div>
							<? $this->insert('components/image-thumbs-list', ["list_class" => "image-management-list", "action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550",
																										"/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
						</div>
					</div>
					<div class="drop-zone-container disabled">
						<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class="fa fa-ban fa-3x color-dark-grey"></i>', 'Cannot upload', 'Reach Max Photos']]) ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>