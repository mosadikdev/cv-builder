import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const defaultCVData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    summary: ''
  },
  experience: [{
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  education: [{
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  skills: ['']
};

const CVForm = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({ ...defaultCVData });

useEffect(() => {
    if (initialData) {
      const actualData = initialData.data || initialData;
      
      const mergedData = {
        personal: { ...defaultCVData.personal, ...actualData.personal },
        experience: actualData.experience?.length ? [...actualData.experience] : [...defaultCVData.experience],
        education: actualData.education?.length ? [...actualData.education] : [...defaultCVData.education],
        skills: actualData.skills?.length ? [...actualData.skills] : [...defaultCVData.skills]
      };
      setFormData(mergedData);
    } else {
      setFormData({ ...defaultCVData });
    }
  }, [initialData]);

  const handleInputChange = (section, field, value, index = null) => {
    if (index === null) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => {
        const newArray = [...(prev[section] || [])];
        
        if (section === 'skills') {
          newArray[index] = value;
        } else {
          newArray[index] = {
            ...(newArray[index] || {}),
            [field]: value
          };
        }
        
        return {
          ...prev,
          [section]: newArray
        };
      });
    }
  };

  const addItem = (section) => {
    setFormData(prev => {
      let newItem;
      if (section === 'experience') {
        newItem = { position: '', company: '', startDate: '', endDate: '', description: '' };
      } else if (section === 'education') {
        newItem = { degree: '', institution: '', startDate: '', endDate: '', description: '' };
      } else { // skills
        newItem = '';
      }
      
      return {
        ...prev,
        [section]: [...(prev[section] || []), newItem]
      };
    });
  };

  const removeItem = (section, index) => {
    const currentItems = formData[section] || [];
    if (currentItems.length <= 1) return;
    
    setFormData(prev => {
      const newArray = [...(prev[section] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: newArray
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? 'Edit CV' : 'Create New CV'}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.personal.firstName || ''}
                onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.personal.lastName || ''}
                onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.personal.email || ''}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.personal.phone || ''}
                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+1234567890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.personal.address || ''}
                onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={formData.personal.jobTitle || ''}
                onChange={(e) => handleInputChange('personal', 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                value={formData.personal.summary || ''}
                onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Experienced professional with..."
              />
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <button
              type="button"
              onClick={() => addItem('experience')}
              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FaPlus className="mr-1" />
              Add Experience
            </button>
          </div>
          
          {(formData.experience || []).map((exp, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Experience #{index + 1}</h4>
                {(formData.experience || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Jan 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Dec 2023"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="2"
                    placeholder="Responsibilities and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Education Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <button
              type="button"
              onClick={() => addItem('education')}
              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FaPlus className="mr-1" />
              Add Education
            </button>
          </div>
          
          {(formData.education || []).map((edu, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Education #{index + 1}</h4>
                {(formData.education || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate || ''}
                    onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Sep 2015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={edu.endDate || ''}
                    onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="May 2019"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={edu.description || ''}
                    onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="2"
                    placeholder="Relevant coursework, achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Skills Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <button
              type="button"
              onClick={() => addItem('skills')}
              className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FaPlus className="mr-1" />
              Add Skill
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.skills || []).map((skill, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={skill || ''}
                  onChange={(e) => handleInputChange('skills', '', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="JavaScript, Project Management..."
                />
                {(formData.skills || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="ml-2 text-red-600 hover:text-red-800 p-2"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Continue to Templates
          </button>
        </div>
      </form>
    </div>
  );
};

export default CVForm;