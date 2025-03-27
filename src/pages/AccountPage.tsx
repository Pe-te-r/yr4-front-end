import { useState } from 'react';
import { useUserStorage } from '../hooks/localStorage';
import { useGetUserByIdQuery } from '../slice/user';

const AccountPage = () => {
  const { user: localUser } = useUserStorage();
  const userId = localUser?.userId || ''; // Get user ID from localStorage
  const { data: apiUser, isLoading, isError,error } = useGetUserByIdQuery(userId);
  console.log(error)
  console.log(apiUser)
  const [showIdNumber, setShowIdNumber] = useState(false);

  // Mock payment history (replace with real API data if available)
  const currentMonth = new Date().getMonth();
  const paidMonths = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    paid: i <= currentMonth && Math.random() > 0.3,
  }));

  // Static profile image (first letter of firstname)
  const profileInitial = apiUser?.data.fistname?.charAt(0) || 'U';

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      console.log('User wants to delete account with ID:', userId);
      // Add actual delete API call here
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center">Error loading user data</div>;
  if (!apiUser) return <div className="min-h-screen flex items-center justify-center">No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  <span className="text-blue-600 text-4xl font-bold">
                    {profileInitial}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {apiUser.data.fistname || 'User'} {/* Note: There's a typo in your interface (fistname vs firstname) */}
                </h1>
                <p className="text-blue-100">{localUser?.role} Account</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700"
                  >
                    Delete Account
                  </button>
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
                    <p className="mt-1 text-gray-900">{apiUser.data.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Contact Number</label>
                    <p className="mt-1 text-gray-900">{apiUser.data.contact}</p>
                  </div>
                </div>
              </div>

              {/* ID Verification */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">ID Verification</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">ID Type</label>
                    <p className="mt-1 text-gray-900">{apiUser.data.id_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">ID Number</label>
                    <div className="mt-1 flex items-center">
                      <p className="text-gray-900">
                        {showIdNumber ? '••••••••' : '••••••••'} {/* Masked for security */}
                      </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;