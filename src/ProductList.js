import Header from './Header'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

function ProductList() {
    const [data, setData] = useState([])

    useEffect( ()=> {
        getData()
    }, [])

    async function deleteOperation(id){
        let result = await fetch("http://127.0.0.1:8000/api/delete/" + id, {
            method: "DELETE"
        })
        
        alert('product has been delete')
        console.warn(result)
        getData();
    }

    async function getData(){
        let result = await fetch("http://127.0.0.1:8000/api/list")
        const response = await result.json()
        setData(response)
    }

    async function getProduct(id){
        let result = fetch("http://127.0.0.1:8000/api/product/"+id)
        console.warn(result)
    }

    return (
        <div>
            <Header />
            <h1>Product list</h1>
            <div className="col-sm-6 offset-sm-3">
            <Table>
            <thead>
                <tr>
                <th>id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th></th>
                <th>Operation</th>
                <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item)=>
                    <tr key={item.id} onClick={(e) => getProduct(item.id)}
                    style={{ cursor: "pointer"}}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>
                            <img src={"http://localhost:8000/" + item.file_path} 
                            style={{ width:50 }}/>
                        </td>
                        <td>
                            <span onClick={() => deleteOperation(item.id)} 
                            className="delete" >Delete</span>
                        </td>
                        <Link to={"/update/"+item.id}>
                            <td>
                                <span className="update" >Update</span>
                            </td>
                        </Link>
                    </tr>
                    )
                }
            </tbody>
            </Table>
            </div>
        </div>
    )
}

export default ProductList
