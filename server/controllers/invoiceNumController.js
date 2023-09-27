const fs = require("fs");

// Function to read the invoice number from the file
function readInvoiceNumber() {
  try {
    const data = fs.readFileSync("./config/invoiceNum.txt", "utf8");
    return parseInt(data);
  } catch (err) {
    console.error(err)
  }
}

// Function to increment and update the invoice number in the file
function incrementAndSaveInvoiceNumber(invoiceNum) {
  invoiceNum++;
  try {
    fs.writeFileSync("./config/invoiceNum.txt", invoiceNum.toString(), "utf8");
  } catch (err) {
    console.error(err)
  }
  return invoiceNum;
}

let invoiceCount = readInvoiceNumber();
module.exports = {
  getInvoiceCount: () => invoiceCount,
  incrementInvoiceCount: () => {
    invoiceCount = incrementAndSaveInvoiceNumber(invoiceCount);
    return invoiceCount;
  },
};


