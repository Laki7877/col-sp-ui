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
      ['link' => '#', 'class' => 'btn-white', 'attributes' => '', 'name' => 'Export'],
      ['link' => '#', 'class' => 'btn-white', 'attributes' => '', 'name' => 'Import'],
      ['link' => '/?p=global_category', 'class' => 'btn-blue btn-width-xl', 'attributes' => '', 'name' => 'Add Product'],
    ];  
  }
?>
<div class="page-header with-border">
    <h1 class="float-left page-header-title ah-breadcrumb"><?= $newText ?></h1>
    <span class="float-right page-header-action">
      <? foreach ($buttons as $b): ?>
        <a href="<?= $b['link'] ?>" <?= $b['attributes'] ?> class="btn margin-left-10 <?= $b['class'] ?>">
          <span class=""><?= $b['name'] ?></span>
        </a>
      <? endforeach ?>
    </span>
</div>