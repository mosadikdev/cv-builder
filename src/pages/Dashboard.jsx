import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaPlus, FaDownload, FaMagic, FaSave, FaCheck, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import CVForm from '../components/CVForm';
import TemplateSelection from '../components/TemplateSelection';
import PreviewCV from '../components/PreviewCV';

const Dashboard = () => {
  const [step, setStep] = useState('dashboard'); 
  const [cvData, setCvData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cvList, setCvList] = useState([]);
  const [editingCV, setEditingCV] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'mohamed',
    email: 'mohamed@example.com',
    joined: '2023-01-15'
  };

  // Load CVs from localStorage on initial render
  useEffect(() => {
    const savedCVs = JSON.parse(localStorage.getItem('cvs')) || [];
    setCvList(savedCVs);
  }, []);

  const handleStartNewCV = () => {
    setStep('form');
    setCvData(null);
    setSelectedTemplate(null);
    setEditingCV(null);
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

  const handlePreviewCV = (cv) => {
    setCvData(cv.data);
    setSelectedTemplate(cv.templateData);
    setStep('preview');
  };

  const handleEditCV = (cv) => {
    setEditingCV(cv.id);
    setCvData(cv.data);
    setSelectedTemplate(cv.templateData);
    setStep('form');
  };

  const handleDeleteCV = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this CV?');
    if (confirmDelete) {
      const updatedList = cvList.filter(cv => cv.id !== id);
      setCvList(updatedList);
      localStorage.setItem('cvs', JSON.stringify(updatedList));
    }
  };

  const handleSaveCV = (cvData, template) => {
    const cvs = JSON.parse(localStorage.getItem('cvs')) || [];
    
    if (editingCV) {
      // Update existing CV
      const updatedList = cvList.map(cv => {
        if (cv.id === editingCV) {
          return {
            ...cv,
            title: cvData.personal.jobTitle || 'Untitled CV',
            data: cvData,
            templateData: template,
            updatedAt: new Date().toISOString()
          };
        }
        return cv;
      });
      
      localStorage.setItem('cvs', JSON.stringify(updatedList));
      setCvList(updatedList);
    } else {
      // Create new CV
      const newCV = {
        id: Date.now(),
        title: cvData.personal.jobTitle || 'Untitled CV',
        template: template?.name || 'No template',
        createdAt: new Date().toISOString(),
        data: cvData,
        templateData: template
      };
      
      const updatedList = [...cvs, newCV];
      localStorage.setItem('cvs', JSON.stringify(updatedList));
      setCvList(updatedList);
    }
    
    setEditingCV(null);
    setStep('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'dashboard' && (
          <DashboardHome 
            user={user} 
            onStartNewCV={handleStartNewCV} 
            cvList={cvList}
            onPreviewCV={handlePreviewCV}
            onEditCV={handleEditCV}
            onDeleteCV={handleDeleteCV}
          />
        )}
        
        {step === 'form' && (
          <CVForm 
            initialData={editingCV ? cvData : null}
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
            onSave={() => handleSaveCV(cvData, selectedTemplate)}
          />
        )}
      </div>
    </div>
  );
};

const DashboardHome = ({ user, onStartNewCV, cvList, onPreviewCV, onEditCV, onDeleteCV }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
  }, []);

  const stats = [
    { 
      label: 'Total CVs Created', 
      value: cvList.length
    },
    { 
      label: 'Downloads', 
      value: cvList.filter(cv => cv.downloaded).length
    },
    { 
      label: 'Templates Used', 
      value: [...new Set(cvList.map(cv => cv.template))].length
    },
    { 
      label: 'Account Age', 
      value: user.joined 
        ? `${Math.floor((new Date() - new Date(user.joined)) / (1000 * 60 * 60 * 24 * 30))} months` 
        : 'N/A'
    },
  ];

  const recentActivity = cvList
    .slice(-3)
    .reverse()
    .map(cv => ({
      id: cv.id,
      action: 'Created',
      title: cv.title,
      time: formatTimeAgo(cv.createdAt)
    }));

    function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  }


  const popularTemplates = Array.from(
    cvList.reduce((acc, cv) => {
      if (cv.template) {
        acc.set(cv.template, (acc.get(cv.template) || 0) + 1);
      }
      return acc;
    }, new Map())
  )
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([name]) => ({
    name,
    color: getTemplateColor(name)
  }));


  function getTemplateColor(name) {
    const colors = {
      'Modern Professional': 'from-indigo-600 to-blue-500',
      'Creative Designer': 'from-purple-600 to-indigo-500',
      'Minimalist': 'from-gray-700 to-gray-500',
      'Corporate Executive': 'from-teal-600 to-cyan-500',
      'Tech Specialist': 'from-blue-700 to-indigo-600',
      'Academic': 'from-green-600 to-emerald-500',
    };
    return colors[name] || 'from-indigo-600 to-blue-500';
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              {cvList.length > 0 && (
                <button 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => document.getElementById('saved-cvs').scrollIntoView()}
                >
                  View All CVs
                </button>
              )}
            </div>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-indigo-100 text-indigo-800 p-3 rounded-full mt-1">
                      <FaFilePdf />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{activity.title}</p>
                      <p className="text-gray-600 text-sm">
                        {activity.action} • {activity.time}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onPreviewCV(cvList.find(cv => cv.id === activity.id))}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                        title="Preview"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => onEditCV(cvList.find(cv => cv.id === activity.id))}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity yet</p>
                <p className="mt-2">Create your first CV to get started</p>
              </div>
            )}
          </div>

          {/* Saved CVs Section */}
          <div id="saved-cvs" className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Saved CVs</h3>
            
            {cvList.length > 0 ? (
              <div className="space-y-4">
                {cvList.map(cv => (
                  <div key={cv.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{cv.title}</h4>
                        <p className="text-gray-600 text-sm">Template: {cv.template}</p>
                        <p className="text-gray-500 text-xs">
                          Created: {new Date(cv.createdAt).toLocaleDateString()}
                          {cv.updatedAt && ` • Updated: ${new Date(cv.updatedAt).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => onPreviewCV(cv)}
                          className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
                          title="Preview"
                        >
                          <FaEye className="mr-1" />
                          <span>Preview</span>
                        </button>
                        <button 
                          onClick={() => onEditCV(cv)}
                          className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                          title="Edit"
                        >
                          <FaEdit className="mr-1" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => onDeleteCV(cv.id)}
                          className="flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                          title="Delete"
                        >
                          <FaTrash className="mr-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No saved CVs yet</p>
                <p className="mt-2">Create your first CV to get started</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Templates</h3>
            <p className="text-gray-600 mb-6">Your most used CV templates</p>
            
            {popularTemplates.length > 0 ? (
              <div className="space-y-4">
                {popularTemplates.map((template, index) => (
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
                        onClick={() => alert(`Previewing ${template.name} template`)}
                      >
                        Preview Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No templates used yet</p>
              </div>
            )}
            
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

const PreviewSection = ({ cvData, template, onBack, onDownload, onSave }) => {
  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    onSave();
    setSaved(true);
    
    setTimeout(() => setSaved(false), 3000);
  };

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
            onClick={handleSaveClick}
            className={`flex items-center px-4 py-2 rounded-lg ${
              saved 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={saved}
          >
            {saved ? (
              <>
                <FaCheck className="mr-2" />
                Saved!
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save CV
              </>
            )}
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