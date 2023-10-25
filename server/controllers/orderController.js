var fs = require("fs");
var easyinvoice = require("easyinvoice");
const { format } = require("date-fns");
const QRCode = require("qrcode");
const invoiceNum = require("./invoiceNumController");
const emailSander = require("../middleware/emailSander");
const orders = require("../model/Orders");
require("dotenv").config();

const orderHandler = async (req, res) => {
  const nextInvoiceNumber = invoiceNum.incrementInvoiceCount();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
  const bankAcc = process.env.BANK_ACC;
  const amount = req.body.products
    .reduce((accumulator, object) => {
      return accumulator + object.price * object.quantity;
    }, 0)
    .toFixed(2)
    .replace(".", "")
    .padStart(15, "0");

  const paymentString = `HRVHUB30\nEUR\n${amount}\n${req.body.buyer.company}\n${req.body.buyer.address}\n${req.body.buyer.zip} ${req.body.buyer.city}\nMesnica d.o.o\nŠijanska cesta 5\n52100 Pula\n${bankAcc}\nHR04\n123456879-123456\nCOST\nRAČUN BR ${nextInvoiceNumber}`;

  const qrCodeFilePath = `./qr/${nextInvoiceNumber}.png`;

  try {
    await generateQRCodeAsPNG(qrCodeFilePath, paymentString);
    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        template: fs.readFileSync("./config/template.html", "base64"), // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: fs.readFileSync(`./qr/${nextInvoiceNumber}.png`, "base64"),
      },
      // Your own data
      sender: {
        company: "Mesnica",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      // Your recipient
      client: {
        company: req.body.buyer.company,
        address: req.body.buyer.address,
        zip: req.body.buyer.zip,
        city: req.body.buyer.city,
      },
      information: {
        // Invoice number
        number: nextInvoiceNumber,
        // Invoice data
        date: formattedDate,
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: req.body.products,
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Hvala!",
      // Settings to customize your invoice
      settings: {
        currency: "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
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
      translate: {
        products: "Proizvodi",
        quantity: "Količina",
        price: "Cijena",
        total: "Ukupno",
        number: "Broj računa",
        date: "Datum",
        "tax-notation": "PDV",
        subtotal: "Ukupno",
        invoice: "RAČUN",
      },
    };

    const result = await easyinvoice.createInvoice(data);
    await fs.writeFileSync(
      `./pdf/${nextInvoiceNumber}.pdf`,
      result.pdf,
      "base64"
    );

    fs.unlink(`./qr/${nextInvoiceNumber}.png`, (err) => {
      if (err) {
        console.error("Error deleting QR code file:", err);
      } else {
        console.log("QR code file deleted successfully.");
      }
    });

    await emailSander(
      req.body.buyer.email,
      nextInvoiceNumber,
      req.body.buyer.company
    );
    await orderSave(req.body, formattedDate, nextInvoiceNumber);

    res.status(200).json({ message: "Invoice sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function generateQRCodeAsPNG(filePath, data) {
  return new Promise((resolve, reject) => {
    QRCode.toFile(filePath, data, (error) => {
      if (error) {
        console.error("Error generating QR code:", error);
        reject(error);
      } else {
        console.log("QR code generated successfully.");
        resolve();
      }
    });
  });
}

async function orderSave(data, date, invNum) {
  const orderData = {
    buyer: {
      name: data.buyer.company,
      address:
        data.buyer.address + "\n" + data.buyer.city + "\n" + data.buyer.zip,
      email: data.buyer.email,
    },
    products: data.products,
    date: date,
    num: invNum,
    status: null,
  };
  const order = await orders.create(orderData);
  return 1;
}

const getOrders = async (req, res) => {
  try {
    const ordersData = await orders.find();
    if (orders < 1) {
      return res.status(204).json({ message: "No orders found." });
    }
    res.json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const orderConfirm = async (req, res) => {
  const id = req.body._id;

  try {
      const existingOrder = await orders.findById(id);

      if (existingOrder.status === true) {
          return res.status(400).json({ error: 'Order is already confirmed' });
      }

      await orders.findByIdAndUpdate(id, { status: true }, { new: true });
      res.status(200).json({ message: 'Order confirm!'});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const orderReject = async (req, res) => {
    const id = req.body._id;

    try {
      const existingOrder = await orders.findById(id);

      if (existingOrder.status === true) {
          return res.status(400).json({ error: 'Order is already rejected' });
      }

      await orders.findByIdAndUpdate(id, { status: true }, { new: true });
      res.status(200).json({ message: 'Order rejected!'});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { orderHandler, getOrders, orderConfirm, orderReject };
