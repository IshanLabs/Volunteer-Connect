import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function ResetPassword(){

const navigate=useNavigate();

const[newPassword,setNewPassword]=useState("");

const[confirmPassword,setConfirmPassword]=useState("");

const[errors,setErrors]=useState({});

const[loading,setLoading]=useState(false);

const validate=()=>{

const newErrors={};

if(newPassword==="")

newErrors.password="Password required.";

if(confirmPassword==="")

newErrors.confirm="Confirm password.";

if(

newPassword!==confirmPassword

&&

confirmPassword

)

newErrors.confirm="Passwords do not match.";

return newErrors;

};

const handleSubmit=(e)=>{

e.preventDefault();

const validation=validate();

setErrors(validation);

if(Object.keys(validation).length>0)

return;

setLoading(true);

setTimeout(()=>{

setLoading(false);
toast.success("Password updated successfully!");

navigate("/password-changed");

},2000);

};

return(

<AuthLayout

title="Reset Password"

subtitle="Create a strong password."

>

<form onSubmit={handleSubmit}>

<AuthInput

label="New Password"

type="password"

placeholder="New Password"

icon={FaLock}

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

error={errors.password}

/>

<AuthInput

label="Confirm Password"

type="password"

placeholder="Confirm Password"

icon={FaLock}

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

error={errors.confirm}

/>

<AuthButton

loading={loading}

type="submit"

>

Reset Password

</AuthButton>

</form>

</AuthLayout>

)

}

export default ResetPassword;