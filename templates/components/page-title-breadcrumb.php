<?php
$extracted = explode('/', $text);
$extracted = array_map(function($item, $idx) {
  return "<a href=\"/?p=index\" class=\"ah-breadcrumb-path ah-breadcrumb-idx-$idx\">".$item.'</a>';
}, $extracted, array_keys($extracted));
$newText = implode('<span class="ah-breadcrumb-splitter">/</span>', $extracted);
?>
<?php
  if (! isset($buttons)) {
    $buttons = [
      ['link' => '#', 'class' => 'btn-white', 'attributes' => '', 'name' => 'Preview'],
      ['link' => '#', 'class' => 'btn-white btn-width-xl', 'attributes' => '', 'name' => 'Save as Draft'],
      ['link' => '#', 'class' => 'btn-blue btn-width-xl', 'attributes' => '', 'name' => 'Publish'],
    ];  
  }
?>
<div class="page-header no-padding <?=$borderClass?>">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <div class="page-actions float-right">
		<? foreach ($buttons as $b): ?>
        <a href="<?= $b['link'] ?>" <?= $b['attributes'] ?> class="btn margin-left-10 <?= $b['class'] ?>">
          <span class=""><?= $b['name'] ?></span>
        </a>
      <? endforeach ?>
	</div>
</div>