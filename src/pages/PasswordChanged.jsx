import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import SuccessCard from "../components/auth/SuccessCard";

function PasswordChanged(){

const navigate=useNavigate();

useEffect(()=>{

const timer=setTimeout(()=>{

navigate("/login");

},5000);

return()=>clearTimeout(timer);

},[]);

return(

<AuthLayout

title=""

subtitle=""

>

<SuccessCard

title="Password Updated!"

message="Your password has been changed successfully."

buttonText="Back To Login"

onClick={()=>navigate("/login")}

/>

</AuthLayout>

)

}

export default PasswordChanged;