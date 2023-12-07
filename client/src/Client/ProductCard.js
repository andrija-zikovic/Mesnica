import React, { useState } from 'react'
import './ProductCard.css'

const ProductCard = ({ id, src, title, price, handleAmountChange }) => {
    // Initialize state for input value and selected unit
    const [selectedUnit, setSelectedUnit] = useState('kg');
    const [amount, setAmount] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const handleImageLoad = () => {
        setImageLoaded(true);
      };

    return (
        <article className={`product-card ${imageLoaded ? 'loaded' : ''}`} id={id}>
            <form id={id} onSubmit={(e) => e.preventDefault()}>    
                <p className={`product-card__title ${title.length > 18 ? 'resizeCard' : ''}`}>{title}</p>
                
                <img 
                    src={src} 
                    alt={title} 
                    onLoad={handleImageLoad}
                />
                {imageLoaded && (
                <>
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
                </>
                )}
            </form>
        </article>
            
    );
};

export default ProductCard