import React, { useState, useRef } from "react";
import { useGetCodeByEmailMutation } from "../slice/code";
import  { toast} from "react-toastify";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../slice/auth";
import { useUserStorage } from "../hooks/localStorage";

// Define types for form data
interface LoginFormData {
  email: string;
  idNumber: string;
  otp: string[];
}

// Define types for errors
interface LoginFormErrors {
  email: string;
  idNumber: string;
  otp: string;
}

const LoginPage: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    idNumber: "",
    otp: ["", "", "", ""],
  });

  // State for form errors
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    idNumber: "",
    otp: "",
  });

  // State for OTP sent status
  const [otpSent, setOtpSent] = useState(false);

  // State for "Get Another Code" button cooldown
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [otpButtonCountdown, setOtpButtonCountdown] = useState(30);

  // Refs for OTP input boxes
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // RTK Query mutation for sending email
  const [sendMail, { isLoading: MailLoading}] =
    useGetCodeByEmailMutation();

  // Handle input change for email and ID number
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...formData.otp];
    newOtp[index] = value;

    setFormData({
      ...formData,
      otp: newOtp,
    });

    // Move focus to the next input box if a number is typed
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    // Move focus to the previous input box if a number is deleted
    if (!value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 4); // Only take the first 4 characters
    const newOtp = [...formData.otp];

    for (let i = 0; i < pasteData.length; i++) {
      if (i < 4) {
        newOtp[i] = pasteData[i];
      }
    }

    setFormData({
      ...formData,
      otp: newOtp,
    });

    // Move focus to the last input box
    otpRefs.current[Math.min(pasteData.length, 3)]?.focus();
  };

  // Validate email
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle "Get OTP" button click
  const handleGetOtp = async () => {
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await sendMail({ email: formData.email }).unwrap();
      toast(response.message);
      setOtpSent(true);
    } catch (err) {
      console.log(err)
      const errorResult=err as ErrorResponse
      toast.error(errorResult.data.message);
    }
  };

  // Handle "Get Another Code" button click
  const handleGetAnotherCode = async () => {
    setOtpButtonDisabled(true);
    try {
      const response = await sendMail({ email: formData.email }).unwrap();
      toast.success(response.message);
    } catch (err) {
      console.log(err)
      toast.error("Failed to send OTP. Please try again.");
    }

    // Start countdown
    let countdown = 30;
    const interval = setInterval(() => {
      countdown -= 1;
      setOtpButtonCountdown(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        setOtpButtonDisabled(false);
        setOtpButtonCountdown(30);
      }
    }, 1000);
  };

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: LoginFormErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.idNumber) {
      newErrors.idNumber = "ID Number is required";
      isValid = false;
    }

    if (formData.otp.some((digit) => !digit)) {
      newErrors.otp = "OTP is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate=useNavigate()
  const {saveUser} =useUserStorage()
  // Handle form submission
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        console.log("Form Data:", {
          email: formData.email,
          idNumber: formData.idNumber,
          code: formData.otp.join(""),
        });
      const data={
          otp:formData.otp.join(''),
          id_number:formData.idNumber,
          email:formData.email
        }
      const response = await loginUser(data).unwrap();
      console.log("Login successful:", response.data?.token);
      toast.success("Login successful!");
      navigate('/bot')
      if(response.data){
        saveUser(response.data?.token,response.data?.id,response.data?.role)
      }

      }
      
    } catch (err) {
      const errorResponse = err as ErrorResponse
      toast.error(errorResponse.data.message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

      {/* Logo */}
      <div className="mb-8">
        <img
          src="https://sha.go.ke/images/sha_logo.svg"
          alt="SHA Logo"
          className="h-16"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Get OTP Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleGetOtp}
              disabled={!validateEmail(formData.email) || MailLoading}
              className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {MailLoading ? (
                <div className="flex items-center justify-center">
                  <span>Sending OTP...</span>
                  <div className="ml-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                "Get OTP"
              )}
            </button>
          )}

          {/* ID Number and OTP Section */}
          {otpSent && (
            <>
              {/* ID Number */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Enter your ID Number"
                  className={`w-full px-3 py-2 border ${
                    errors.idNumber ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.idNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
                )}
              </div>

              {/* OTP Section */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  OTP
                </label>
                <div className="flex space-x-2">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onPaste={handleOtpPaste}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      className={`w-1/4 px-3 py-2 border ${
                        errors.otp ? "border-red-500" : "border-gray-300"
                      } rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                <button
                  type="button"
                  onClick={handleGetAnotherCode}
                  disabled={otpButtonDisabled}
                  className="mt-2 text-sm text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {otpButtonDisabled
                    ? `Resend OTP in ${otpButtonCountdown}s`
                    : "Didn't receive OTP? Get it again"}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={MailLoading}
                className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading?
                  <div className="ml-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>:
                'Login'
                }
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
