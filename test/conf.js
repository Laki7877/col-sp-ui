exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['product-add-spec.js'],
  jasmineNodeOpts: {defaultTimeoutInterval: 60000} 
};
