<div class="alert alert-<?=$color?>">
  <? if ($close): ?><a href="#" class="close color-<?=$color?> opacity-1" data-dismiss="alert" aria-label="close" title="close">&times;</a><? endif ?>
  <div class="<?=$header_class?>"><?= $text ?></div>
  <? if ($text_multilines): ?>
  	<? foreach ($text_multilines as $a_text_line): ?>
		<div><?=$a_text_line?></div>
	<? endforeach ?>
  <? endif ?>
</div>