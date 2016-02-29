<?php
    $items = [
        [ "name" => "Home", "icon" => "fa-home"],
        [ "name" => "Orders", "icon" => "fa-inbox"],
        [ "name" => "Products", "icon" => "fa-tag", "sub_sidebar" => "#sub-sidebar-product", "url" => "/products", "link" =>"/products" ],
        [ "name" => "Inventory", "icon" => "fa-archive", "sub_sidebar" => "#sub-sidebar-inventory", "url" => "/inventory", "link" =>"/inventory"],
        [ "name" => "Promotion", "icon" => "fa-bookmark", "sub_sidebar" => "#sub-sidebar-promotion" ],
        [ "name" => "Shop Setting", "icon" => "fa-sliders", "sub_sidebar" => "#sub-sidebar-shopsetting", "link" =>"/shops/settings" ],
        [ "name" => "Report", "icon" => "fa-line-chart" ],
        [ "name" => "Account", "icon" => "fa-gear", "sub_sidebar" => "#sub-sidebar-account" ],
        [ "name" => "Collection", "icon" => "fa-product-hunt", "sub_sidebar" => "#sub-sidebar-product-collection", "url" => "/collections" ],
        [ "name" => "Buy 1 Get 1", "icon" => "fa-gift", "sub_sidebar" => "#sub-sidebar-buy1get1", "url" => "/buy1get1" ]
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