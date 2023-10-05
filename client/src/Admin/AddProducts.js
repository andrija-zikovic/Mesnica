import React, { useState } from 'react'

const AddProducts = () => {

    const [productInfo, setProductInfo] = useState({
        title: '',
        price: '',
        onStorage: '',
        meatType: '',
        image: null,
    });

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', productInfo.title);
            formData.append('price', productInfo.price);
            formData.append('onStorage', productInfo.onStorage);
            formData.append('meatType', productInfo.meatType);
            /* const url = 'http://localhost:3500/admin/addProduct'; */
            const url = 'https://expert-fortnight-7v7xpprp4g4fwxr4-3500.app.github.dev/admin/addProduct'
            const req = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            if (req.ok) {
                console.log("Product Add")
            }
        } catch (err) {
            console.error('Error giving product:', err)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
            setProductInfo({
                ...productInfo,
                [name]: value,
            });
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setProductInfo({...productInfo, image: selectedImage,});
        }
    }

    return (
        <section className='addProducts'>
            <h2>Dodaj Proizvod</h2>
            <form id='addProForm' className='addProForm' onSubmit={handleAddSubmit}>
                <label htmlFor='title' className='offscreen'>Name</label>
                <input type='text' name='title' id='title' placeholder='Ime'
                    onChange={handleInputChange} required />

                <label htmlFor='price' className='offscreen'>Name</label>
                <input type='number' name='price' id='price' placeholder='Cijena' step="0.01" min={0}
                    onChange={handleInputChange} required />

                <label htmlFor='onStorage' className='offscreen'>Name</label>
                <input type='number' name='onStorage' id='onStorage' placeholder='Na stanju'
                    onChange={handleInputChange} required />

                <label htmlFor='meatType' className='offscreen'>Name</label>
                <input type='text' name='meatType' id='meatType' placeholder='Vrsta mesa'
                    onChange={handleInputChange} required />
                <div className='imgForm'>
                    <label htmlFor='imgSrc'>Dodaj sliku</label>
                    <input type='file' name='imgSrc' id='imgSrc' accept='image/*'
                        onChange={handleFileChange} required />
                </div>
                
                <div className='addButton'>
                    <button className='add' type='submit'>DODAJ</button>
                </div>
            </form >
        </section>
    )
}

export default AddProducts