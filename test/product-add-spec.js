describe('Test Adding user account', function() {


  it('should login', function() {

    browser.get('http://localhost:5000/login');

    browser.sleep(1000);

    var username = element(by.model('uform.user'));
    var password = element(by.model('uform.pass'));
    username.sendKeys("natt@pokemon.com");
    password.sendKeys("test1234");


    var login_submit = element(by.xpath('//button[@type="submit"]'));
    login_submit.click();

    browser.sleep(3000);

  });


  it('should create new user role', function(){
    browser.get('http://localhost:5000/roles');

    var button_add_user_role = element(by.xpath('//a[text()="Add User Role"]'));
    button_add_user_role.click();

    browser.sleep(1000);

    var input_role_name = element(by.model('formData.GroupNameEn'));
    var name_automate  = 'Automated Role ' + Math.floor(Math.random()*1000);
    input_role_name.sendKeys(name_automate);

    browser.sleep(1000);

    var input_checkbox_select_all = element(by.model('obj.selectAll'));
    input_checkbox_select_all.click();

    browser.sleep(1000);

    var button_save = element(by.css('.main-form-action .btn-blue'));
    console.log(button_save)
    button_save.click();

    browser.sleep(1000);


  var EC = protractor.ExpectedConditions;
  // Waits for the element with id 'abc' to be visible on the dom.
  browser.wait(EC.visibilityOf($('.alert')), 5000);

  browser.sleep(1000);

  browser.get('http://localhost:5000/roles');


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

        browser.sleep(1000);
        pluses = element.all(by.css('.fa.fa-plus-circle.color-theme'));
        pluses.get(1).click(); //lOcal cat

        var lvl1_loc = element(by.css('#local-category li'));
        lvl1_loc.click();

        //select local cat
        var lsubmit = element(by.css('#local-category .btn'));
        lsubmit.click();

        browser.sleep(1000);

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
