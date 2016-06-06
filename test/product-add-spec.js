describe('Automated Man', function() {

  var width = 1200;
  var height = 800;
  browser.driver.manage().window().setSize(width, height);

  var random1000  =  Math.floor(Math.random()*10000);
  var defaultSleep = 1000;

  it('should login', function() {

    browser.get('http://localhost:5000/login');

    browser.sleep(defaultSleep);

    var username = element(by.model('uform.user'));
    var password = element(by.model('uform.pass'));
    username.sendKeys("natt@pokemon.com");
    password.sendKeys("test1234");


    var login_submit = element(by.xpath('//button[@type="submit"]'));
    login_submit.click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('#sidebar-wrapper')), 5000);
    browser.sleep(500);

  });


  xit('should create new a user role', function(){
    browser.get('http://localhost:5000/roles');

    element(by.xpath('//a[text()="Add User Role"]')).click();
    element(by.model('formData.GroupNameEn')).sendKeys('ROLE ' + timeStamp());
    element(by.model('obj.selectAll')).click();

    saveChanges();

    element(by.css('.alert a')).click();

    browser.sleep(defaultSleep);

  });

  xit('should create a new user', function(){
    browser.get('http://localhost:5000/accounts');

    element(by.xpath('//a[text()="Add User Account"]')).click();
    element(by.model('formData.Email')).sendKeys('a' + random1000 + '@account.com');
    element(by.model('formData.NameEn')).sendKeys('USER ' + timeStamp());
    element(by.model('formData.Phone')).sendKeys('086' + Math.floor(Math.random()*1000000));

    var text_account_password  = 'test1234';
    element(by.model('formData.Password')).sendKeys(text_account_password);
    element(by.model('formData.ConfirmPassword')).sendKeys(text_account_password);

    element(by.model('formData.UserGroup')).click();
    element(by.css('#ui-select-choices-row-1-0')).click();

    saveChanges();

    element(by.css('.alert a')).click();

    browser.sleep(defaultSleep);

  });

  xit('should fill out shop profile', function(){
    browser.get('http://localhost:5000/shops/settings');

    browser.sleep(defaultSleep);

    element(by.model('formData.ShopNameEn')).clear().sendKeys('Pokelandia ' + random1000);
    element(by.model('formData.DomainName')).clear().sendKeys('domain_name_' + random1000);
    element(by.model('formData.UrlKey')).clear().sendKeys('url-' + random1000);
    element(by.model('formData.ShopDescriptionEn')).clear().sendKeys('This is written at ' + timeStamp());
    element(by.model('formData.ShopDescriptionTh')).clear().sendKeys('เขียนตอน ' + timeStamp());
    element(by.model('formData.FloatMessageEn')).clear().sendKeys('Hello ' + timeStamp());
    element(by.model('formData.FloatMessageTh')).clear().sendKeys('ฮาโหล ' + timeStamp());
    element(by.model('formData.ShopAddress')).clear().sendKeys('Shop Address ' + random1000);
    element(by.model('formData.Facebook')).clear().sendKeys('http://www.facebook.com/' + random1000);
    element(by.model('formData.YouTube')).clear().sendKeys('http://www.youtube.com/' + random1000);
    element(by.model('formData.Twitter')).clear().sendKeys('http://www.twitter.com/' + random1000);
    element(by.model('formData.Instagram')).clear().sendKeys('http://www.instagram.com/' + random1000);
    element(by.model('formData.Pinterest')).clear().sendKeys('http://www.pinterest.com/' + random1000);
    element(by.model('formData.StockAlert')).clear().sendKeys(random1000);

    browser.sleep(defaultSleep);

    saveChanges();

  });


  xit('should add local category', function(){
    browser.get('http://localhost:5000/categories');

    browser.sleep(defaultSleep);

    element(by.css('.page-header-action .btn-blue')).click();
    element(by.model('formData.NameEn')).sendKeys('Local EN ' + timeStamp());
    element(by.model('formData.NameTh')).sendKeys('Local TH ' + timeStamp());
    element(by.model('formData.UrlKey')).sendKeys('url' + random1000);
    element(by.model('formData.SortBy')).click();
    element(by.css('.ui-select-choices-row.active')).click();

    browser.sleep(defaultSleep);

    var button_save = element(by.css('.modal-header .btn-blue'));
    console.log(button_save)
    button_save.click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('.alert')), 5000);
    browser.sleep(defaultSleep);

  });

  it('should add new product', function(){
    browser.get('http://localhost:5000/products');

    browser.sleep(defaultSleep);

    element(by.css('.page-header-action .btn-blue')).click();

    element(by.xpath('//li[text()="Imaginary Land"]')).click();
    browser.sleep(500);
    element(by.xpath('//li[text()="Pokemon"]')).click();

    element(by.css('.category-footer .btn-blue')).click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('.page-header-title')), 5000);
    element(by.model('variantPtr.ProductNameEn')).sendKeys('Product ' + timeStamp());
    element(by.model('variantPtr.ProductNameTh')).sendKeys('สินค้า ' + timeStamp());
    element(by.model('variantPtr.Sku')).sendKeys('SKU' + random1000);

    var brand = element(by.model('formData.Brand'));
    var selectBrand = brand.element(by.css('input'));
    selectBrand.click();
    selectBrand.sendKeys("NIKE");
    selectBrand.sendKeys(protractor.Key.ENTER);

    var price = random1000 + 5000;

    element(by.model('variantPtr.SalePrice')).sendKeys(price);
    element(by.model('variantPtr.OriginalPrice')).sendKeys(price + 1);

    browser.sleep(defaultSleep);

    var button_save = element(by.css('.main-form-action .btn-white'));
    console.log(button_save)
    button_save.click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('.alert-green')), 10000);
    browser.sleep(999);

    browser.sleep(defaultSleep);

  });







  xit('tab2', function(){
        element(by.model('formData.MasterVariant.ProductNameEn')).sendKeys('This is Automated Test ' + Math.floor(Math.random()*10000));
        element(by.model('formData.MasterVariant.ProductNameTh')).sendKeys('เทสอัตโนมัติ ' + Math.floor(Math.random()*10000));
        element(by.model('formData.MasterVariant.Sku')).sendKeys('AUTO' + Math.floor(Math.random()*10000));
        element(by.model('formData.MasterVariant.Upc')).sendKeys('UPCAUT' + Math.floor(Math.random()*10000));

        var brand = element(by.model('formData.Brand'));
        var selectBrand = brand.element(by.css('.ui-select-search'));
        brand.click();
        selectBrand.sendKeys("ASOS");
        selectBrand.sendKeys(protractor.Key.ENTER)

        element(by.model('formData.MasterVariant.OriginalPrice')).sendKeys('6000');
        element(by.model('formData.MasterVariant.SalePrice')).sendKeys('5999');
        element(by.model('formData.MasterVariant.DescriptionShortEn')).sendKeys('Automatic Test Description Short JSD China');
        element(by.model('formData.MasterVariant.DescriptionShortTh')).sendKeys('กกกกกกกกกกขขขขขขงงงงงญญญญญ');

        var keyword = element.all(by.xpath('//input[@placeholder="Separate tags with comma (or enter)"]')).first();
        keyword.sendKeys("dasauto");
        keyword.sendKeys(protractor.Key.ENTER)

        var atrset = element(by.model('formData.AttributeSet'));
        var selectAtrSet = atrset.element(by.css('.ui-select-search'));
        atrset.click();
        selectAtrSet.sendKeys(protractor.Key.ENTER)

        // var enableProductVariations = element(by.model('enableProductVariations'));
        // enableProductVariations.element(by.css('option:nth-child(1)')).click();

        element(by.model('formData.MasterVariant.Quantity')).sendKeys('100');
        element(by.model('formData.MasterVariant.SafetyStock')).sendKeys('50');
        element(by.model('formData.PrepareDay')).sendKeys('3');
        element(by.model('formData.MasterVariant.Length')).sendKeys('25');
        element(by.model('formData.MasterVariant.Width')).sendKeys('125');
        element(by.model('formData.MasterVariant.Height')).sendKeys('28');
        element(by.model('formData.MasterVariant.Weight')).sendKeys('108');

  })

   xit('tab3', function(){
        var tab3 = element(by.xpath('//a[@href="#category"]'));
        tab3.click();

        var pluses =  element.all(by.css('.fa.fa-plus-circle.color-theme'));
        pluses.get(0).click();

        var lvl1 = element.all(by.css('#global-category .content-column.ng-scope li'));
        lvl1.get(0).click();

        // var levels = element.all(by.css('#global-category .content-column.ng-scope'));
        // levels.get(1).element(by.tagName('li')).click();

        // levels = element.all(by.css('#global-category .content-column.ng-scope'));
        // levels.get(2).element(by.tagName('li')).click();

        //TODO: check levels by counting column non empty
        // try{
        //     levels = element.all(by.css('.content-column.ng-scope'));
        //     levels.get(3).element(by.tagName('li')).click();
        // }catch(ex){
        //     console.log("no 3rd level");
        // }

        var gsubmit = element(by.css('#global-category .btn'));
        gsubmit.click();

        browser.sleep(defaultSleep);
        pluses = element.all(by.css('.fa.fa-plus-circle.color-theme'));
        pluses.get(1).click(); //lOcal cat

        var lvl1_loc = element(by.css('#local-category li'));
        lvl1_loc.click();

        //select local cat
        var lsubmit = element(by.css('#local-category .btn'));
        lsubmit.click();

        browser.sleep(defaultSleep);

    })

    xit('tab5', function(){
        var tab5 = element(by.xpath('//a[@href="#more_option"]'));
        tab5.click();

        element(by.model('formData.SEO.MetaTitle')).sendKeys('Automated Nazi Stuff');
        element(by.model('formData.SEO.MetaDescription')).sendKeys('Audi is shit');
        element(by.model('formData.SEO.MetaKeywords')).sendKeys('DasAuto, Nazi, Germany, Hitler');
        element(by.model('formData.SEO.MetaTitle')).sendKeys('BMW');
        browser.pause();


    });
});



/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 */

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("-") + " " + time.join("-") + "-" + suffix;
}

/**
 * Save Changes
 */
function saveChanges() {
  var button_save = element(by.css('.main-form-action .btn-blue'));
  console.log(button_save)
  button_save.click();

  var EC = protractor.ExpectedConditions;
  // Waits for the element with id 'abc' to be visible on the dom.
  browser.wait(EC.visibilityOf($('.alert')), 5000);
  browser.sleep(999);

}
