import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

function Login() {
    const history = useHistory();
    
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/addproduct")
        }
    }, [])
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function login(){
        let items = {email, password};
        console.warn(items);
        const result = await fetch("http://127.0.0.1:8000/api/login", {
            method:'POST',
            headers:{
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(items),
        })

        const data = await result.json();

        localStorage.setItem("user-info", JSON.stringify(data));
        history.push("/")
    }

    return (
        <div>
            <Header />
            <h1>Login Page</h1>
            <div className="col-sm-4 offset-sm-4">
                <div className="mb-3">
                    <label className="text-left">Email address</label>
                    <br />
                    <input onChange={(e)=>setEmail(e.target.value)} 
                    type="email" placeholder="Enter email" />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <br />
                    <input onChange={(e)=>setPassword(e.target.value)} 
                    type="password" placeholder="Password" />
                </div>

                <button onClick={login} className="btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Login
