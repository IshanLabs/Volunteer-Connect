import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthInput({

   label,
  type,
  placeholder,
  icon: Icon,

  value,
  onChange,
  name,

  error

}) {

    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (

        <div className="mb-6">

            <label className="text-gray-300 text-sm mb-2 block">

                {label}

            </label>

            <div
                className="
                relative
                group
            "
            >

                {/* Left Icon */}

                <Icon
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-green-400
                "
                />

                <input
                type={inputType}

                name={name}


                value={value}

                onChange={onChange}

                placeholder={placeholder}

                    

                    className="
                    w-full
                    pl-12
                    pr-12
                    py-4
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    text-white
                    outline-none

                    group-focus-within:border-green-400

                    group-focus-within:shadow-[0_0_20px_rgba(34,197,94,.35)]

                    transition-all

                "
                />

                {type === "password" && (

                    <button

                        type="button"

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }

                        className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                    >

                        {showPassword ? <FaEyeSlash /> : <FaEye />}

                    </button>

                )}

            </div>

            {error && (

                <p className="text-red-400 text-sm mt-2">

                    {error}

                </p>

            )}

        </div>

    );

}

export default AuthInput;