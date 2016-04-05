module.exports = {
    NameTH: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
     NameEN: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
    BankNameTH: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
    BankNameEN: {
        labelClass: "required",
        inputSize: "large",
        error:{
          messages: {
              pattern: 'Special characters are not allowed',
              required: 'This is a required field'
          }
        }
    },
    PromotionCode: {
        //labelClass: "required",
        //inputSize: "large",
        //error:{
            //messages: {
                //  pattern: 'Special characters are not allowed',
                // required: 'This is a required field'
        //}
        //}
    },
    DateRange: {},
    MinimumOrderAmount: {
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
    MaximumDiscountAmount: {
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
    Format15AValue: {
      hint: {
          show: true,
          message: 'PREFIX: 34 or 37'
      }
    },
     Format14DValue: {
      hint: {
          show: true,
          message: 'PREFIX: 300 to 305, 36'
      }
    },
    Format14CValue:{
        hint:{
            show:true,
            message:'PREFIX: 38'
        }
    },
    Format16DValue:{
        hint:{
            show:true,
            message:'PREFIX: 6011'
        }
    },
     Format15EValue:{
        hint:{
            show:true,
            message:'PREFIX: 2014, 2149'
        }
    },
    Format16JValue:{
        hint:{
            show:true,
            message:'PREFIX: 3'
        }
    },
    Format15JValue:{
        hint:{
            show:true,
            message:'PREFIX: 2131, 1800'
        }
    },
    Format16MValue:{
        hint:{
            show:true,
            message:'PREFIX: 51 to 55'
        }
    },
    Format13VValue:{
        hint:{
            show:true,
            message:'PREFIX: 4'
        }
    },
    Format16VValue:{
        hint:{
            show:true,
            message:'PREFIX: 4'
        }
    }
}
