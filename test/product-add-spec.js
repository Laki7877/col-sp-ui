describe('Automated Man', function() {

  var width = 1200;
  var height = 2000;
  browser.driver.manage().window().setSize(width, height);

  var random1000  =  Math.floor(Math.random()*10000);
  var defaultSleep = 500;

  var userid = "tester@protractor.com";
  var userpwd = "test1234";
  var shopname = "Protractor"

  it('should login', function() {

    browser.get('http://localhost:5000/login');

    browser.sleep(defaultSleep);

    var username = element(by.model('uform.user'));
    var password = element(by.model('uform.pass'));
    username.sendKeys(userid);
    password.sendKeys(userpwd);


    var login_submit = element(by.xpath('//button[@type="submit"]'));
    login_submit.click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('#sidebar-wrapper')), 5000);
    browser.sleep(500);

  });

// //----------- USER ROLES ----------//
//   it('should create new a user role', function(){
//     browser.get('http://localhost:5000/roles');
//
//     element(by.xpath('//a[text()="Add User Role"]')).click();
//     element(by.model('formData.GroupNameEn')).sendKeys('ROLE ' + timeStamp());
//     element(by.model('obj.selectAll')).click();
//
//     saveChanges('.main-form-action .btn-blue');
//
//     element(by.css('.alert a')).click();
//
//     browser.sleep(defaultSleep);
//
//   });

// //----------- USER ACCOUNTS ----------//
//   it('should create a new user', function(){
//     browser.get('http://localhost:5000/accounts');
//
//     element(by.xpath('//a[text()="Add User Account"]')).click();
//     element(by.model('formData.Email')).sendKeys('a' + random1000 + '@account.com');
//     element(by.model('formData.NameEn')).sendKeys('USER ' + timeStamp());
//     element(by.model('formData.Phone')).sendKeys('086' + Math.floor(Math.random()*1000000));
//
//     var text_account_password  = 'test1234';
//     element(by.model('formData.Password')).sendKeys(text_account_password);
//     element(by.model('formData.ConfirmPassword')).sendKeys(text_account_password);
//
//     element(by.model('formData.UserGroup')).click();
//     element(by.css('#ui-select-choices-row-1-0')).click();
//
//     saveChanges('.main-form-action .btn-blue');
//
//     element(by.css('.alert a')).click();
//
//     browser.sleep(defaultSleep);
//
//   });
//
// //----------- SHOP PROFILE ----------//
//   it('should fill out shop profile', function(){
//     browser.get('http://localhost:5000/shops/settings');
//
//     browser.sleep(defaultSleep);
//
//     element(by.model('formData.ShopNameEn')).clear().sendKeys(shopname + " " + random1000);
//     element(by.model('formData.DomainName')).clear().sendKeys('domain_name_' + random1000);
//     element(by.model('formData.UrlKey')).clear().sendKeys('url-' + random1000);
//     element(by.model('formData.ShopDescriptionEn')).clear().sendKeys('This is written at ' + timeStamp());
//     element(by.model('formData.ShopDescriptionTh')).clear().sendKeys('เขียนตอน ' + timeStamp());
//     element(by.model('formData.FloatMessageEn')).clear().sendKeys('Hello ' + timeStamp());
//     element(by.model('formData.FloatMessageTh')).clear().sendKeys('ฮาโหล ' + timeStamp());
//     element(by.model('formData.ShopAddress')).clear().sendKeys('Shop Address ' + random1000);
//     element(by.model('formData.Facebook')).clear().sendKeys('http://www.facebook.com/' + random1000);
//     element(by.model('formData.YouTube')).clear().sendKeys('http://www.youtube.com/' + random1000);
//     element(by.model('formData.Twitter')).clear().sendKeys('http://www.twitter.com/' + random1000);
//     element(by.model('formData.Instagram')).clear().sendKeys('http://www.instagram.com/' + random1000);
//     element(by.model('formData.Pinterest')).clear().sendKeys('http://www.pinterest.com/' + random1000);
//     element(by.model('formData.StockAlert')).clear().sendKeys(random1000);
//
//     browser.sleep(defaultSleep);
//
//     saveChanges('.main-form-action .btn-blue');
//
//   });
//
// //----------- LOCAL CATEGORY ----------//
//   it('should add local category', function(){
//     browser.get('http://localhost:5000/categories');
//
//     browser.sleep(defaultSleep);
//
//     element(by.css('.page-header-action .btn-blue')).click();
//     element(by.model('formData.NameEn')).sendKeys('Local EN ' + timeStamp());
//     element(by.model('formData.NameTh')).sendKeys('Local TH ' + timeStamp());
//     element(by.model('formData.UrlKey')).sendKeys('url' + random1000);
//     element(by.model('formData.SortBy')).click();
//     element(by.css('.ui-select-choices-row.active')).click();
//
//     browser.sleep(defaultSleep);
//
//     saveChanges('.modal-header .btn-blue');
//
//     browser.sleep(defaultSleep);
//
//   });

