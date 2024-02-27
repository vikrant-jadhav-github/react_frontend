import React, { useState } from 'react';
import '../css/Authentication.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../slices/userSlice';

function Authentication() {
    
    const [params] = useSearchParams();
    const navigate = useNavigate();
    let isLogin = params.get('login') === 'true' ? true : false;
    const dispatch = useDispatch();
    
    const [accountDetails, setAccountDetails] = useState({});
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(e){
        e.preventDefault();

        
        try {
            setLoading(true);
            if(!isLogin)
            {
                if(accountDetails.name === '' || accountDetails.email === '' || accountDetails.password === '' || accountDetails.confirmPassword === ''){
                    alert('Please fill all the fields');
                    return;
                }
        
                if(accountDetails.password !== accountDetails.confirmPassword){
                    alert('Passwords do not match');
                    return;
                }
                delete accountDetails.confirmPassword
                const response = await fetch("http://localhost:8000/api/v1/accounts/register/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accountDetails)
                });
    
                if(response.status === 201){
                    alert('Account created successfully');
                    isLogin = true;
                }else{
                    alert('Account creation failed');
                }

            }
            else{
                if(accountDetails.email === '' || accountDetails.password === ''){
                    alert('Please fill all the fields');
                    return;
                }
                const response = await fetch("http://localhost:8000/api/v1/accounts/login/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accountDetails)
                });

                if(response.status === 200){
                    const responseData = await response.json();
                    dispatch(setUser(responseData.user));
                    dispatch(setToken(responseData.token.access));
                    alert('Login successful');
                    navigate('/home');
                }else{
                    alert('Login failed');
                }
            }
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
            finally{
                setLoading(false);
                setAccountDetails({});
            }

    }

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        alert(error);
    }
    
    return (
        <div className="authentication">
           { !isLogin && <div className="register">
                <h1>REGISTER</h1>
                <form method="POST" onSubmit={onSubmit}>
                    <input type="text" name="name" placeholder="Enter Full Name"  onChange={(e) => setAccountDetails({...accountDetails, name: e.target.value})}/>
                    <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})}/>
                    <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setAccountDetails({...accountDetails, password: e.target.value})}/>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setAccountDetails({...accountDetails, confirmPassword: e.target.value})}/>
                    <button type="submit">Register</button>
                </form>
            </div>}

            { isLogin && <div className="login">
                <h1>LOGIN</h1>
                <form method="POST" onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})} />
                    <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setAccountDetails({...accountDetails, password: e.target.value})} />
                    <button type="submit">Login</button>
                </form>
            </div>}
        </div>
    );
}

export default Authentication;
