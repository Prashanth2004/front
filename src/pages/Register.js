// import React, { useState } from 'react'
// import { Form ,Input, message} from "antd"
// import { Link,useNavigate } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// const Register = () => {
//     const[loading,setLoading]=useState(false)
//     const navigate=useNavigate();
//     const [msg, setMsg] = useState("");
//     const SubmitHandler=async (values)=>{
//         try{
//             setLoading(true);
//             await axios.post('/users/register',values)
//             //setMsg(res.message);
//             message.success('Registration succesfull')
//             navigate('/login')
            
//         }
//         catch(error){
//             setLoading(false);
//             message.error('invalid username of password');
//         }
//     };
//   return (
//    <>
//    <div className='register-page'>
//     {loading && <Spinner/>}
//     <Form layout='vertical' onFinish={SubmitHandler}>
//         <h1>Register Page</h1>
//         <Form.Item label='Name' name="name">
//         <Input/>
//         </Form.Item>
//         <Form.Item label='Email' name="email">
//         <Input type='email'/>
//         </Form.Item>
//         <Form.Item label='Password' name="password">
//         <Input type='password'/>
//         </Form.Item>
//         <div className='d-flex justify-content-centre'> 
//             <Link to="/login">Already Registerd? click here to Login</Link>

//             <button className='btn btn-primary'>Register</button>
//         </div>
//     </Form>
//    </div>
   
//    </>
//   )
// }
import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import myImage from "../images/signup.jpeg"
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="resgister-page " style={{display:"flex",flexDirection:"row",padding:"40px",marginLeft:"290px",marginTop:"80px",}}>
        {loading && <Spinner />}
        <div>
        <img src={myImage} alt="" style={{width:"450px",marginRight:"20px",height:"450px",borderRadius:"10px"}}/>
        </div>
        <div>
        <h1 style={{marginBottom:"0px",marginLeft:"80px"}}>SIGN UP</h1>
        <Form layout="vertical" onFinish={submitHandler} style={{marginBottom:'0px',marginTop:"50px"}}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Register ? Cleck Here to login</Link>
            <button className="btn btn-primary" style={{marginTop:"50px"}}>Resgiter</button>
          </div>
        </Form>
      </div>
      </div>
    </>
  );
};

export default Register;
