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
                <img src={process.env.PUBLIC_URL + '/' + src} alt={title} />
                <p className='product-card__price'>{price} € / kg</p>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5px' }}>
                    <input
                        type='radio'
                        name='kg'
                        id={id + '-kg'}
                        checked={selectedUnit === 'kg'}
                        onChange={() => setSelectedUnit('kg')}
                    />
                    <label htmlFor={id + "-kg"}>kg</label>
                    <input
                        type='radio'
                        name='dag'
                        id={id + '-dag'}
                        checked={selectedUnit === 'dag'}
                        onChange={() => setSelectedUnit('dag')}
                    />
                    <label htmlFor={id + "-dag"}>dag</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5px' }}>
                    <button onClick={() => handleAmountChange('decrement', id, title, price, selectedUnit, amount, setAmount)}>−</button>
                    <input
                        type='number'
                        id={id + '-amount'}
                        min={0}
                        max={99}
                        placeholder='Amount'
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button onClick={() => handleAmountChange('increment', id, title, price, selectedUnit, amount, setAmount)}>+</button>
                </div>
            </article>
        </form>
    );
};

export default ProductCard