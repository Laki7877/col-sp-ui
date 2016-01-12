<?php
    $items = [
        [ "name" => "Admin Accounts", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-admin-account" ],
        [ "name" => "Attribute", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute" ],
        [ "name" => "Attribute Set", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute-set" ],
        [ "name" => "Brand", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-brand" ],
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