<?php
$className = "sidebar-brand";
if ($active) $className .= " active";
?>
<li ng-class="{'active' : $root.isUrl('<?= $url ?>')}" class="<?= $className ?>" <? if ($sub_sidebar): ?>data-toggle="sub-sidebar" data-target="<?= $sub_sidebar ?>"<? endif ?>>
    <i class="fa <?=$icon?> sidebar-font-awesome"></i>
    <a href="#"><?= $name ?></a>
</li>