// //----------- ADD PRODUCT MIN ----------//
//   it('should add new minimum product and save as draft', function(){
//     browser.get('http://localhost:5000/products');
//     element(by.css('.page-header-action .btn-blue')).click();
//
//     selectGlobalCategory('Imaginary Land','Pokemon');
//
//     element(by.model('variantPtr.ProductNameEn')).sendKeys('Product MIN ' + timeStamp());
//     element(by.model('variantPtr.ProductNameTh')).sendKeys('สินค้า MIN ' + timeStamp());
//     element(by.model('variantPtr.Sku')).sendKeys('SKU' + random1000);
//
//     selectBrand('NIKE');
//
//     var price = random1000 + 5000;
//
//     element(by.model('variantPtr.SalePrice')).sendKeys(price);
//
//     browser.sleep(defaultSleep);
//
//     saveChanges('.main-form-action .btn-white');
//
//     browser.sleep(defaultSleep);
//
//   });

// //----------- ADD PRODUCT MAX ----------//
//   it('should add new product and fill out "Vital Information" in "Information Tab"', function(){
//     browser.get('http://localhost:5000/products');
//     element(by.css('.page-header-action .btn-blue')).click();
//
//     selectGlobalCategory('Imaginary Land','Pokemon');
//
//     element(by.model('variantPtr.ProductNameEn')).sendKeys('Product MAX ' + timeStamp());
//     element(by.model('variantPtr.ProductNameTh')).sendKeys('สินค้า MAX ' + timeStamp());
//     element(by.model('variantPtr.ProdTDNameEn')).sendKeys('ProdTDNameEn ' + randomX(5));
//     element(by.model('variantPtr.ProdTDNameTh')).sendKeys('ProdTDNameTh ' + randomX(5));
//     element(by.model('variantPtr.Sku')).sendKeys('SKU' + random1000);
//     element(by.model('variantPtr.Upc')).sendKeys(randomX(13));
//     selectBrand('NIKE');
//
//   });
//
//   it('should add new product and fill out "Price" in "Information Tab"', function(){
//     var price = random1000 + 5000;
//
//     browser.executeScript('window.scrollTo(0,700);');
//     browser.sleep(1000);
//     element(by.model('variantPtr.SalePrice')).sendKeys(price);
//     element(by.model('variantPtr.OriginalPrice')).sendKeys(price + 1);
//     var input_installment = element(by.model('variantPtr.Installment'));
//     selectDropdown(input_installment,'2');
//     //browser.executeScript('window.scrollTo(0,1100);');
//     browser.sleep(1000);
//
//     element(by.model('variantPtr.PromotionPrice')).sendKeys(price - 1);
//
//     element(by.css('#dropdown_promotion_effective_date')).click();
//     selectDate();
//
//     element(by.css('#dropdown_promotion_expire_date')).click();
//     element(by.css('.open .dropdown-menu .glyphicon-arrow-right')).click();
//     selectDate();
//     element(by.css('#dropdown_promotion_expire_date')).sendKeys("\t");
//
//     element(by.model('variantPtr.UnitPrice')).sendKeys(price - 1);
//     element(by.model('variantPtr.PurchasePrice')).sendKeys(price - 1);
//     element(by.model('variantPtr.SaleUnitEn')).clear().sendKeys('SaleUnitEn ' + randomX(5));
//     element(by.model('variantPtr.SaleUnitTh')).clear().sendKeys('SaleUnitTh ' + randomX(5));
//
//     var input_isvat = element(by.model('variantPtr.IsVat'));
//     selectDropdown(input_isvat,'2');
//   });
//
//   it('should add new product and fill out "Attributes" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,1200);');
//
//     var attribute_set = element(by.model('formData.AttributeSet')).element(by.css('input'));
//     attribute_set.click();
//     attribute_set.clear().sendKeys('pokemon');
//     browser.sleep(500);
//     attribute_set.sendKeys(protractor.Key.ENTER);
//     browser.sleep(500);
//
//     var pokemon_type_1 = element(by.css('.form-group select[name=AmapInput0]'));
//     selectDropdown(pokemon_type_1,'2');
//
//     var pokemon_type_2 = element(by.css('.form-group select[name=AmapInput1]'));
//     selectDropdown(pokemon_type_2,'3');
//   });
//
//   it('should add new product and fill out "Default Attributes" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,2300);');
//
//     var test_required_default_attribute = element(by.model('formData.MasterAttribute[da.AttributeId].ValueEn'));
//     test_required_default_attribute.sendKeys(randomX(10));
//
//     var test_required_default_attribute_th = element(by.model('formData.MasterAttribute[da.AttributeId].ValueTh'));
//     test_required_default_attribute_th.sendKeys(randomX(10));
//
//   });
//
//   it('should add new product and fill out "Description" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,3000);');
//
//     element(by.model('variantPtr.DescriptionShortEn')).sendKeys('DescriptionShortEn ' + randomX(5));
//     element(by.model('variantPtr.DescriptionShortTh')).sendKeys('DescriptionShortTh ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint1En')).sendKeys('KillerPoint1En ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint1Th')).sendKeys('KillerPoint1Th ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint2En')).sendKeys('KillerPoint2En ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint2Th')).sendKeys('KillerPoint2Th ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint3En')).sendKeys('KillerPoint3En ' + randomX(5));
//     element(by.model('variantPtr.KillerPoint3Th')).sendKeys('KillerPoint3Th ' + randomX(5));
//   });
//
//   it('should add new product and fill out "Search Tag" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,3600);');
//     var input_search_tags = element(by.model('formData.Tags')).element(by.css('input'));
//     input_search_tags.click();
//     input_search_tags.sendKeys('tag'+randomX(4));
//     input_search_tags.sendKeys(protractor.Key.ENTER);
//
//     input_search_tags.sendKeys('tag'+randomX(4));
//     input_search_tags.sendKeys(protractor.Key.ENTER);
//
//     input_search_tags.sendKeys('tag'+randomX(4));
//     input_search_tags.sendKeys(protractor.Key.ENTER);
//   });
//
//   it('should fill out "Inventory" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,4300);');
//     element(by.model('variantPtr.Quantity')).sendKeys('100');
//     element(by.model('variantPtr.SafetyStock')).clear().sendKeys('50');
//     element(by.model('variantPtr.MinQtyAllowInCart')).clear().sendKeys('1');
//     element(by.model('variantPtr.MaxQtyAllowInCart')).clear().sendKeys('100');
//
//     var input_stock_type = element(by.model('variantPtr.StockType'));
//     selectDropdown(input_stock_type,'3');
//     browser.sleep(1000);
//     element(by.model('variantPtr.MaxQtyPreOrder')).clear().sendKeys(99);
//     browser.sleep(1000);
//     browser.executeScript('window.scrollTo(0,4400);');
//     var has_expiry_date = element(by.model('variantPtr.IsHasExpiryDate'));
//     selectDropdown(has_expiry_date,'2');
//   });
//
//   it('should add new product and fill out "Shipping Detail" in "Information Tab"', function(){
//     browser.executeScript('window.scrollTo(0,4800);');
//     element(by.model('variantPtr.DeliveryFee')).sendKeys(randomX(3));
//     element(by.model('variantPtr.PrepareDay')).sendKeys('5');
//     element(by.model('variantPtr.LimitIndividualDay')).click();
//     element(by.model('variantPtr.PrepareMon')).sendKeys('1');
//     element(by.model('variantPtr.PrepareTue')).sendKeys('2');
//     element(by.model('variantPtr.PrepareWed')).sendKeys('3');
//     element(by.model('variantPtr.PrepareThu')).sendKeys('4');
//     element(by.model('variantPtr.PrepareFri')).sendKeys('5');
//     element(by.model('variantPtr.PrepareSat')).sendKeys('6');
//     element(by.model('variantPtr.PrepareSun')).sendKeys('7');
//
//     element(by.model('variantPtr.Length')).sendKeys(randomX(3));
//     element(by.model('variantPtr.Height')).sendKeys(randomX(3));
//     element(by.model('variantPtr.Width')).sendKeys(randomX(3));
//
//     browser.executeScript('window.scrollTo(0,5200);');
//
//     var dimension_unit = element(by.model('variantPtr.DimensionUnit'));
//     selectDropdown(dimension_unit,'2');
//
//     element(by.model('variantPtr.Weight')).sendKeys(randomX(3));
//
//     var weight_unit = element(by.model('variantPtr.WeightUnit'));
//     selectDropdown(weight_unit,'2');
//
//     browser.sleep(defaultSleep);
//
//   });
//
//   it('should fill out "Product Images" in "Image Tab"', function(){
//
//     browser.executeScript('window.scrollTo(0,0);');
//     element(by.xpath('//a[@href="#images"]')).click();
//
//     var path = require('path');
//     var fileToUpload = 'images/1600x1600A.jpg';
//     var absolutePath = path.resolve(__dirname, fileToUpload);
//
//     $('input[type="file"]').sendKeys(absolutePath);
//     browser.sleep(3000);
//
//     var EC = protractor.ExpectedConditions;
//     var video_link = element(by.model('variantPtr.VideoLinks[$index].Url'));
//     browser.wait(EC.visibilityOf(video_link), 5000);
//     video_link.sendKeys('https://www.youtube.com/watch?v=f78M4nKW1Ms');
//
//     //saveChanges('.main-form-action .btn-white');
//
//     browser.sleep(defaultSleep);
//   });
//
//   it('should fill out "Global and Local Category" in "Category Tab"', function(){
//
//     browser.executeScript('window.scrollTo(0,0);');
//     element(by.xpath('//a[@href="#category"]')).click();
//     element(by.css('.panel-select-global-category .fa-plus-circle')).click();
//
//     browser.sleep(defaultSleep);
//
//     selectGlobalCategory('Imaginary Land','Film Camera & Accessories');
//
//     element(by.css('.panel-select-local-category .fa-plus-circle')).click();
//
//     selectGlobalCategory('Dont Delete Me','Test Local Category');
//
//   });
//
//   it('should fill out "SEO" in "More Options Tab"', function(){
//
//     browser.executeScript('window.scrollTo(0,0);');
//     element(by.xpath('//a[@href="#moreoption"]')).click();
//
//     browser.sleep(defaultSleep);
//
//     element(by.model('variantPtr.SEO.SeoEn')).sendKeys('SeoEn ' + randomX(3));
//     element(by.model('variantPtr.SEO.SeoTh')).sendKeys('SeoTh ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaTitleEn')).sendKeys('MetaTitleEn ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaTitleTh')).sendKeys('MetaTitleTh ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaDescriptionEn')).sendKeys('MetaDescriptionEn ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaDescriptionTh')).sendKeys('MetaDescriptionTh ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaKeywordEn')).sendKeys('MetaKeywordEn ' + randomX(3));
//     element(by.model('variantPtr.SEO.MetaKeywordTh')).sendKeys('MetaKeywordTh ' + randomX(3));
//     element(by.model('variantPtr.SEO.ProductUrlKeyEn')).clear().sendKeys('url-key-' + randomX(10));
//     element(by.model('variantPtr.SEO.ProductBoostingWeight')).clear().sendKeys(randomX(4));
//
//   });
//
//   it('should fill out "More Detail" in "More Options Tab"', function(){
//     browser.executeScript('window.scrollTo(0,1300);');
//
//     element(by.css('#dropdown2')).click();
//     selectDate();
//
//     element(by.css('#dropdown3')).click();
//     element(by.css('.open .dropdown-menu .glyphicon-arrow-right')).click();
//     selectDate();
//
//     element(by.css('#dropdown4')).click();
//     selectDate();
//
//     var gift_wrap = element(by.model('formData.GiftWrap'));
//     selectDropdown(gift_wrap,'2');
//
//     element(by.model('formData.ControlFlags.IsNew')).click();
//     element(by.model('formData.ControlFlags.IsClearance')).click();
//     element(by.model('formData.ControlFlags.IsBestSeller')).click();
//     element(by.model('formData.ControlFlags.IsOnlineExclusive')).click();
//     element(by.model('formData.ControlFlags.IsOnlyAt')).click();
//     element(by.model('formData.Remark')).sendKeys('Remark ' + randomX(4));
//
//   });
//
//   it('should add "Variant" in "Variation Tab"', function(){
//
//     browser.executeScript('window.scrollTo(0,0);');
//     element(by.xpath('//a[@href="#variation"]')).click();
//
//     element(by.xpath('//a[text()="Enable Variation"]')).click();
//
//     var variant_select_option = element(by.model('dataset.attributeOptions[jth]'));
//     selectDropdown(variant_select_option,'2');
//
//     browser.sleep(defaultSleep);
//
//     var variant_variant = element(by.model('$select.search'));
//     variant_variant.sendKeys('Fire');
//     variant_variant.sendKeys(protractor.Key.ENTER);
//     variant_variant.sendKeys('Water');
//     variant_variant.sendKeys(protractor.Key.ENTER);
//
//     browser.sleep(defaultSleep);
//     element(by.css('.variation-table tbody tr:nth-child(1)')).element(by.model('pair.Sku')).sendKeys('SKUA' + random1000);
//     element(by.css('.variation-table tbody tr:nth-child(2)')).element(by.model('pair.Sku')).sendKeys('SKUB' + random1000);
//   });
//
//
//
//   it('should save Product Detail', function(){
//     browser.sleep(defaultSleep);
//     saveChanges('.main-form-action .btn-white');
//   });
//
//----------- COUPON ----------//
  it('should fill in "Information Tab" in "Add Coupon"', function(){
    browser.get('http://localhost:5000/coupons');
    element(by.css('.page-header-action .btn-blue')).click();

    element(by.model('formData.CouponName')).sendKeys('Coupon ' + timeStamp());
    element(by.model('formData.CouponCode')).sendKeys('CODE' + randomX(4));

    element(by.css('#date_range_vertical_dropdown1')).click();
    selectDate();

    element(by.css('#date_range_vertical_dropdown2')).click();
    element(by.css('.open .dropdown-menu .glyphicon-arrow-right')).click();
    selectDate();

    element(by.model('formData.Status')).click();
    browser.sleep(1000);
    element(by.css('#ui-select-choices-row-0-1')).click();

    browser.executeScript('window.scrollTo(0,700);');

    element(by.model('formData.Action.DiscountAmount')).sendKeys('CODE' + randomX(2));
    element(by.model('formData.Action.MaximumAmount')).sendKeys('CODE' + randomX(4));

    element(by.model('formData.MaximumUser')).sendKeys('CODE' + randomX(2));
    element(by.model('formData.UsagePerCustomer')).sendKeys('CODE' + randomX(4));
  });

  it('should fill in "Condition Tab" in "Add Coupon"', function(){
    browser.executeScript('window.scrollTo(0,0);');
    element(by.xpath('//a[@href="#conditions"]')).click();

    element(by.model('formData.Conditions.Order[0].Type')).click();
    browser.sleep(1000);
    element(by.css('#ui-select-choices-row-1-1')).click();
    browser.sleep(1000);
    element(by.model('formData.Conditions.Order[0].Value')).sendKeys('CODE' + randomX(4));

    element(by.model('formData.Conditions.FilterBy.Type')).click();
    browser.sleep(1000);
    element(by.css('#ui-select-choices-row-2-1')).click();
    browser.sleep(1000);

    element(by.model('formData.Conditions.FilterBy.LocalCategories')).click();
    browser.sleep(1000);
    element(by.css('#ui-select-choices-row-3-0')).click();
    browser.sleep(1000);

    saveChanges('.main-form-action .btn-blue');

  });

});

