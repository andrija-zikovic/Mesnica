import React, { useState, useMemo } from 'react'
import './ProductCard.css'

const ProductCard = ({ id, src, title, price }) => {
    // Initialize state for input value and selected unit
    const [amount, setAmount] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState('kg');

    // Functions to handle the "+" and "-" button click
    const handleIncrement = useMemo(() => {
        return () => {
            const incrementValue = selectedUnit === 'kg' ? 1 : 10;
            setAmount(amount + incrementValue);
        };
    }, [amount, selectedUnit]);

    const handleDecrement = useMemo(() => {
        return () => {
            const decrementValue = selectedUnit === 'kg' ? 1 : 10;
            if (amount - decrementValue >= 1) {
                setAmount(amount - decrementValue);
            }
        };
    }, [amount, selectedUnit]);

    return (

        <article className='product-card' id={id}>
            <p className='product-card__title'>{title}</p>
            <img src={process.env.PUBLIC_URL + '/' + src} alt={title} />
            <p className='product-card__price'>{price}</p>
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
                <button onClick={handleDecrement}>−</button>
                <input
                    type='number'
                    id={id + '-amount'}
                    min={1}
                    max={99}
                    placeholder='Amount'
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <button onClick={handleIncrement}>+</button>
            </div>
        </article>

    )
}

export default ProductCard