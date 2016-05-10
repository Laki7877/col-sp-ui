module.exports = {
    GiftWrap: {
        tooltip: "Please select 'Available' if you can provide gift wrapping service to your customer"
    },
    TaxInvoice: {
        tooltip: "Please select 'Available' if you can issue Tax Invoice to your customer"
    },
    Logo: {
        error: {
            messages: {
                minHeight: 'Image must be between 500x500 to 1000x1000 pixels',
                maxHeight: 'Image must be between 500x500 to 1000x1000 pixels',
                minWidth: 'Image must be between 500x500 to 1000x1000 pixels',
                maxWidth: 'Image must be between 500x500 to 1000x1000 pixels',
                ratio: 'Image must be a square (1:1 ratio)',
                maxSize: ' Image file size must not exceed 5MB'
            }
        }
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
    BankName: {
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
    SocialMediaLink: {
        inputSize: 'large',
        error: {
            messages: {
                url: 'Please enter a valid URL'
            }
        }
    },
    StockAlert: {
        inputSize: 'small',
        tooltip: "Input number of stock before customer will get alerted when they visit your product page"
    },
    Email: {
        error: {
            messages: {
                email: 'Please enter a valid Email'
            }
        }
    }
}
