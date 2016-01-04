<?php
    $items = [
        [ "name" => "Attribute", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute" ],
        [ "name" => "Attribute Set", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute-set" ],
        [ "name" => "Category", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-category" ]
    ];
?>
<ul class="sidebar-nav no-padding">
    <?php
        foreach ($items as $item) {
            $moreOptions = ['active' => $itemActive == $item["name"]];
            $vars = array_merge($item, $moreOptions);
            $this->insert('components/sidebar-nav-item', $vars);
        }
    ?>
</ul>