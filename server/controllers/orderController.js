var fs = require('fs');
var easyinvoice = require('easyinvoice');
const { format } = require('date-fns')
const QRCode = require('qrcode');
const invoiceNum = require('./invoiceNumController')

const orderHandler = async (req, res) => {
    const nextInvoiceNumber = invoiceNum.incrementInvoiceCount();
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    const paymentData = {
        accountNumber: '1234567',
        beneficiaryName: req.body.buyer.company,
        amount: req.body.products.reduce((accumulator, object) => {
            return accumulator + (object.price * object.quantity);
        }, 0),
        reference: `Plaćanje računa ${nextInvoiceNumber}`,
    };

    const paymentString = `BANK:${paymentData.accountNumber};NAME:${paymentData.beneficiaryName};AMOUNT:${paymentData.amount};REFERENCE:${paymentData.reference}`;

    const qrCodeFilePath = `./qr/${nextInvoiceNumber}.png`;

    try {
        await generateQRCodeAsPNG(qrCodeFilePath, paymentString);
        var data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                "template": fs.readFileSync('./config/template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": fs.readFileSync(`./qr/${nextInvoiceNumber}.png`, 'base64'),
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
            "bottom-notice": "Hvala!",
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
                "products": "Proizvodi",
                "quantity": "Količina",
                "price": "Cijena",
                "total": "Ukupno",
                "number": "Broj računa",
                "date": "Datum",
                "tax-notation": "PDV",
                "subtotal": "Ukupno",
                "invoice": "RAČUN"
            },
        };

        const result = await easyinvoice.createInvoice(data);
        await fs.writeFileSync(`./pdf/${nextInvoiceNumber}.pdf`, result.pdf, 'base64');

        fs.unlink(`./qr/${nextInvoiceNumber}.png`, (err) => {
            if (err) {
                console.error('Error deleting QR code file:', err);
            } else {
                console.log('QR code file deleted successfully.');
            }
        });

        res.status(200).json({ 'message': "pdf created" })
    } catch (err) {
        res.status(500).json({ 'message': 'Internal Server Error' })
    }

};

async function generateQRCodeAsPNG(filePath, data) {
    return new Promise((resolve, reject) => {
        QRCode.toFile(filePath, data, (error) => {
            if (error) {
                console.error('Error generating QR code:', error);
                reject(error);
            } else {
                console.log('QR code generated successfully.');
                resolve();
            }
        });
    });
}

module.exports = { orderHandler };