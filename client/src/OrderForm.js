
import './orderForm.css'

const OrderForm = ({ cartItems, setCartItems, deleteItem, clearCart }) => {
    const buyer = {};

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
            }
        } catch (err) {
            console.error('Error giving order:', err)
        }

    };

    // Calculate the total price based on selectedUnit
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);

        return totalPrice.toFixed(2); // Rounds to two decimal places
    };

    if (cartItems.length < 1) {
        return (
            <h2 className='emptyMessage'>Vaša košarica je prazna!</h2>
        )
    } else {

    return (
        <section className='order'>
            <table className='order__table'>
                <thead className='order__thead'>
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
                <tbody className='order__tbody'>
                    {cartItems.map((cartItem, index) => (
                        <tr key={index}>
                            <td>{cartItem.description}</td>
                            <td>
                                {cartItem.quantity} {cartItem.unit}
                            </td>
                            <td>
                                {parseFloat(cartItem.quantity * cartItem.price).toFixed(2)}{' '}€
                            </td>
                            <td><button className='delete' onClick={() => deleteItem(cartItem.id)}><svg xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg></button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className='order__tfoot'>
                    <tr>
                        <td colSpan={2}>UKUPNO</td>
                        <td>{calculateTotalPrice()} €</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <form id='buyerInfo' className='buyerInfo'>
                <h3 className='buyerInfo_Form'>Vaše informacije:</h3>
                <label for="fname" className='offscreen'>Name</label>
                <input type='text' name='fname' id='fname' placeholder='Ime' className='buyerInfo__FirstName' required autoComplete='name'></input>

                <label for="lname" className='offscreen'>Last Name</label>
                <input type='text' name='lname' id='lname' placeholder='Prezime' className='buyerInfo__SecondName' required autoComplete='family-name'></input>

                <label for="adress" className='offscreen'>Address</label>
                <input type='text' name='address' id="address" placeholder='Adresa' className='buyerInfo_address' required autoComplete='street-address'></input>

                <label for='zip' className='offscreen'>Zip</label>
                <input type='text' name='zip' id="zip" placeholder='Poštanski broj' className='buyerInfo_zip' required autoComplete='postal-code'></input>

                <label for='city' className='offscreen'>City</label>
                <input type='text' name='city' id="city" placeholder='Grad' className='buyerInfo_city' required autoComplete='address-level2'></input>

                <label for='country' className='offscreen'>Country</label>
                <input type='text' name='country' id="country" placeholder='Država' className='buyerInfo_country' required autoComplete='country'></input>

                <label for='email' className='offscreen'>Email</label>
                <input type='email' name='email' id='email' placeholder='Email' className='buyerInfo__email' required autoComplete='email'></input>

            </form>
            <div className='orderButtons'>
                <button className='clear' onClick={() => clearCart()}>CLEAR</button>
                <button className='send' onClick={() => handleOrderSend()}>BUY</button>
            </div>
        </section>
    )
}
}

export default OrderForm;