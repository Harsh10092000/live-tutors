'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSplitTags } from '../common/hooks/useSplitTags.jsx';

import { useSession } from 'next-auth/react';
import { formatTutoringTypeDisplayTitle, formatTutoringType, formatDate, hiddenPhoneNumber } from '../common';
const TutorProfile = ({ jobdata }) => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const userID = session?.user?.id;
    const isAddedByMe = userID === jobdata.user_id;
    
    const {
        tutoring_type,
        subjects,
        city,
        location,
        time_preference_type,
        time_preference,
        state,
        phone,
        requirement_details,
        student_level,
        meeting_preferences,
        travel_distance,
        budget,
        gender_preference,
        languages,
        status: job_status,
        created_at,
        user_id,
        url,
        request_id
    } = jobdata;

    const subjectsList = useSplitTags(subjects);
    
   
     // Format tutoring type helper function
 

  // Format time preference
  const formatTimePreference = () => {
    if (!time_preference_type) return '';
    if (time_preference_type === 'fixed' && time_preference) {
      return `${time_preference} (Fixed)`;
    }
    return time_preference_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Format the title
  const formatTitle = () => {
    const displayType = formatTutoringTypeDisplayTitle(tutoring_type);
    const subjectList = subjects?.split(',').map(s => s.trim()).join(', ');
    return `${displayType} ${subjectList} teacher required in ${city || location}`;
  };

    const formatMeetingPreference = () => {
        if (!meeting_preferences) return '';
        // For fixed time, don't show any suffix
        if (meeting_preferences === 'fixed') {
            return 'fixed';
        }
        // Use shorter abbreviations for time periods
        switch(meeting_preferences) {
            case 'per_hour':
                return 'hr';
            case 'per_day':
                return 'day';
            case 'per_week':
                return 'wk';
            case 'per_month':
                return 'mo';
            default:
                return meeting_preferences.replace('_', ' ');
        }
    };



   

  return (
    <div className="tu-tutorprofilewrapp">
        <span className="tu-cardtag"></span>
        <div className="tu-profileview">
            
            <div className="tu-protutorinfo">
                <div className="tu-protutordetail">
                    <div className="tu-productorder-content">
                       
                        <div className="tu-product-title">
                        {isAddedByMe && <span className="tu-added-by">Added by me</span>}
                            <h3>{formatTitle()} 
                              
                            </h3>
                        </div>
                        <div className="tu-listinginfo_price">
                            {/* <span>Starting from:</span> */}
                            <h4>₹{budget}/{formatMeetingPreference()}</h4>
                        </div>
                    </div>
                    <ul className="tu-tutorreview">
                    <li>
                            <span>
                                <i className="fa fa-calendar tu-greenclr"></i>
                                {formatDate(created_at)}
                            </span>
                        </li>
                        <li>
                            <span>
                                <i className="icon icon-map-pin"></i>
                                <span>{city ? `${city}, ${state}` : location}</span>
                            </span>
                        </li>
                        <li>
                            <span>
                                <i className="fa fa-phone tu-yeallow"></i>
                                {hiddenPhoneNumber(phone)}
                            </span>
                        </li>
                       
                       
                    </ul>
                    <div className="tu-subjects-list">
                        {subjectsList.map((subject, index) => (
                            <span key={index} className="tu-subject-tag">
                                <i className="icon icon-book-open"></i>
                                {subject}
                            </span>
                        ))}
                    </div>
                    <div className="tu-detail-sections">
                        <div className="tu-detail-item">
                            <i className="icon icon-map-pin"></i>
                            <div className="tu-detail-content">
                                <h6>Mode of Teaching</h6>
                                <p>{formatTutoringType(tutoring_type, travel_distance)}</p>
                            </div>
                        </div>
                        <div className="tu-detail-item tu-combined-row">
                            <div>
                                <i className="icon icon-users"></i>
                                <div className="tu-detail-content">
                                    <h6>Student Level</h6>
                                    <p>{student_level || 'Any Level'}</p>
                                </div>
                            </div>
                            <div>
                                <i className="icon icon-user"></i>
                                <div className="tu-detail-content">
                                    <h6>Gender Preference</h6>
                                    <p>{gender_preference || 'Any Gender'}</p>
                                </div>
                            </div>
                            <div>
                                <i className="icon icon-globe"></i>
                                <div className="tu-detail-content">
                                    <h6>Can communicate in</h6>
                                    <p>{languages || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
        {!isAddedByMe && (
        <div className="tu-actionbts">
            <div className="tu-userurl">
                {/* <i className="icon icon-globe"></i> */}
                {/* <Link href="#">www.tutorlinkhere.com/tutor/uk/armando/295548 <i className="icon icon-copy"></i></Link> */}
            </div>
            <ul className="tu-profilelinksbtn">
                {/* <li>
                    <Link href="#" className="tu-linkheart"><i className="icon icon-heart"></i><span>Save</span></Link>
                </li> */}
                <li><Link href="/login" className="tu-secbtn">Let&apos;s talk now</Link></li>
                <li>
                    <Link href="/tutor-detail" className="tu-primbtn">Book a tution</Link>
                </li>
            </ul>
        </div>
        )}   
        
    </div>
  );
};

export default TutorProfile; 