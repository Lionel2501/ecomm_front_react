import {React, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

function Register() {
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/addproduct")
        }
    }, [])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    async function signUp(){
        let items = {name, email, password};
        console.warn(items)
        const result = await fetch("http://127.0.0.1:8000/api/register", {
            method:'POST',
            body: JSON.stringify(items),
            headers:{
                "Accept":'application/json',
                "Content-Type":'application/json',
            },
        })

        const data = await result.json();

        localStorage.setItem("user-info", JSON.stringify(data));
        history.push("/addproduct")
    }
    
    return (
        <div>
            <Header />
            <h1>Register Page</h1>
            <div className="col-sm-4 offset-sm-4">
                <div className="mb-3">
                    <label className="text-left">Name</label>
                    <br />
                    <input value={name} onChange={(e)=>setName(e.target.value)} 
                    type="text" placeholder="Enter name" />
                </div>

                <div className="mb-3">
                    <label className="text-left">Email address</label>
                    <br />
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} 
                    type="email" placeholder="Enter email" />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <br />
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} 
                    type="password" placeholder="Password" />
                </div>

                <button className="btn btn-primary" onClick={signUp} type="submit">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Register