//----------- FUNCTIONS ----------//
//Return Random
function randomX(x){
  var randomNumber  =  Math.floor(Math.random() * Math.pow(10,x));
  return randomNumber;
}

//Select Date
function selectDate (){
  browser.sleep(500);
  element(by.css('.open .dropdown-menu tr:first-child td:first-child')).click();
  element(by.css('.open .dropdown-menu tr:first-child td:first-child .hour')).click();
  element(by.css('.open .dropdown-menu tr:first-child td:first-child .minute')).click();
}

//Return a timestamp with the format "m/d/yy h:MM:ss TT"
function timeStamp() {
  var now = new Date();
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  time[0] = time[0] || 12;

  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("-") + " " + time.join("-") + "-" + suffix;
}


//Save Changes
function saveChanges(buttonLocation) {
  var button_save = element(by.css(buttonLocation));
  console.log(button_save)
  button_save.click();

  var EC = protractor.ExpectedConditions;
  // Waits for the element with id 'abc' to be visible on the dom.
  browser.wait(EC.visibilityOf($('.alert-green')), 60000);
  browser.sleep(999);
}

//Select Global Categories for Adding a New Product
function selectGlobalCategory(CatLV1,CatLV2) {
  var globalCategoryLV1 = element(by.xpath('//li[text()="'+ CatLV1 +'"]'));
  var globalCategoryLV2 = element(by.xpath('//li[text()="'+ CatLV2 +'"]'));

  browser.sleep(999);

  globalCategoryLV1.click();
  browser.sleep(100);
  globalCategoryLV2.click();

  element(by.css('.category-footer .btn-blue')).click();

  var EC = protractor.ExpectedConditions;
  // Waits for the element with id 'abc' to be visible on the dom.
  browser.wait(EC.visibilityOf($('.page-header-title')), 5000);
}

//Select Brand in Adding Product
function selectBrand(BrandName) {
  var brand = element(by.model('formData.Brand'));
  var selectBrand = brand.element(by.css('input'));
  selectBrand.click();
  selectBrand.clear().sendKeys(BrandName);
  selectBrand.sendKeys(protractor.Key.ENTER);
}

//Select Option from Dropdown
function selectDropdown(elementX,optionNumber) {
  elementX.click();
  elementX.element(by.css('option:nth-child('+optionNumber+')')).click();
  elementX.sendKeys("\t");
}
