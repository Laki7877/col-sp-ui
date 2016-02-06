<?php
    $items = [
        [ "name" => "Home", "icon" => "fa-home" ],
        [ "name" => "Orders", "icon" => "fa-inbox", "link" => "/?p=inventory"  ],
        [ "name" => "Products", "icon" => "fa-tag", "sub_sidebar" => "#sub-sidebar-product" ],
        [ "name" => "Inventory", "icon" => "fa-archive", "sub_sidebar" => "#sub-sidebar-inventory" ],
        [ "name" => "Promotion", "icon" => "fa-bookmark", "sub_sidebar" => "#sub-sidebar-promotion"],
        [ "name" => "Shop Setting", "icon" => "fa-sliders", "link" => "/?p=seller_shop_setting" ],
        [ "name" => "Report", "icon" => "fa-line-chart" ],
        [ "name" => "Account", "icon" => "fa-gear", "sub_sidebar" => "#sub-sidebar-account" ],
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