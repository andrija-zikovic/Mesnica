var fs = require('fs');
var easyinvoice = require('easyinvoice');
const { format } = require('date-fns')
const invoiceNum = require('../pdf/invoiceNum')

const orderHandler = async (req, res) => {
    console.log(req.body);
    const nextInvoiceNumber = invoiceNum.incrementInvoiceCount();
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    try {
        var data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
            },
            // Your own data
            "sender": {
                "company": "Mesnica",
                "address": "Sample Street 123",
                "zip": "1234 AB",
                "city": "Sampletown",
                "country": "Samplecountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                "company": req.body.buyer.company,
                "address": req.body.buyer.street,
                "zip": req.body.buyer.zip,
                "city": req.body.buyer.city,
                "country": req.body.buyer.country
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": nextInvoiceNumber,
                // Invoice data
                "date": formattedDate
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": req.body.products,
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "Thank you for your purchase.",
            // Settings to customize your invoice
            "settings": {
                "currency": "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "1000px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
            // Translate your invoice to your preferred language
            "translate": {
                // "invoice": "FACTUUR",  // Default to 'INVOICE'
                // "number": "Nummer", // Defaults to 'Number'
                // "date": "Datum", // Default to 'Date'
                // "due-date": "Verloopdatum", // Defaults to 'Due Date'
                // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                // "products": "Producten", // Defaults to 'Products'
                // "quantity": "Aantal", // Default to 'Quantity'
                // "price": "Prijs", // Defaults to 'Price'
                // "product-total": "Totaal", // Defaults to 'Total'
                // "total": "Totaal", // Defaults to 'Total'
                // "vat": "btw" // Defaults to 'vat'
            },
        };

        const result = await easyinvoice.createInvoice(data);
        await fs.writeFileSync(`./pdf/${nextInvoiceNumber}.pdf`, result.pdf, 'base64');
        res.status(200).json({ 'message': "pdf created" })
    } catch (err) {
        res.status(500).json({ 'message': 'Internal Server Error' })
    }

}

module.exports = { orderHandler };