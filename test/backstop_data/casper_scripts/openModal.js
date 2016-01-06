module.exports = function(casper, scenario, vp) {
  var modalSelector = scenario.modalSelector;
  casper.evaluate(function(selector){
    console.log("Open Modal!!!!!!", selector);
    $(selector).modal('show');
  }, modalSelector);
  casper.wait(500);
};
