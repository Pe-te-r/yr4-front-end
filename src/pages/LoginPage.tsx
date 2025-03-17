import React, { useState, useRef } from "react";

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

  // Refs for OTP input boxes
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: LoginFormErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", {
        email: formData.email,
        idNumber: formData.idNumber,
        otp: formData.otp.join(""),
      });
      alert("Login successful!");
    } else {
      console.log("Form has errors. Please fix them.");
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;