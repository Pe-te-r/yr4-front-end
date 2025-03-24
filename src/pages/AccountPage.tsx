import { useState } from 'react';
import { useUserStorage } from '../hooks/localStorage';

const AccountPage = () => {
  const { user } = useUserStorage();
  const [showIdNumber, setShowIdNumber] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    contact: '+254712345678',
    idType: 'National ID',
    idNumber: '12345678',
  });

  // Mock payment history - in a real app this would come from an API
  const currentMonth = new Date().getMonth();
  const paidMonths = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    paid: i <= currentMonth && Math.random() > 0.3, // Randomly mark some months as paid
  }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you would save to an API here
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-blue-600 text-4xl font-bold">
                      {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-2 cursor-pointer shadow-md">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {editMode ? (
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-blue-500 text-white border-b border-blue-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-blue-500 text-white border-b border-blue-300 focus:outline-none"
                      />
                    </div>
                  ) : (
                    `${formData.firstName} ${formData.lastName}`
                  )}
                </h1>
                <p className="text-blue-100">{user?.role} Account</p>
                <div className="mt-4 flex space-x-2">
                  {editMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Contact Number</label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.contact}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ID Verification */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">ID Verification</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">ID Type</label>
                    {editMode ? (
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="National ID">National ID</option>
                        <option value="Passport">Passport</option>
                        <option value="Driving License">Driving License</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.idType}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">ID Number</label>
                    <div className="mt-1 flex items-center">
                      {editMode ? (
                        <input
                          type={showIdNumber ? "text" : "password"}
                          name="idNumber"
                          value={formData.idNumber}
                          onChange={handleInputChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {showIdNumber ? formData.idNumber : '••••••••'}
                        </p>
                      )}
                      <button
                        onClick={() => setShowIdNumber(!showIdNumber)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        {showIdNumber ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment History</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {paidMonths.map((month, index) => (
                    <div key={index} className="text-center">
                      <div className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${month.paid ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {month.paid ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span>{month.month}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm">{month.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Upgrade */}
              <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-lg font-semibold mb-2 text-blue-800">Account Upgrade</h2>
                <p className="text-blue-600 mb-4">Upgrade to premium for additional features</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-medium text-gray-900">Basic</h3>
                    <p className="text-gray-500 text-sm mt-1">Current plan</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-500 relative">
                    <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">Popular</span>
                    <h3 className="font-medium text-gray-900">Premium</h3>
                    <p className="text-gray-500 text-sm mt-1">KSh 1,500/month</p>
                    <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Upgrade
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-medium text-gray-900">Enterprise</h3>
                    <p className="text-gray-500 text-sm mt-1">Contact sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;