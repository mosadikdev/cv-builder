// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { FaFilePdf, FaChartBar, FaUser, FaCog, FaPlus, FaEdit, FaTrash, FaDownload, FaBell, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('resumes');
  const user = JSON.parse(localStorage.getItem('user')) || {
    fullName: 'John Doe',
    email: 'john@example.com',
    createdAt: '2023-01-15'
  };
  
  const resumes = [
    { id: 1, title: 'Software Engineer Resume', lastEdited: '2023-10-15', template: 'Modern' },
    { id: 2, title: 'UX Designer Resume', lastEdited: '2023-09-28', template: 'Creative' },
    { id: 3, title: 'Project Manager Resume', lastEdited: '2023-08-10', template: 'Professional' },
    { id: 4, title: 'Data Analyst Resume', lastEdited: '2023-07-22', template: 'Minimalist' },
  ];

  const stats = [
    { label: 'Total Resumes', value: '8', change: '+2' },
    { label: 'Downloads', value: '24', change: '+5' },
    { label: 'Templates Used', value: '4', change: '+1' },
    { label: 'Account Age', value: '9 months', change: '' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <FaFilePdf className="mr-2" />
                Dashboard
              </h1>
              <p className="text-indigo-200 mt-1">Welcome back, {user.fullName || 'User'}</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none placeholder:text-indigo-200"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" />
              </div>
              
              <button className="relative p-2 text-indigo-200 hover:text-white">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resumes'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FaFilePdf className="mr-2" />
                My Resumes
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FaChartBar className="mr-2" />
                Statistics
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                Profile
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FaCog className="mr-2" />
                Settings
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'resumes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">My Resumes</h2>
                <p className="text-gray-600 mt-1">Manage and create your professional resumes</p>
              </div>
              <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                <FaPlus />
                <span>Create New Resume</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map(resume => (
                <div key={resume.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{resume.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">Template: {resume.template}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {resume.lastEdited}
                      </span>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 flex items-center justify-center space-x-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-2 px-3 rounded-lg text-sm transition">
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-lg text-sm transition">
                        <FaDownload />
                        <span>Download</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded-lg text-sm transition">
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create New Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-dashed border-indigo-300 rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-indigo-100 transition">
                <div className="bg-indigo-600 text-white p-3 rounded-full mb-4">
                  <FaPlus className="text-2xl" />
                </div>
                <h4 className="font-bold text-lg text-indigo-800">Create New Resume</h4>
                <p className="text-gray-600 mt-2">Start building a new resume from scratch</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-4" />
                <button className="text-indigo-600 font-medium">Change Photo</button>
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      defaultValue={user.fullName || 'John Doe'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      defaultValue={user.email || 'john@example.com'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {user.createdAt || '2023-01-15'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                    <div className="bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200 font-medium">
                      Free Plan
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Resume Statistics</h2>
              <p className="text-gray-600 mt-1">Track your resume performance and activity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                    {stat.change && (
                      <span className="ml-3 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {stat.change} this month
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Resume Activity</h3>
                <button className="text-sm text-indigo-600 font-medium">View Full Report</button>
              </div>
              
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center">
                <span className="text-gray-500">Resume activity chart visualization</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Template Usage</h3>
                <div className="space-y-4">
                  {['Modern', 'Professional', 'Creative', 'Minimalist'].map((template, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">{template}</span>
                        <span className="text-gray-700">{index + 2} resumes</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${(index + 1) * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Created', title: 'Data Analyst Resume', time: '2 hours ago' },
                    { action: 'Downloaded', title: 'UX Designer Resume', time: '1 day ago' },
                    { action: 'Edited', title: 'Software Engineer Resume', time: '3 days ago' },
                    { action: 'Created', title: 'Project Manager Resume', time: '1 week ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-indigo-100 text-indigo-800 p-3 rounded-full mt-1">
                        <FaFilePdf />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{activity.title}</p>
                        <p className="text-gray-600 text-sm">
                          <span className="capitalize">{activity.action}</span> • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      defaultValue="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      defaultValue={user.email || "john@example.com"}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="notifications" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="notifications" className="ml-3 text-gray-700">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="newsletter" className="ml-3 text-gray-700">
                      Product updates and newsletter
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;