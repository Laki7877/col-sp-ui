<?php
    $items = [
        [ "name" => "Home", "icon" => "fa-home" ],
        [ "name" => "Orders", "icon" => "fa-inbox" ],
        [ "name" => "Products", "icon" => "fa-tag", "sub_sidebar" => "#sub-sidebar-product" ],
        [ "name" => "Inventory", "icon" => "fa-archive" ],
        [ "name" => "Promotion", "icon" => "fa-bookmark", "link" => "/?p=coupons" ],
        [ "name" => "Shop Setting", "icon" => "fa-sliders", "link" => "/?p=shop_setting" ],
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