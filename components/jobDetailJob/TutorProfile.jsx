'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSplitTags } from '../common/hooks/useSplitTags.jsx';
import moment from 'moment';
import { useSession } from 'next-auth/react';
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
    
    const DateFormat = (date) => {
        return moment(date).format("DD MMM, YY");
    }      
     // Format tutoring type helper function
  const formatTutoringTypeDisplay = (type) => {
    if (!type) return '';
    // Split by either comma or pipe
    return type.split(/[,|]/)
      .map(t => {
        const trimmed = t.trim();
        if (trimmed === 'Online (using Zoom etc)') return 'Online';
        if (trimmed === 'At my place (home/institute)') return 'Home';
        if (trimmed === 'Travel to tutor') return 'Travel';
        return trimmed;
      })
      .join(' | ');
  };

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
    const displayType = formatTutoringTypeDisplay(tutoring_type);
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

    // const formatTutoringType = (type) => {
    //     switch(type) {
    //         case 'Travel to tutor':
    //             return `Student will Travel${travel_distance ? ` (Within ${travel_distance} km)` : ''}`;
           
    //         case 'Online (using Zoom etc)':
    //             return 'Online Teaching';
    //         case 'At my place (home/institute)':
    //             return 'At Tutor\'s Location';
       
    //         default:
    //             return type ? type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Not specified';
    //     }
    // };

    const formatTutoringType = (type) => {
        if (!type) return '';
        // Split by either comma or pipe
        return type.split(/[,|]/)
          .map(t => {
            const trimmed = t.trim();
            if (trimmed === 'Online (using Zoom etc)') return 'Online Teaching';
            if (trimmed === 'At my place (home/institute)') return 'Home';
            if (trimmed === 'Travel to tutor') return `Student will Travel${travel_distance ? ` (Within ${travel_distance} km)` : ''}`;
            return trimmed;
          })
          .join(' | ');
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
                                {DateFormat(created_at)}
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
                                {phone.slice(0, 3)}*******
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
                                <p>{formatTutoringType(tutoring_type)}</p>
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
                    <style jsx>{`
                    /* Added by me tag label */
.tu-added-by {
    display: inline-block;
    padding: 6px 12px;
    background: var(--bs-purple);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    border-radius: 4px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(106, 48, 125, 0.15);
    transition: all 0.3s ease;
}
.tu-added-by:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(106, 48, 125, 0.2);
}
                        .tu-product-title {
                            margin-bottom: 15px;
                        }
                        .tu-product-title h3 {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                            font-size: 24px;
                            font-weight: 600;
                            color: #1C1C1C;
                        }
                        .tu-product-title h3 i {
                            font-size: 20px;
                        }
                        .tu-greenclr {
                            color: #22c55e;
                        }
                        .tu-listinginfo_price {
                            display: flex;
                            align-items: baseline;
                            gap: 8px;
                            margin-bottom: 20px;
                            padding: 10px 0;
                        }
                        .tu-listinginfo_price span {
                            color: #64748b;
                            font-size: 15px;
                        }
                        .tu-listinginfo_price h4 {
                            margin: 0;
                            font-size: 22px;
                            color: #6A307D;
                            font-weight: 600;
                        }
                        .tu-tutorreview {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 20px;
                            padding: 15px 0;
                            margin: 0;
                            border-top: 1px solid #eee;
                            list-style: none;
                        }
                        .tu-tutorreview li span {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-size: 15px;
                            color: #1C1C1C;
                        }
                        .tu-tutorreview li i {
                            font-size: 18px;
                        }
                        .tu-yeallow {
                            color: #f59e0b;
                        }
                        .tu-colorgreen {
                            color: #22c55e;
                        }
                        .tu-tutorreview li i em {
                            font-style: normal;
                            margin-left: 4px;
                        }
                        .tu-tutorreview li span em {
                            color: #64748b;
                            font-style: normal;
                        }
                        .icon-map-pin {
                            color: #6A307D;
                        }
                        .tu-subjects-list {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px;
                            padding: 10px 0;
                        }
                        .tu-subject-tag {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 8px 16px;
                            background: #f7f7f7;
                            border-radius: 4px;
                            color: #1C1C1C;
                            font-size: 15px;
                            transition: all 0.3s ease;
                            border: 1.5px solid #eeeeee;
                            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
                        }
                        .tu-subject-tag:hover {
                            background: #f0f0f0;
                            transform: translateY(-1px);
                        }
                        .tu-subject-tag i {
                            color: #666;
                            font-size: 16px;
                        }
                        .tu-detail-sections {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                            padding: 20px 0;
                        }
                        .tu-detail-item {
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            padding: 15px;
                            background: #ffffff;
                            border-radius: 4px;
                            border: 1.5px solid #eeeeee;
                        }
                        .tu-detail-item.tu-combined-row {
                            display: flex;
                            flex-direction: row;
                            gap: 15px;
                            padding: 0;
                            background: transparent;
                            border: none;
                        }
                        .tu-detail-item.tu-combined-row > div {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            padding: 15px;
                            background: #ffffff;
                            border-radius: 4px;
                            border: 1.5px solid #eeeeee;
                        }
                        .tu-detail-item i {
                            font-size: 20px;
                            color: #6A307D;
                            padding: 10px;
                            background: #f7f7f7;
                            border-radius: 50%;
                            flex-shrink: 0;
                        }
                        .tu-detail-content {
                            flex: 1;
                        }
                        .tu-detail-content h6 {
                            margin: 0 0 5px 0;
                            font-size: 14px;
                            color: #666;
                            font-weight: 600;
                        }
                        .tu-detail-content p {
                            margin: 0;
                            font-size: 15px;
                            color: #1C1C1C;
                            line-height: 1.4;
                        }
                        .tu-detail-content p + p {
                            margin-top: 4px;
                        }
                        @media (max-width: 767px) {
                            .tu-detail-item.tu-combined-row {
                                flex-direction: column;
                            }
                            .tu-detail-item.tu-combined-row > div {
                                width: 100%;
                            }
                        }
                    `}</style>
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