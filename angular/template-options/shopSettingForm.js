module.exports = {
    GiftWrap: {
        tooltip: "Please select 'Available' if you can provide gift wrapping service to your customer"
    },
    TaxInvoice: {
        tooltip: "Please select 'Available' if you can issue Tax Invoice to your customer"
    },
    ShopId: {},
    ShopNameEn: {
        labelClass: 'required',
        inputSize: 'large',
        error: {
            messages: {
                required: 'This is a required field',
                pattern: 'Special characters are not allowed'
            }
        }
    },
    ShopDescriptionEn: {
        inputSize: 'large'
    },
    ShopDescriptionTh: {
        inputSize: 'large'
    },
    FloatMessageEn: {
        inputSize: 'large'
    },
    FloatMessageTh: {
        inputSize: 'large'
    },
    ShopAddress: {
        inputSize: 'large'
    },
    BankAccountNumber: {
        inputSize: 'large'
    },
    BankAccountName: {
        inputSize: 'large',
        hint: {
            show: true,
            message: 'Please contact COL if you wish to change your financial detail'
        }
    },
    Facebook: {
        inputSize: 'large'
    },
    YouTube: {
        inputSize: 'large'
    },
    Twitter: {
        inputSize: 'large'
    },
    Pinterest: {
        inputSize: 'large'
    },
    Instagram: {
        inputSize: 'large'
    },
    StockAlert: {
        inputSize: 'small',
        tooltip: "Input number of stock before customer will get alerted when they visit your product page"
    }
}
