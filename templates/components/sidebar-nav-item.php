<?php
$className = "sidebar-brand";
if ($active) $className .= " active";
?>
<li class="<?= $className ?>">
    <i class="fa <?=$icon?> sidebar-font-awesome"></i>
    <a href="#"><?= $name ?></a>
</li>