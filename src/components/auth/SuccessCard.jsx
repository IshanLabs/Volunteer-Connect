import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function SuccessCard({

title,

message,

buttonText,

onClick

}){

return(

<div className="text-center">

<motion.div

initial={{scale:0}}

animate={{scale:1}}

transition={{

duration:.6,

type:"spring"

}}

>

<FaCheckCircle

className="text-green-400 text-8xl mx-auto"

/>

</motion.div>

<h2

className="text-white text-4xl font-bold mt-8"

>

{title}

</h2>

<p

className="text-gray-300 mt-4"

>

{message}

</p>

<button

onClick={onClick}

className="

mt-10

bg-green-500

hover:bg-green-600

px-10

py-4

rounded-xl

text-white

font-semibold

transition

"

>

{buttonText}

</button>

</div>

)

}

export default SuccessCard;