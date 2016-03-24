<?php
$className = "sidebar-brand";
if ($active) $className .= " active";
?>
<li ng-class="$root.activeParentUrl('<?= $url ?>', '<?=$sub_sidebar?>')" class="<?= $className ?>" <? if ($sub_sidebar): ?> data-toggle="sub-sidebar" data-target="<?= $sub_sidebar ?>"<? endif ?>>
    <a href="<?=$link?>">
      <i class="fa <?=$icon?> fa-fw sidebar-font-awesome"></i>
      <?= $name ?>
    </a>
</li>
