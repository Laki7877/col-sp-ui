<?php
    $items = [
        [ "name" => "Attribute", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute", "url" => "/admin/attributes" ],
        [ "name" => "Attribute Set", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute-set", "url" => "/admin/attributesets" ],
        [ "name" => "Brand", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-brand", "url" => "/admin/brands" ],
        [ "name" => "Category", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-category", "url" => "/admin/categories" ]
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