import { useState } from 'react';
import { useUserStorage } from '../hooks/localStorage';
import { useGetUserByIdQuery } from '../slice/user';
import { toast } from 'react-toastify';

const AccountPage = () => {
  const { user: localUser } = useUserStorage();
  const userId = localUser?.userId || '';
  const { data: apiUser, isLoading, isError } = useGetUserByIdQuery(userId);
  
  const [showIdNumber, setShowIdNumber] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  // Static user data for demonstration
  const userStats = {
    joinedDate: 'January 2023',
    lastLogin: ' ',
    accountStatus: 'Verified',
    devices: 1,
    securityLevel: 'Low'
  };

  // Mock payment history
  const currentMonth = new Date().getMonth();
  const paidMonths = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    paid: i <= currentMonth && Math.random() > 0.3,
  }));

  // Static profile image
  const profileInitial = apiUser?.data.fistname?.charAt(0) || 'U';

  const showMessage=()=>{
    toast('Working hard to implement the functionality')
  }


  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center">Error loading user data</div>;
  if (!apiUser) return <div className="min-h-screen flex items-center justify-center">No user data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <span className="text-blue-600 text-4xl font-bold">
                    {profileInitial}
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  Active
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {apiUser.data.fistname || 'User'}
                </h1>
                <p className="text-blue-100 text-lg">{localUser?.role} Account</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-blue-500 bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    Member since {userStats.joinedDate}
                  </span>
                  <span className="bg-green-500 bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {userStats.accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{apiUser.data.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                      <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{apiUser.data.contact}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">ID Type</label>
                      <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{apiUser.data.id_type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">ID Number</label>
                      <div className="flex items-center">
                        <p className="text-gray-900 p-2 bg-gray-50 rounded-md flex-1">
                          {showIdNumber ? apiUser.data.id_number || 'Not provided' : '••••••••'}
                        </p>
                        <button
                          onClick={() => setShowIdNumber(!showIdNumber)}
                          className="ml-2 p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 cursor-pointer"
                          title={showIdNumber ? 'Hide ID' : 'Show ID'}
                        >
                          {showIdNumber ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Payment History
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {paidMonths.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${month.paid ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'} transition-colors`}>
                          {month.paid ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="font-medium">{month.month}</span>
                          )}
                        </div>
                        <p className="mt-2 text-sm font-medium">{month.month}</p>
                        <p className="text-xs text-gray-500">{month.paid ? 'Paid' : 'Pending'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar Column */}
              <div className="space-y-6">
                {/* Account Status Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Account Status
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Membership</span>
                      <span className="font-medium">Standard</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Login</span>
                      <span className="font-medium">{userStats.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Devices</span>
                      <span className="font-medium">{userStats.devices} connected</span>
                    </div>
                    <button onClick={showMessage} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                      Upgrade Account
                    </button>
                  </div>
                </div>

                {/* Security Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Security
                    </h2>
                    <button 
                      onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showSecurityInfo ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Security Level</span>
                    <span className="font-medium">{userStats.securityLevel}</span>
                  </div>
                  {showSecurityInfo && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Two-factor authentication enabled</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Email verification complete</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Phone number verified</span>
                      </div>
                    </div>
                  )}
                  <button onClick={showMessage} className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium transition-colors">
                    Change Password
                  </button>
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