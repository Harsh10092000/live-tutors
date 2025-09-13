'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const ContactRequestModal = dynamic(() => import('../common/ContactRequestModal'), { ssr: false });

const RequestCard = ({ request }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const {
    id,
    user_id,
    subjects,
    location,
    phone,
    requirement_details,
    student_level,
    tutoring_type,
    time_preference_type,
    time_preference,
    gender_preference,
    budget,
    languages,
    status: requestStatus,
    attachment_urls,
    url,
    state,
    city
  } = request;

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
    
    // Handle multiple subjects
    const subjectList = subjects?.split(',').map(s => s.trim()).join(', ');
    
    return `${displayType} ${subjectList} teacher required in ${city || location}`;
  };

  // Get icon color based on tutoring type
  const getTutoringTypeColor = (type) => {
    if (!type) return '';
    if (type.includes('Online (using Zoom etc)')) return 'tu-orangeclr';
    if (type.includes('At my place (home/institute)')) return 'tu-greenclr';
    if (type.includes('Travel to tutor')) return 'tu-blueclr';
    return '';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'tu-orangeclr';
      case 'accepted':
        return 'tu-greenclr';
      case 'in-progress':
        return 'tu-blueclr';
      default:
        return '';
    }
  };

  // Check if this job was added by current user (force boolean to avoid rendering 0)
  const isAddedByMe = (session?.user?.id != null) && (user_id != null) && (String(session.user.id) === String(user_id));

  const handleLetsChat = (e) => {
    e.preventDefault();
    const query = searchParams?.toString();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : (query ? `${pathname}?${query}` : pathname);
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }
    // If authenticated, open contact modal
    setOpenModal(true)
  }

  return (
    <div className="tu-listinginfo">
      <span className="tu-cardtag"></span>
     
      <div className="tu-listinginfo_wrapper">
        <div className="tu-listinginfo_title">
          <div className="tu-listinginfo-img">
            {/* <figure>
              <Image 
                src="/images/default-request.png"
                alt={subjects}
                width={100}
                height={100}
                className="tu-tutor-img"
              />
            </figure> */}
            <div className="tu-listing-heading">
              <h5>
                <Link href={`/tutor-jobs/${url}`}>{formatTitle()}</Link>
                {requestStatus && (
                  <i 
                    className={`icon icon-check-circle ${getStatusColor(requestStatus)}`} 
                    data-tippy-trigger="mouseenter" 
                    data-tippy-html="#tu-status" 
                    data-tippy-interactive="true" 
                    data-tippy-placement="top"
                  ></i>
                )}
              </h5>
              <div className="tu-listing-location">
                {/* <span>
                  <i className="icon icon-phone"></i>
                  <em>{phone}</em>
                </span> */}
                <address>
                  <i className="icon icon-map-pin"></i> {city ? `${city}, ${state}` : location}
                </address>
              </div>
            </div>
          </div>
          <div className="tu-listinginfo_price">
            <span>Budget:</span>
            <h4>₹{budget}/hr</h4>
          </div>
        </div>
        <div className="tu-listinginfo_description">
          <p>{requirement_details}</p>
        </div>
        <div className="tu-listinginfo_service">
          <h6>Requirements</h6>
          <ul className="tu-service-list">
            <li>
              <span>
                <i className="icon icon-book-open tu-greenclr"></i>
                Level: {student_level}
              </span>
            </li>
           
            {gender_preference ?
            <li>
              <span>
                <i className="icon icon-user tu-orangeclr"></i>
                {gender_preference} Preferred
              </span>
            </li>
            :
            '' }

            {languages && (
              <li>
                <span>
                  <i className="icon icon-book tu-purpleclr"></i>
                  Languages: {languages}
                </span>
              </li>
            )}
            
            {formatTimePreference() && (
              <li>
                <span>
                  <i className="icon icon-clock tu-blueclr"></i>
                  Time: {formatTimePreference()}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="tu-listinginfo_btn">
        <div className="tu-iconheart">
          <i className={`icon icon-map-pin ${getTutoringTypeColor(tutoring_type)}`}></i>
          <span>{formatTutoringTypeDisplay(tutoring_type)}</span>
          {isAddedByMe && (
        <div className="tu-added-by-me-badge">
          <span style={{padding: '0 5px 2px'}}>|</span>
          <span>Added by me</span>
        </div>
      )}
        </div>
        <div className="tu-btnarea">
          {/* {attachment_urls && (
            <Link href={attachment_urls} className="tu-secbtn" target="_blank">View Attachment</Link>
          )} */}
          {!isAddedByMe && (
            <a href="#" onClick={handleLetsChat} className="tu-secbtn">Let's chat</a>
          )}
          <Link href={`/tutor-jobs/${url}`} className="tu-primbtn">View details</Link>
        </div>
        {/* {id} */}
        <ContactRequestModal 
          open={openModal} 
          onClose={() => setOpenModal(false)} 
          jobUrl={url}
          jobTitle={formatTitle()}
          jobId={id}
        />
      </div>
    </div>
  );
};

export default RequestCard; 