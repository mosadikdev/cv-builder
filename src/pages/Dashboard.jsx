import React, { useState } from 'react';
import { FaFilePdf, FaPlus, FaDownload, FaMagic } from 'react-icons/fa';
import CVForm from '../components/CVForm';
import TemplateSelection from '../components/TemplateSelection';
import PreviewCV from '../components/PreviewCV';

const Dashboard = () => {
  const [step, setStep] = useState('dashboard'); 
  const [cvData, setCvData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'mohamed',
    email: 'mohamed@example.com',
    joined: '2023-01-15'
  };

  const handleStartNewCV = () => {
    setStep('form');
    setCvData(null);
    setSelectedTemplate(null);
  };

  const handleFormSubmit = (data) => {
    setCvData(data);
    setStep('templates');
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep('preview');
  };

  const handleDownload = () => {
    alert('PDF generated successfully!');
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'dashboard' && (
          <DashboardHome user={user} onStartNewCV={handleStartNewCV} />
        )}
        
        {step === 'form' && (
          <CVForm 
            onSubmit={handleFormSubmit} 
            onBack={() => setStep('dashboard')} 
          />
        )}
        
        {step === 'templates' && (
          <TemplateSelection 
            onSelect={handleTemplateSelect} 
            onBack={() => setStep('form')} 
          />
        )}
        
        {step === 'preview' && (
          <PreviewSection 
            cvData={cvData} 
            template={selectedTemplate} 
            onBack={() => setStep('templates')}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

const DashboardHome = ({ user, onStartNewCV }) => {
  const stats = [
    { label: 'Total CVs Created', value: '0', change: '+0' },
    { label: 'Downloads', value: '0', change: '+0' },
    { label: 'Templates Used', value: '0', change: '+0' },
    { label: 'Account Age', value: '0 months', change: '' },
  ];

  const recentActivity = [
    { action: 'Created', title: 'my first CV', time: '2 hours ago' },
    { action: 'Downloaded', title: 'my second CV', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-400 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h2>
            <p className="text-indigo-100 max-w-xl">
              Create professional resumes that stand out. Choose from beautiful templates and showcase your skills effectively.
            </p>
          </div>
          <button
            onClick={onStartNewCV}
            className="flex items-center space-x-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            <FaPlus />
            <span>Create New CV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Your CV Statistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-indigo-100 text-indigo-800 p-3 rounded-full mt-1">
                    <FaFilePdf />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{activity.title}</p>
                    <p className="text-gray-600 text-sm">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Templates</h3>
          <p className="text-gray-600 mb-6">Browse our most popular CV templates</p>
          
          <div className="space-y-4">
            {[
              { name: 'Modern Professional', color: 'from-indigo-600 to-blue-500' },
              { name: 'Creative Designer', color: 'from-purple-600 to-indigo-500' },
              { name: 'Minimalist', color: 'from-gray-700 to-gray-500' },
            ].map((template, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer transition hover:shadow-md"
              >
                <div className={`h-32 bg-gradient-to-r ${template.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{template.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <button 
                    className="w-full py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg"
                    onClick={() => alert('Preview template')}
                  >
                    Preview Template
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200"
              onClick={() => alert('Browse all templates')}
            >
              View All Templates
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">CV Building Tips</h3>
            <p className="text-emerald-100 max-w-2xl">
              Use action verbs, quantify achievements, and tailor your CV for each application. 
              Our templates help you highlight your strengths effectively.
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center space-x-2 bg-white text-emerald-600 hover:bg-emerald-50 font-medium px-5 py-2.5 rounded-lg">
            <FaMagic />
            <span>Get Expert Advice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PreviewSection = ({ cvData, template, onBack, onDownload }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">CV Preview</h2>
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Templates
          </button>
          <button
            onClick={onDownload}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FaDownload className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600">Selected Template</h3>
            <p className="text-xl font-bold text-gray-800">{template?.name || 'No template selected'}</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Change Colors
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Edit Format
            </button>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[70vh]">
          <PreviewCV cvData={cvData} template={template} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;