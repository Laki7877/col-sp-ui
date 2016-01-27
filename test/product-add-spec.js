describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://americanod:5000/products/select');

    // var lvl1 = element(by.css('.content-column.ng-scope')).element(by.tagName('li'));
    var lvl1 = element.all(by.css('.content-column.ng-scope li'));
    lvl1.get(1).click();

    var levels = element.all(by.css('.content-column.ng-scope'));
    levels.get(1).element(by.tagName('li')).click();
    levels = element.all(by.css('.content-column.ng-scope'));
    levels.get(2).element(by.tagName('li')).click();
    levels = element.all(by.css('.content-column.ng-scope'));
    levels.get(3).element(by.tagName('li')).click();

    var submit = element(by.xpath('//button[@type="submit"]'));
    submit.click();

    
    /*
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);

    */

  });

  it('tab2', function(){
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

   it('tab3', function(){
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

    it('tab5', function(){
        var tab5 = element(by.xpath('//a[@href="#more_option"]'));
        tab5.click();

        element(by.model('formData.SEO.MetaTitle')).sendKeys('Automated Nazi Stuff');
        element(by.model('formData.SEO.MetaDescription')).sendKeys('Audi is shit');
        element(by.model('formData.SEO.MetaKeywords')).sendKeys('DasAuto, Nazi, Germany, Hitler');
        element(by.model('formData.SEO.MetaTitle')).sendKeys('BMW');
        browser.pause();


    });
});
