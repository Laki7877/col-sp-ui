<?php
    $items = [
        [ "name" => "Home", "icon" => "fa-home"],
        [ "name" => "Orders", "icon" => "fa-inbox"],
        [ "name" => "Products", "icon" => "fa-tag", "sub_sidebar" => "#sub-sidebar-product", "url" => "/products" ],
        [ "name" => "Inventory", "icon" => "fa-archive" ],
        [ "name" => "Promotion", "icon" => "fa-bookmark" ],
        [ "name" => "Shop Setting", "icon" => "fa-sliders" ],
        [ "name" => "Report", "icon" => "fa-line-chart" ],
        [ "name" => "Account", "icon" => "fa-gear", "sub_sidebar" => "#sub-sidebar-account" ],
        [ "name" => "Collection", "icon" => "fa-product-hunt", "sub_sidebar" => "#sub-sidebar-product-collection", "url" => "/collections" ]
        [ "name" => "Buy 1 Get 1", "icon" => "fa-gift", "sub_sidebar" => "#sub-sidebar-buy1-get1", "url" => "/buy1get1" ]
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