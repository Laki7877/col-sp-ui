<div id="return_detail_information_tab_content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Return Detail</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/text-with-label', ["label" => "Reason for Return", "field_content" => "This shirt makes me look ugly. It is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."]) ?>
					<?php $this->insert('components/forms/input-text-with-label', ["label" => "CN Number"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>