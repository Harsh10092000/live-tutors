'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ filters, onFilterChange }) => {
  // const educationLevels = [
  //   'Primary (1-5)',
  //   'Middle School (6-8)',
  //   'High School (9-10)',
  //   'Higher Secondary (11-12)',
  //   'College',
  //   'Professional'
  // ];

  const educationLevels = [
    { value: "Primary", label: "Primary (1-5)"},
    { value: "Middle School", label: "Middle School (6-8)"},
    { value: "High School", label: "High School (9-10)"},
    { value: "Higher Secondary", label: "Higher Secondary (11-12)"},
    { value: "College", label: "College"},
    { value: "Professional", label: "Professional"}
  ];

  const tutoringTypes = [
    { value: "Online (using Zoom etc)", label: "Online (using Zoom etc)" },
    { value: "At my place (home/institute)", label: "At Home/Institute" },
    { value: "Travel to student", label: "Travel to Student" }
  ];

  const languages = [
    "Hindi" , "English" , "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", 
    "Malayalam", "Odia", "Punjabi", "Assamese", "Maithili", "Sanskrit"
  ];

//   const timePreferences = [
//     { value: "fixed", label: "Fixed Time", subOptions: ["Morning", "Afternoon", "Evening", "Night"] },
//     { value: "per_hour", label: "Per Hour" },
//     { value: "per_day", label: "Per Day" },
//     { value: "per_week", label: "Per Week" },
//     { value: "per_month", label: "Per Month" }
//   ];

  // Handle multiple selection for tutoring types
  const handleTutoringTypeChange = (value) => {
    const currentTypes = filters.tutoring_preferences ? filters.tutoring_preferences.split(',') : [];
    let newTypes;
    
    if (currentTypes.includes(value)) {
      newTypes = currentTypes.filter(type => type !== value);
    } else {
      newTypes = [...currentTypes, value];
    }
    
    onFilterChange('tutoring_preferences', newTypes.join(','));
  };

  // Handle multiple selection for languages
  const handleLanguageChange = (value) => {
    const currentLanguages = filters.language_preferences ? filters.language_preferences.split(',') : [];
    let newLanguages;
    
    if (currentLanguages.includes(value)) {
      newLanguages = currentLanguages.filter(lang => lang !== value);
    } else {
      newLanguages = [...currentLanguages, value];
    }
    
    onFilterChange('language_preferences', newLanguages.join(','));
  };

  return (
    <aside className="tu-asidewrapper">
      <a href="javascript:void(0)" className="tu-dbmenu">
        <FontAwesomeIcon icon={faChevronLeft} />
      </a>
      <div className="tu-aside-menu">
        {/* Education Level Filter */}
        {/* <div className="tu-aside-holder">
          <div className="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side2">
            <h5>Education level</h5>
          </div>
          <div id="side2" className="collapse show">
            <div className="tu-aside-content">
              <div className="tu-filterselect">
                <div className="tu-select">
                  <select 
                    className="form-control"
                    value={filters.student_level}
                    onChange={(e) => onFilterChange('student_level', e.target.value)}
                  >
                    <option value="">Select education level</option>
                    {educationLevels.map((level, index) => (
                      <option key={index} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Tutoring Type Filter */}
        <div className="tu-aside-holder">
          <div className="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#side1">
            <h5>Tutoring Type</h5>
          </div>
          <div id="side1" className="collapse show">
            <div className="tu-aside-content">
              <div className="tu-filterselect">
                <ul className="tu-categoriesfilter">
                  {tutoringTypes.map((type, index) => (
                    <li key={index}>
                      <div className="tu-check">
                        <input
                          type="checkbox"
                          id={`type_${index}`}
                          checked={filters.tutoring_preferences?.split(',').some(t => t === type.value)}
                          onChange={() => handleTutoringTypeChange(type.value)}
                        />
                        <label htmlFor={`type_${index}`}>{type.label}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Time Preference Filter */}
        {/* <div className="tu-aside-holder">
          <div className="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#timePreference">
            <h5>Time Preference</h5>
          </div>
          <div id="timePreference" className="collapse show">
            <div className="tu-aside-content">
              <div className="tu-filterselect">
                 <div className="tu-select">
                  <select
                    className="form-control"
                    value={filters.time_preference_type}
                    onChange={(e) => onFilterChange('time_preference_type', e.target.value)}
                  >
                    <option value="">Select Time Preference</option>
                    {timePreferences.map((pref) => (
                      <option key={pref.value} value={pref.value}>
                        {pref.label}
                      </option>
                    ))}
                  </select>
                </div> 
                 {filters.time_preference_type === 'fixed' && (
                  <div className="tu-select mt-3">
                    <select
                      className="form-control"
                      value={filters.time_preference}
                      onChange={(e) => onFilterChange('time_preference', e.target.value)}
                    >
                      <option value="">Select Time</option>
                      {timePreferences.find(p => p.value === 'fixed')?.subOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                )} 
              </div>
            </div>
          </div>
        </div> */}

        {/* language_preferences Filter */}
        <div className="tu-aside-holder">
          <div className="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#languages">
            <h5>Languages</h5>
          </div>
          <div id="languages" className="collapse show">
            <div className="tu-aside-content">
              <div className="tu-filterselect">
                <ul className="tu-categoriesfilter">
                  {languages.map((lang, index) => (
                    <li key={index}>
                      <div className="tu-check">
                        <input
                          type="checkbox"
                          id={`lang_${index}`}
                          checked={filters.language_preferences?.split(',').some(l => l === lang)}
                          onChange={() => handleLanguageChange(lang)}
                        />
                        <label htmlFor={`lang_${index}`}>{lang}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Gender Preference Filter */}
        <div className="tu-aside-holder">
          <div className="tu-asidetitle" data-bs-toggle="collapse" data-bs-target="#gender">
            <h5>Gender Preference</h5>
          </div>
          <div id="gender" className="collapse show">
            <div className="tu-aside-content">
              <div className="tu-filterselect">
                <ul className="tu-categoriesfilter">
                  <li>
                    <div className="tu-check">
                      <input
                        type="radio"
                        id="gender_any"
                        name="gender"
                        checked={!filters.gender}
                        onChange={() => onFilterChange('gender', '')}
                      />
                      <label htmlFor="gender_any">No Preference</label>
                    </div>
                  </li>
                  <li>
                    <div className="tu-check">
                      <input
                        type="radio"
                        id="gender_male"
                        name="gender"
                        checked={filters.gender === 'Male'}
                        onChange={() => onFilterChange('gender', 'Male')}
                      />
                      <label htmlFor="gender_male">Male only</label>
                    </div>
                  </li>
                  <li>
                    <div className="tu-check">
                      <input
                        type="radio"
                        id="gender_female"
                        name="gender"
                        checked={filters.gender === 'Female'}
                        onChange={() => onFilterChange('gender', 'Female')}
                      />
                      <label htmlFor="gender_female">Female only</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Filters; 



