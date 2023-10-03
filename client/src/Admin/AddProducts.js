import React from 'react'

const AddProducts = () => {
    return (
        <section className='addProducts'>
            <h2>Dodaj Proizvod</h2>
            <form id='addProForm' className='addProForm'>
                <label htmlFor='title' className='offscreen'>Name</label>
                <input type='text' name='title' id='title' placeholder='Ime' required />

                <label htmlFor='price' className='offscreen'>Name</label>
                <input type='number' name='price' id='price' placeholder='Cijena' required />

                <label htmlFor='onStorage' className='offscreen'>Name</label>
                <input type='number' name='onStorage' id='onStorage' placeholder='Na stanju' required />

                <label htmlFor='meatType' className='offscreen'>Name</label>
                <input type='text' name='meatType' id='meatType' placeholder='Vrsta mesa' required />
                <div className='imgForm'>
                    <label htmlFor='img'>Dodaj sliku</label>
                    <input type='file' name='img' id='img' accept='image/*' required />
                </div>
                <div className='addButton'>
                    <button className='add' type='submit'>DODAJ</button>
                </div>
            </form >
        </section>
    )
}

export default AddProducts