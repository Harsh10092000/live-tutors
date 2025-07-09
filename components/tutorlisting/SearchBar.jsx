'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Automotive',
    'Beauty & Care',
    'Marketing',
    'Child Care',
    'House Cleaning'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      query: searchQuery,
      category: selectedCategory
    });
  };

  return (
    <div className="tu-searchbar-wrapper">
      <div className="tu-appendinput">
        <div className="tu-searcbar">
          <div className="tu-inputicon">
            <a href="javascript:void(0);">
              <i className="icon icon-search"></i>
            </a>
            <input 
              type="text" 
              className="form-control" 
              placeholder="What do you want to explore?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="tu-select">
            <i className="icon icon-layers"></i>
            <select 
              id="selectv8" 
              className="form-control"
              data-placeholderinput="Select list" 
              data-placeholder="Select category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <a 
            href="javascript:void(0);" 
            className="tu-primbtn-lg tu-primbtn-orange"
            onClick={handleSearch}
          >
            Search now
          </a>
        </div>
      </div>
      <div className="tu-listing-search">
        <figure>
          <img src="/images/listing/shape.png" alt="Start from here" />
        </figure>
        <span>Start from here</span>
      </div>
    </div>
  );
};

export default SearchBar; 