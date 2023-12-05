import React, { useState } from 'react'
import './ProductCard.css'

const ProductCard = ({ id, src, title, price, handleAmountChange }) => {
    // Initialize state for input value and selected unit
    const [selectedUnit, setSelectedUnit] = useState('kg');
    const [amount, setAmount] = useState(0);

    return (
        <form id={id} onSubmit={(e) => e.preventDefault()}>
            <article className='product-card' id={id}>
                <p className='product-card__title'>{title}</p>
                <img src={src} alt={title} />
                <p className='product-card__price'>{price} € / kg</p>
                <div className='productCard_unit'>
                    <input
                        type='radio'
                        name='plusOne'
                        id={id + '-plusOne'}
                        checked={selectedUnit === 'plusOne'}
                        onChange={() => setSelectedUnit('plusOne')}
                    />
                    <label htmlFor={id + "-plusOne"}>+ 1</label>
                    <input
                        type='radio'
                        name='plusTen'
                        id={id + '-plusTen'}
                        checked={selectedUnit === 'plusTen'}
                        onChange={() => setSelectedUnit('plusTen')}
                    />
                    <label htmlFor={id + "-plusTen"}>+ 10</label>
                </div>
                <div className='productCard_plusMinus'>
                    <button onClick={() => handleAmountChange('decrement', id, title, price, selectedUnit, amount, setAmount)}>−</button>
                    <input
                        type='number'
                        id={id + '-amount'}
                        min={0}
                        max={98}
                        placeholder='0'
                        value={amount}
                        readOnly
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button onClick={() => handleAmountChange('increment', id, title, price, selectedUnit, amount, setAmount)}>+</button>
                </div>
            </article>
        </form>
    );
};

export default ProductCard