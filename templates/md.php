<!--page-with-sidebar-->
<html class="no-js" lang="" ng-app="colspApp">
	<head>
		<script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
		<link rel="stylesheet" href="/assets/libs/selectize/dist/css/selectize.default.css"/>
		<script type="text/javascript" src="/assets/libs/selectize/dist/js/standalone/selectize.min.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
		<title>Test MD</title>
	</head>
	<body>

		<form ng-submit="$event.preventDefault()">
			<div ng-controller="TestCtrl">
				<div class="container">
					<div class="row">
						<h1>u-me-select <small>select for you and me.</small></h1>
					</div>
					<div class="row">
						<strong>Single</strong>
						<p>
						When u and me are single, you can only select one item at a time.
						</p>
					</div>
					<div class="row">
						<ume-single placeholder="Search product by name or Pid" ng-model="x" refresh="querySearch" choices="choices">
								<span>{{ item.ProductNameEn }}</span> <!--TODO-->
						</ume-single>
					</div>
				</div>
			</div>
		</form>
	</body>
</html>