import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function SuccessAnimation(){

return(

<motion.div

initial={{scale:0}}

animate={{scale:1}}

transition={{duration:.5}}

className="text-center"

>

<FaCheckCircle

className="text-green-400 text-7xl mx-auto"

/>

<h2 className="text-white text-3xl mt-5">

Email Verified

</h2>

</motion.div>

)

}

export default SuccessAnimation;