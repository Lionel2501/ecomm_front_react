import {React, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import { withRouter } from 'react-router-dom'

function UpdateProduct(props) { 
    const [data, setData] = useState([])

    const [name, setName] = useState(data.name)
    const [file, setFile] = useState(data.file_path)
    const [price, setPrice] = useState(data.price)
    const [description, setDescription] = useState(data.description)
    
    const history = useHistory();
    
    useEffect(async () => {
        let result = await fetch("http://127.0.0.1:8000/api/product/" + props.match.params.id)
        const response = await result.json();
        setData(response)
    }, [])
    
    async function update() {
        let items = { name, price, description, file };
        const response = await fetch("http://127.0.0.1:8000/api/update/" + props.match.params.id, {
            "method": "PUT",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(items)
        })
        console.log(response)
        alert('it s ok')
        //const data = await response.json();
        console.warn(data)
        history.push("/");
    }

    return (
        <div>
            <Header />
            <h1>Update product</h1>
            <div className="col-sm-4 offset-sm-4">
                <div className="mb-3">
                    <label className="text-left">Name</label>
                    <br />
                    <input defaultValue={data.name}
                        onChange={(e) => setName(e.target.value)}
                        type="email" placeholder="Product's name" />
                </div>

                <div className="mb-3">
                    <label className="text-left">Image</label>
                    <br />
                    <input defaultValue={data.file_path}
                        onChange={(e) => setFile(e.target.value)}
                        type="file" />
                    <img src={"http://localhost:8000/" + data.file_path}
                        style={{ width: 50 }} />
                </div>

                <div className="mb-3">
                    <label className="text-left">Price</label>
                    <br />
                    <input defaultValue={data.price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text" placeholder="price" />
                </div>
                <div className="mb-3">
                    <label className="text-left">Description</label>
                    <br />
                    <input defaultValue={data.description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text" placeholder="description" />
                </div>

                <button onClick={update}
                    className="btn btn-primary" type="submit">
                    Update
                </button>
            </div>
        </div>
    )
}

export default withRouter(UpdateProduct);
