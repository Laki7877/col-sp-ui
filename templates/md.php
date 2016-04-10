<!--page-with-sidebar-->
<html class="no-js" lang="" ng-app="colspApp">
	<head>
		<script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
		<link rel="stylesheet" href="/assets/libs/selectize/dist/css/selectize.default.css"/>
		<!-- <script type="text/javascript" src="/assets/libs/selectize/dist/js/standalone/selectize.min.js"></script> -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
		<title>Test MD</title>
	</head>
	<body>

		
			<div ng-controller="TestCtrl">

				<form name="myform" ng-submit="$event.preventDefault()">
					Valid {{ myform.$valid }} <pre>{{ myform.$error | json }}</pre>
					<div class="container">
						<div class="row">
							<h1>u-me-select <small>select for you and me.</small></h1>
						</div>
						<div class="row">
							<strong>Single <code>&lt;you-me&gt;</code></strong>
							<p>
							When u and me are <strong>single</strong>, you can only choose one item at a time.
							</p>
						</div>
						<div class="row">
							<you-me display-by="ProductNameEn" placeholder="Search product by name or Pid" 
							auto-clear-search="true" group-by="_group"
							ng-model="x" refresh="querySearch" choices="choices"></you-me>
						</div>
						<div class="row">
							<br/>
							<strong>In a relationship <code>&lt;you-me in-relationship="true"&gt;</code></strong>
							<p>
							When u and me are <strong>together</strong>, we can be greedy and pick many items.
							</p>
						</div>
						<div class="row">
							

							<div nc-template="common/input/form-group-with-label" nc-label="Search Tags" nc-template-form="myform.sebun" nc-template-options-path="addProductForm/Keywords">
								<you-me display-by="ProductNameEn" max-tag-count="5" name="sebun" in-relationship="true" placeholder="+ Product" 
									ng-model="multiModel" refresh="querySearch" choices="choices"></you-me>
							</div>


						</div>
						<div class="row">
						<br/>
							<strong>It's complicated <code>&lt;you-me its-complicated="true"&gt;</code></strong>
							<p>
							When <strong>it's complicated</strong>, well I'm not sure how to explain this. Basically, tag.
							</p>
						</div>
						<div class="row">
							<you-me display-by="TagName" max-tag-count="3" freedom-of-speech="true" 
							its-complicated="true" in-rel placeholder="+ New Tag" 
							ng-model="tagModel" choices="kwdchoices"></you-me>

						</div>
					</div>
				</form>

			</div>
		
	</body>
</html>