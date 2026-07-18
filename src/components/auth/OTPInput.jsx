import { useRef, useState } from "react";

function OTPInput({ onComplete }) {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputs = useRef([]);

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) return;

    const updatedOTP = [...otp];

    updatedOTP[index] = value;

    setOtp(updatedOTP);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (updatedOTP.every((digit) => digit !== "")) {
      onComplete(updatedOTP.join(""));
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace") {

      if (!otp[index] && index > 0) {

        inputs.current[index - 1].focus();

      }

    }

  };

  const handlePaste = (e) => {

    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const updatedOTP = [...otp];

    pasted.split("").forEach((digit, i) => {
      updatedOTP[i] = digit;
    });

    setOtp(updatedOTP);

    if (pasted.length === 6) {
      onComplete(pasted);
    }

  };

  return (

    <div

      className="flex justify-between gap-3"

      onPaste={handlePaste}

    >

      {otp.map((digit, index) => (

        <input

          key={index}

          ref={(el) => (inputs.current[index] = el)}

          type="text"

          maxLength={1}

          value={digit}

          onChange={(e) =>
            handleChange(e.target.value, index)
          }

          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }

          className="
          w-14
          h-14
          rounded-xl
          text-center
          text-2xl
          bg-white/10
          border
          border-white/10
          text-white
          outline-none
          focus:border-green-400
          focus:shadow-[0_0_20px_rgba(34,197,94,.4)]
          transition
          "

        />

      ))}

    </div>

  );

}

export default OTPInput;