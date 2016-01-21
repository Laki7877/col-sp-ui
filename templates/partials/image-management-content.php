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
						<div class="padding-left-15">
							<div class="col-xs-12">
								<div class="feature-text color-grey">Feature Image</div>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
					<div class="drop-zone-container">
						<? $this->insert('components/image-dropzone', ["id" => "images-management", 'text' =>'Drop images here', 'select_element' => '<span><a href="#" data-trigger="file" data-target="#<?= $id ?>_input">Select Images</a></span>',
							'alternative_class' => 'hide-component'
						]) ?>
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
						<div class="">
							<div class="col-xs-12">
								<div class="feature-text color-grey">Feature Image</div>								
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
					<div class="drop-zone-container wait-for-approve">
						<? $this->insert('components/image-approval', ["id" => "images-management", 
							'alternative_class' => 	'hide-component', 'text' => 'Wait for Approval'
						]) ?>
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
						<div class="padding-left-15">
							<div class="col-xs-12">
								<div class="feature-text color-grey">Feature Image</div>								
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
					<div class="drop-zone-container approved">
						<? $this->insert('components/image-approved', ["id" => "images-management", 'select_element' => '<span><a href="#" data-trigger="file" data-target="#<?= $id ?>_input">Click here to edit</a></span>',
							'alternative_class' => 'hide-component'
						]) ?>
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
						<div class="color-red"><i class="fa fa-ban padding-right-5"></i>Not Approved</div>
					</div>
					<div class="picture-container">
						<div class="padding-left-15">
							<div class="col-xs-12">
								<div class="feature-text color-grey">Feature Image</div>								
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
					<div class="drop-zone-container">
						<? $this->insert('components/image-dropzone', ["id" => "images-management", 'text' =>'Drop images here', 'select_element' => '<span><a href="#" data-trigger="file" data-target="#<?= $id ?>_input">Select Images</a></span>',
							'alternative_class' => 'hide-component'
						]) ?>
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
						<div class="padding-left-15">
							<div class="col-xs-12">
								<div class="feature-text color-grey">Feature Image</div>								
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
								<? $this->insert('components/image-thumbs-list', ["action" => 3, "images" => ["/assets/img/placeholder-no-image.png", "https://placehold.it/350x150", "https://placehold.it/350x550", "https://placehold.it/350x550", "https://placehold.it/350x550"]]) ?>
							</div>
						</div>
					</div>
					<div class="drop-zone-container wait-for-approve">
						<? $this->insert('components/image-approval', ["id" => "images-management", 
							'alternative_class' => 	'hide-component', 'text' => 'Reach Max Photos'
						]) ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>