module.exports = {
    CouponName: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
    CouponCode: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
    DateRange: {},
    DiscountAmount: {
      labelClass: "required",
      hint: {
          show: true,
          message: 'Example: 50 or 75'
      },
      error:{
        messages: {
            required: 'This is a required field'
        }
      }
    },
    MaximumAmount: { },
    ConditionValue: {
      hint: {
          show: true,
          message: 'Example: 200 or 125.50'
      }
    }
}
