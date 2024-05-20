import React from 'react'
import { Form, redirect } from 'react-router-dom'
import styled from 'styled-components'
import customFetch from '../utils'
import { toast } from 'react-toastify'
import backgroundImg from '../assets/background.jpg'

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData);
    console.log(data);
    if (data.password.length < 6) {
        toast.error('your password is to short ');
        return { msg: 'error' }
    }
    try {
        await customFetch.post('/auth/register', data);
        toast.success('You have registered successfully');
        return redirect('/login')
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const Register = () => {
    return (
        <Wrapper>
            <div className="form">
                <Form method='post' >
                    <h1>Register</h1>
                    <label htmlFor="name" className="form-label">name</label>
                    <input type="name" name='name' className="form-input" required />

                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name='email' className="form-input" required />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-input" required />
                    <button className="btn-1">Submit</button>
                </Form>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
    display: grid;
    place-items: center;
    height: 100vh;
    .form{
        border: 1px solid black;
        width: 400px;
        height: 500px;
        color: white;
        border-radius: 20px;
        background-image: url(${backgroundImg});
        box-shadow: 0px 0px 20px rgba(0,0,0,0.75); 
        background-size:cover;
        background-position: center; 
        overflow: hidden;
    }
    form{
        display: block;
        box-sizing: border-box;
        padding: 40px;
        width: 100%;
        height: 100%;
        backdrop-filter: brightness(40%);
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    h1{
        font-weight:normal;
        text-align:center;
        font-size:24px;
        text-shadow:0px 0px 2px rgba(0,0,0,0.5);
        margin-bottom: 60px;
    }
    .form-label{
        color: rgba(255,255,255,0.8);
        text-transform:uppercase;
        font-size:10px;
        letter-spacing: 2px;
        padding-left:10px;
    }
    .form-input{
        background:rgba(255,255,255,0.3);
        height:40px;
        line-height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        border:none;
        margin-bottom: 20px;
        color:white;
    }
    .btn-1{
        background-color: rgb(45,126,231);
        height: 40px;;
        line-height: 40px;
        border-radius:40px;
        border: none;
        margin:10px 0;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
        color: white;
    }
`
export default Register