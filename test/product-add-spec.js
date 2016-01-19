describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://ksonep-dev:5000/products/add');

    element(by.model('formData.MasterVariant.ProductNameEn')).sendKeys('JACK SHEN YI');
    element(by.model('formData.MasterVariant.ProductNameTh')).sendKeys('แจกเชน');
    element(by.model('formData.MasterVariant.Sku')).sendKeys('CHINB-013021');
    element(by.model('formData.MasterVariant.Upc')).sendKeys('10013201130');
    
    var brand = element(by.model('formData.Brand'));
    var selectBrand = brand.element(by.css('.ui-select-search'));
    brand.click();
    selectBrand.sendKeys("ASOS");
    element(by.model('formData.MasterVariant.OriginalPrice')).sendKeys('6000');
    element(by.model('formData.MasterVariant.SalePrice')).sendKeys('5999');


    browser.pause();
    /*element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);*/
  });
});
