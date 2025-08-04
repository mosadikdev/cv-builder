import React, { useState } from 'react';
import { FaPlus, FaTrash, FaArrowRight } from 'react-icons/fa';

const CVForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      website: ''
    },
    experiences: [{
      id: Date.now(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    education: [{
      id: Date.now(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [],
    languages: []
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value
      }
    }));
  };
  
  const handleExperienceChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [name]: value } : exp
      )
    }));
  };
  
  const handleEducationChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [name]: value } : edu
      )
    }));
  };
  
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };
  
  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };
  
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };
  
  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };
  
  const handleSkillAdd = () => {
    if (newSkill.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  
  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };
  
  const handleLanguageAdd = () => {
    if (newLanguage.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };
  
  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">CV Information</h2>
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
        >
          Back to Dashboard
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.personal.fullName}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.personal.jobTitle}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.personal.email}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.personal.phone}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.personal.address}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.personal.website}
                onChange={handlePersonalChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                name="summary"
                value={formData.personal.summary}
                onChange={handlePersonalChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Write a brief summary of your background and achievements..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Work Experience</h3>
            <button
              type="button"
              onClick={addExperience}
              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
            >
              <FaPlus />
              <span>Add Experience</span>
            </button>
          </div>
          
          {formData.experiences.map((exp, index) => (
            <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Experience #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(exp.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(exp.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Month/Year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(exp.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Month/Year or Present"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description & Responsibilities</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, e)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your responsibilities and achievements in this role..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
            >
              <FaPlus />
              <span>Add Education</span>
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Education #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(edu.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(edu.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Month/Year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(edu.id, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Month/Year"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="description"
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, e)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Major, GPA, achievements..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Languages</h3>
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a new language"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleLanguageAdd}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.languages.map((language, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                <span>{language}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="ml-2 text-green-600 hover:text-green-900"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            <span>Next: Choose Template</span>
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CVForm;