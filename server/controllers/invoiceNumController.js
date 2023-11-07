const Orders = require("../model/Orders");

async function nextInvoiceNumber() {
  try {
    // Find the last item in the database and sort by 'num' in descending order
    const lastOrder = await Orders.findOne().sort({ num: -1 });

    // If there are no orders in the database, start with 1, else increment the last order's num by 1
    const newInvoiceNumber = lastOrder ? lastOrder.num + 1 : 1;

    return newInvoiceNumber;
  } catch (error) {
    console.error("Error fetching invoice number: ", error);
    throw error;
  }
}

module.exports = {nextInvoiceNumber};