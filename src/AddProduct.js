import {React, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

function AddProduct() {
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/addproduct")
        }
    }, [])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const history = useHistory();

    async function addProduct(){
        let items = {name, price, description, file};
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        formData.append('price', price);
        formData.append('description', description);

        const result = await fetch("http://127.0.0.1:8000/api/addproduct", {
            method:'POST',
            body: formData,
        })

        alert('data have been saved')
        history.push("/");
    }
    return (
        <div>
            <Header />
            <h1>Add Product</h1>
            <div className="col-sm-4 offset-sm-4">
                <div className="mb-3">
                    <label className="text-left">Name</label>
                    <br />
                    <input onChange={(e)=>setName(e.target.value)} 
                    type="email" placeholder="Product's name" />
                </div>

                <div className="mb-3">
                    <label className="text-left">Image</label>
                    <br />
                    <input onChange={(e)=>setFile(e.target.files[0])} 
                    type="file" />
                </div>

                <div className="mb-3">
                    <label className="text-left">Price</label>
                    <br />
                    <input onChange={(e)=>setPrice(e.target.value)} 
                    type="email" placeholder="price" />
                </div>
                <div className="mb-3">
                    <label className="text-left">Description</label>
                    <br />
                    <input onChange={(e)=>setDescription(e.target.value)} 
                    type="email" placeholder="description" />
                </div>

                <button onClick={addProduct} className="btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddProduct
