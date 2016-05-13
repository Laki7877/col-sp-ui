module.exports = {
  Status: {
    labelClass: "required",
    inputSize: "large",
    error: {
      messages: {
        required: 'This is a required field'
      }
    }
  },
  CouponName: {
    labelClass: "required",
    inputSize: "large",
    error: {
      messages: {
        pattern: 'Special characters are not allowed',
        required: 'This is a required field'
      }
    }
  },
  CouponCode: {
    labelClass: "required",
    inputSize: "large",
    error: {
      messages: {
        pattern: 'Special characters are not allowed',
        required: 'This is a required field'
      }
    }
  },
  DateRange: {
    labelClass: "required",
    error: {
      messages: {
        required: 'This is a required field'
      }
    }
  },
  DiscountAmount: {
    labelClass: "required",
    hint: {
      show: true,
      message: 'Example: 50 or 75'
    },
    error: {
      messages: {
        required: 'This is a required field'
      }
    }
  },
  DiscountPercent: {
    labelClass: "required",
    hint: {
      show: true,
      message: 'Example: 50 or 75'
    },
    error: {
      messages: {
        maxnumber: 'Please enter a valid discount percent between 0% and 100%',
        minnumber: 'Please enter a valid discount percent between 0% and 100%',
        required: 'This is a required field'
      }
    }
  },
  MaximumAmount: {},
  MaximumUsers: {
    labelClass: "required",
    error: {
      messages: {
        required: 'This is a required field'
      }
    }
  },
  UsagePerCustomer: {},
  Condition_Order: {

  },
  Condition_Value: {
    labelClass: 'required',
    error: {
      messages: {
        required: 'This is a required field'
      }
    },
    hint: {
      show: true,
      message: 'Example: 200 or 125.50' 
    }
  },
  FilterByValue: {
    labelClass: 'required',
    error: {
      messages: {
        required: 'This is a required field',
        maxtagcount: 'Maximum tags exceeded'
      }
    }
  }
}
