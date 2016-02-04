<?php
$className = "sidebar-brand";
if ($active) $className .= " active";
?>
<? if (empty($link)): $link = "#";?>
<? endif ?>

<li class="<?= $className ?>" <? if ($sub_sidebar): ?>data-toggle="sub-sidebar" data-target="<?= $sub_sidebar ?>"<? endif ?>>
    <i class="fa <?=$icon?> sidebar-font-awesome"></i>
    <a href="<?=$link?>"><?= $name ?></a>

</li>