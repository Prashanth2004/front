
import React, { useState } from 'react'
import { Form ,Input,message} from "antd"
import { Link,useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from "axios";
import myImage from "../images/signup.jpeg"

const Login = () => {
        const[loading,setLoading]=useState(false)
        const navigate=useNavigate();
        const SubmitHandler=async (values)=>{
            try{
                setLoading(true);
                const {data} =await axios.post('/users/login',values)
                setLoading(false);
                localStorage.setItem("user",JSON.stringify({...data,password:""}));
                message.success('login succesfull')
                navigate('/');
            }
            catch(error){
                setLoading(false);
                message.error('invalid username of password');
            }
        };
  return (
    <>
   <div className='register-page' style={{display:"flex",flexDirection:"row",padding:"40px",}}>
   {loading && <Spinner/>}
   <div>
    <img src={myImage} alt="" style={{width:"450px",marginRight:"20px",height:"450px",borderRadius:"10px"}}/>
   </div>
   <div style={{backgroundColor:""}}>
   <h1 style={{marginBottom:"0px",marginLeft:"80px"}}>Log In</h1>
   <Form layout='vertical' onFinish={SubmitHandler} style={{ marginBottom: '0px', marginTop: "60px" }}>
        <Form.Item label='Email' name="email">
        <Input type='email'/>
        </Form.Item>
        <Form.Item label='Password' name="password">
        <Input type='password'/>
        </Form.Item>
        <div className='d-flex justify-content-centre'> 
            <Link to="/Register">Not have an account? click here to register</Link>
            <button className='btn btn-primary' style={{marginTop:"100px"}}>Log In</button>
        </div>
    </Form>
    </div>
   </div>
   </>
  )
}

export default Login
