import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEnvelope } from "react-icons/fa";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function ForgotPassword(){

const navigate=useNavigate();

const[email,setEmail]=useState("");

const[loading,setLoading]=useState(false);

const[error,setError]=useState("");

const handleSubmit=(e)=>{

e.preventDefault();

if(email===""){

setError("Email is required.");

return;

}

if(!/\S+@\S+\.\S+/.test(email)){

setError("Enter valid email.");

return;

}

setError("");

setLoading(true);

setTimeout(()=>{

setLoading(false);

// Later replace with API

navigate("/verify-email");

},2000);

};

return(

<AuthLayout

title="Forgot Password"

subtitle="Enter your registered email to receive an OTP."

>

<form onSubmit={handleSubmit}>

<AuthInput

label="Email"

type="email"

placeholder="Enter email"

icon={FaEnvelope}

value={email}

onChange={(e)=>setEmail(e.target.value)}

error={error}

/>

<AuthButton

loading={loading}

type="submit"

>

Send OTP

</AuthButton>

</form>

</AuthLayout>

)

}

export default ForgotPassword;