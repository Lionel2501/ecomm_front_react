import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import { Table } from 'react-bootstrap'

const Search = () => {
    const [data, setData] = useState([])

    async function search(key) {

        let result = await fetch("http://127.0.0.1:8000/api/search/" + key);
        const response = await result.json()
        setData(response)
    }
    return (
        <div>
            <Header />
            <h1>Search product</h1>
            <input type="text" placeholder="Search product"
                onChange={(e) => search(e.target.value)} />
            <div className="col-sm-6 offset-sm-3">
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) =>
                            <tr key={item.id}
                                style={{ cursor: "pointer" }}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={"http://localhost:8000/" + item.file_path}
                                    style={{ width: 50 }} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default Search
