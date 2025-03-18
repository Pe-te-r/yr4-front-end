import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../slice/auth";
// import { data } from "react-router-dom";
import { UserRegistrationData } from "../types/authType";

// Define types for form data
interface FormData {
  // idType: string;
  idType: "Kenyan Citizen" | "Refugee" | "Foreign Citizen" | "Mandate" | "";
  idNumber: string;
  firstName: string;
  phoneNumber: string;
  email:string
}

// Define types for errors
interface FormErrors {
  idType: string;
  idNumber: string;
  firstName: string;
  phoneNumber: string;
  email:string
}

const RegisterPage: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    // idType: "",
  idType: "",
    idNumber: "",
    firstName: "",
    phoneNumber: "",
    email:''
  });

  // State for form errors
  const [errors, setErrors] = useState<FormErrors>({
    idType: "",
    idNumber: "",
    firstName: "",
    phoneNumber: "",
    email:''
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // Register user mutation
  const [sendData, { isLoading,error, data, isError, isSuccess }] = useRegisterUserMutation();

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
    console.log(error)
  }, [isSuccess, isError]);

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    if (!formData.idType) {
      newErrors.idType = "ID Type is required";
      isValid = false;
    }
    if (!formData.idNumber) {
      newErrors.idNumber = "ID Number is required";
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    }

    if(!formData.email){
        newErrors.email="Email is required"
        isValid=false
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      const userRegistrationData:UserRegistrationData = {
        idType: formData.idType,
        id_number: formData.idNumber,
        firstname: formData.firstName,
        contact: formData.phoneNumber,
        email: formData.email
      };
      sendData(userRegistrationData)
      // alert("Form submitted successfully!");
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

      {/* Register Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* ID Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium  mb-2">
              ID Type
            </label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border cursor-pointer ${
                errors.idType ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select ID Type</option>
              <option value="Kenyan Citizen">Kenyan Citizen</option>
              <option value="Foreign Citizen">Foreign Citizen</option>
              <option value="Mandatee Number">Mandatee Number</option>
              <option value="Refugee">Refugee</option>
            </select>
            {errors.idType && (
              <p className="text-red-500 text-sm mt-1">{errors.idType}</p>
            )}
          </div>
{/* email */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
             Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter ID Number"
              className={`w-full px-3 py-2 border ${
                errors.idNumber ? "border-red-500" : "border-gray-300"
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
              placeholder="Enter ID Number"
              className={`w-full px-3 py-2 border ${
                errors.idNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
            )}
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              className={`w-full px-3 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className={`w-full px-3 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Proceed
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;