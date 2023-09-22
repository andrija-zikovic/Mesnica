import React, { useState } from 'react'


const Bucket = ({ cartItems, setCartItems, deleteItem, clearCart }) => {
    const [orderSent, setOrderSent] = useState(false);
    const buyer = {
        company: "Andrija Žiković",
        address: "Šijanska cesta 5",
        zip: "52100",
        city: "Pula",
        country: "Hrvatska"
    }
    const handleOrderSend = async (products) => {
        try {
            console.log(cartItems);
            const url = 'http://localhost:3500/order/'
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "products": cartItems, "buyer": buyer }), // Send cartItems as JSON
            });
            if (res.ok) {
                clearCart()
                setOrderSent(true);
            }
        } catch (err) {
            console.error('Error giving order:', err)
        }

    };

    // Calculate the total price based on selectedUnit
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, cartItem) => {
            if (cartItem.unit === 'kg') {
                return total + cartItem.quantity * cartItem.price;
            } else {
                return total + (cartItem.quantity * cartItem.price) / 100;
            }
        }, 0);

        return totalPrice.toFixed(2); // Rounds to two decimal places
    };

    if (cartItems.length === 0) {
        return (
            <section className='bucket'>
                {orderSent ? (<p>Order has been sent successfully!</p>) : (<p>Your cart is empty.</p>)}
            </section>
        );
    } else {


        return (
            <section className='bucket'>
                <table className='bucket__table'>
                    <thead className='bucket__thead'>
                        <tr>
                            <th colSpan={3}>Košarica</th>
                        </tr>
                        <tr>
                            <th>Proizvod</th>
                            <th>Količina</th>
                            <th>Cijena</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='bucket__tbody'>
                        {cartItems.map((cartItem, index) => (
                            <tr key={index}>
                                <td>{cartItem.description}</td>
                                <td>
                                    {cartItem.quantity} {cartItem.unit}
                                </td>
                                <td>
                                    {parseFloat(
                                        cartItem.unit === 'kg'
                                            ? cartItem.quantity * cartItem.price
                                            : cartItem.quantity * (cartItem.price / 100)
                                    ).toFixed(2)}{' '}
                                    €
                                </td>
                                <td><button className='delete' onClick={() => deleteItem(cartItem.id)}><svg xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg></button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='bucket__tfoot'>
                        <tr>
                            <td colSpan={2}>UKUPNO</td>
                            <td>{calculateTotalPrice()} €</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div>
                    <button className='clear' onClick={() => clearCart()}>CLEAR</button>
                    <button className='send' onClick={() => handleOrderSend()}>SEND</button>
                </div>
            </section>
        )
    }
}

export default Bucket