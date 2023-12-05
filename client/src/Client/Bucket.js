import { useNavigate } from "react-router-dom";

const Bucket = ({ cartItems, deleteItem, clearCart, toggleBucketVisibility }) => {
    const navigate = useNavigate();
    // Calculate the total price based on selectedUnit
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, cartItem) => {
            return total + handlePriceCaluclation(cartItem);
        }, 0);

        return totalPrice.toFixed(2); // Rounds to two decimal places
    };

    const handleViaLink = () => {
        toggleBucketVisibility();
        navigate('/order');
    }

    const handlePriceCaluclation = (cartItem) => {
        if (cartItem.unit === 'dag') {
            return cartItem.quantity * cartItem.price;
        } else  {
            return cartItem.quantity * cartItem.price;
        }
    };

    const handleClearCart = () => {
        clearCart();
        toggleBucketVisibility();
    };

    if (cartItems.length < 1) {
        return (
            <section className='bucket'>
                <p style={{ textAlign: 'center' }}>Vaša košarica je prazna!</p>
            </section>
        )
    } else {

        return (
            <section className='bucket'>
                <h1>Košarica</h1>
                <table className='bucket__table'>
                    <thead className='bucket__thead'>
                        <tr>
                            <th></th>
                            <th>Proizvod</th>
                            <th>Količina</th>
                            <th>Cijena</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='bucket__tbody'>
                        {cartItems.map((cartItem, index) => (
                            <tr key={index}>
                                <td></td>
                                <td>{cartItem.description}</td>
                                <td>
                                    {cartItem.quantity.toFixed(2)} kg       
                                </td>
                                <td>
                                    {parseFloat(handlePriceCaluclation(cartItem)).toFixed(2)}{' '}€
                                </td>
                                <td><button className='delete' onClick={() => deleteItem(cartItem.id)}><svg xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg></button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='bucket__tfoot'>
                        <tr>
                            <td></td>     
                            <td colSpan={2}>UKUPNO:</td>
                            <td style={{fontWeight: 'bolder', borderBottom: '2px solid aliceblue'}}>{calculateTotalPrice()} €</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div className='orderSendClear'>
                    <button className='clear' onClick={() => handleClearCart()}>OČISTI</button>
                    <button className='send' onClick={() => handleViaLink()}>NARUČI</button>
                </div>
            </section>
        )
    }
}


export default Bucket