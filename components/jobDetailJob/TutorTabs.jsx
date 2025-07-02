'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSplitTags } from '../common/hooks/useSplitTags.jsx';

const TutorTabs = ({ jobdata }) => {

    const {
        requirement_details,
        attachment_urls,
    } = jobdata;

    const attachmentUrls = useSplitTags(attachment_urls);
   
  return (
    <div className="tu-detailstabs">
        <ul className="nav nav-tabs tu-nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                    <i className="icon icon-briefcase"></i>
                    <span>Job Details</span>
                </button>
            </li>
            {/* <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    <i className="icon icon-message-circle"></i>
                    <span>Reviews</span>
                </button>
            </li> */}
        </ul>
        <div className="tab-content tu-tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="tu-tabswrapper">
                    <div className="tu-tabstitle">
                        <h4>Description</h4>
                    </div>
                    <div className="tu-description">
                        {requirement_details ? (
                            <p>{requirement_details}</p>
                        ) : (
                            <p className="tu-no-attachments">
                                <i className="icon icon-align-justify"></i>
                                No description available
                            </p>
                        )}
                    </div>
                 
                   
                </div>
                <div className="tu-tabswrapper">
                    <div className="tu-tabstitle">
                        <h4>Attachments</h4>
                    </div>
                    {attachment_urls && attachment_urls.length > 0 ? (
                        <div className="tu-description">
                            <div className="tu-attachments-list">
                                {attachmentUrls.map((url, index) => (
                                    <div className="tu-attachment-item" key={index}>
                                        <i className="icon icon-file-text"></i>
                                        <a 
                                            href={`http://localhost:8010/tutor_documents/${url}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="tu-attachment-link"
                                        >
                                            {url.split('/').pop()}
                                            <i className="icon icon-external-link"></i>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="tu-description">
                            <p className="tu-no-attachments">
                                <i className="icon icon-file-minus"></i>
                                No attachments available
                            </p>
                        </div>
                    )}
                </div>
                <style jsx>{`
                    .tu-attachments-list {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        padding: 10px 0;
                    }
                    .tu-attachment-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 15px;
                        background: #f7f7f7;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                    }
                    .tu-attachment-item:hover {
                        background: #f0f0f0;
                    }
                    .tu-attachment-item i {
                        color: #666;
                        font-size: 20px;
                    }
                    .tu-attachment-link {
                        color: #1DA1F2;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 15px;
                        word-break: break-all;
                    }
                    .tu-attachment-link:hover {
                        text-decoration: underline;
                    }
                    .tu-attachment-link i {
                        font-size: 16px;
                    }
                    .tu-no-attachments {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: #666;
                        font-style: italic;
                    }
                    .tu-no-attachments i {
                        font-size: 18px;
                    }
                `}</style>
             
            </div>
          
        </div>
    </div>
  );
};

export default TutorTabs; 