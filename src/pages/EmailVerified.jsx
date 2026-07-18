import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import SuccessCard from "../components/auth/SuccessCard";

function EmailVerified() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate("/login");

        }, 5000);

        return () => clearTimeout(timer);

    }, [navigate]);

    return (

        <AuthLayout
            title=""
            subtitle=""
        >

            <SuccessCard

                title="Email Verified!"

                message="Your email has been successfully verified. You will be redirected to the Login page in 5 seconds."

                buttonText="Login Now"

                onClick={() => navigate("/login")}

            />

        </AuthLayout>

    );

}

export default EmailVerified;