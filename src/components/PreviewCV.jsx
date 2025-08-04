import React from 'react';

const PreviewCV = ({ cvData, template }) => {
  if (!cvData) {
    return (
      <div className="text-center py-12 text-gray-500">
        <h3 className="text-xl font-medium mb-2">No data to display</h3>
        <p>Please complete the CV information first</p>
      </div>
    );
  }

  return (
    <div className="preview-container font-sans">
      <div className="max-w-4xl mx-auto p-6">
        <header className={`bg-gradient-to-r ${
          template?.color || 'from-indigo-600 to-blue-500'
        } text-white p-6 rounded-t-xl`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{cvData.personal.fullName || 'Full Name'}</h1>
              <p className="text-xl text-gray-200 mt-1">
                {cvData.personal.jobTitle || 'Job Title'}
              </p>
            </div>
            <div className="text-right">
              {cvData.personal.email && (
                <div className="mb-1">
                  <span>{cvData.personal.email}</span>
                </div>
              )}
              {cvData.personal.phone && (
                <div className="mb-1">
                  <span>{cvData.personal.phone}</span>
                </div>
              )}
              {cvData.personal.address && (
                <div className="mb-1">
                  <span>{cvData.personal.address}</span>
                </div>
              )}
              {cvData.personal.website && (
                <div>
                  <span>{cvData.personal.website}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="bg-white p-6 rounded-b-xl">
          {cvData.personal.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Professional Summary</h2>
              <p className="text-gray-700">{cvData.personal.summary}</p>
            </section>
          )}

          {cvData.experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Work Experience</h2>
              {cvData.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{exp.position || 'Position'}</h3>
                    <p className="text-gray-600">
                      {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                    </p>
                  </div>
                  <p className="text-indigo-700">{exp.company || 'Company'}</p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {cvData.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Education</h2>
              {cvData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{edu.degree || 'Degree'}</h3>
                    <p className="text-gray-600">
                      {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                    </p>
                  </div>
                  <p className="text-indigo-700">{edu.institution || 'Institution'}</p>
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {cvData.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {cvData.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.languages.map((language, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCV;