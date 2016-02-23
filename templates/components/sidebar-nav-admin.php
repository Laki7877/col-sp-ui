<?php
    $items = [


        [ "name" => "Products", "icon" => "fa-tag", "sub_sidebar" => "#sub-admin-products", "link" =>"/admin/products" ],
        [ "name" => "Accounts", "icon" => "fa-user", "sub_sidebar" => "#sub-admin-accounts", "link" =>"/admin/shops" ],
        [ "name" => "Promotion", "icon" => "fa-bookmark", "sub_sidebar" => "#sub-admin-promotion", "link" =>"/admin/coupons/global" ],
        [ "name" => "Reports", "icon" => "fa-line-chart", "sub_sidebar" => "#sub-admin-reports", "link" =>"/admin/reports" ],
        [ "name" => "Others", "icon" => "fa-sliders", "sub_sidebar" => "#sub-admin-others", "link" =>"/admin/newsletters" ],

        // [ "name" => "Admin Accounts", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-admin-account" ],
        // [ "name" => "Admin Roles", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-admin-role" ],
        // [ "name" => "Shop Accounts", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-admin-shop-account" ],
        // [ "name" => "Shop Types", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-admin-shop-type" ],
        // [ "name" => "Attribute", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute" ],
        // [ "name" => "Attribute Set", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-attribute-set" ],
        // [ "name" => "Brand", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-brand" ],
        // [ "name" => "Category", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-category" ],
        // [ "name" => "Product Approval", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-product-approval" ],
        // [ "name" => "All Product", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-all-product" ],
        // [ "name" => "Promotion", "icon" => "fa-chevron-right", "sub_sidebar" => "#sub-promotion" ]

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
