import React from 'react';
import { FaArrowLeft, FaCheck, FaEye } from 'react-icons/fa';

const TemplateSelection = ({ onSelect, onBack }) => {
  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      description: 'Clean, contemporary design suitable for all industries',
      color: 'from-indigo-600 to-blue-500',
      recommended: true
    },
    {
      id: 2,
      name: 'Creative Designer',
      description: 'For designers, artists, and creative professionals',
      color: 'from-purple-600 to-indigo-500',
      recommended: false
    },
    {
      id: 3,
      name: 'Minimalist',
      description: 'Simple and clean design that focuses on content',
      color: 'from-gray-700 to-gray-500',
      recommended: true
    },
    {
      id: 4,
      name: 'Corporate Executive',
      description: 'Professional design for managers and executives',
      color: 'from-teal-600 to-cyan-500',
      recommended: false
    },
    {
      id: 5,
      name: 'Tech Specialist',
      description: 'Designed for software developers and engineers',
      color: 'from-blue-700 to-indigo-600',
      recommended: true
    },
    {
      id: 6,
      name: 'Academic',
      description: 'For researchers, professors, and academic professionals',
      color: 'from-green-600 to-emerald-500',
      recommended: false
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-1" />
          Back to Information
        </button>
      </div>
      
      <p className="text-gray-600 mb-8">Select the template that best reflects your professional identity. You can preview each template before making your choice.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-[1.02] ${
              template.recommended 
                ? 'border-indigo-500 ring-2 ring-indigo-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(template)}
          >
            <div className={`h-48 bg-gradient-to-r ${template.color} relative`}>
              {template.recommended && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                  Recommended
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">{template.name}</h3>
                <p className="text-sm opacity-90">{template.description}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <div className="flex justify-between items-center">
                <button className="text-indigo-600 font-medium flex items-center">
                  <FaEye className="mr-2" />
                  Preview
                </button>
                <div className="flex items-center space-x-1 text-gray-500">
                  <FaCheck />
                  <span>Select</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;