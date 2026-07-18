import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";

function Signup() {

  return (

    <AuthLayout

      title="Create Account"

      subtitle="Join Volunteer Connect and start making an impact."

    >

      <SignupForm />

    </AuthLayout>

  );

}

export default Signup;