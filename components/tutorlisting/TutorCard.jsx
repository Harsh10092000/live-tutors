import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatTutoringPreferencesArray, formatDate } from '../common';
import { img_url } from '@/app/utils';
const TutorCard = ({ request }) => {
    const {
        profile_desc,
        name,
        profile_tag_line,
        profile_pic_url,
        city,
        state,
        gender,
        tutoring_preferences,
        travel_distance,
        fee_min,
        fee_charged_for,
        created_at,
        intro_video_url,
        tutor_id,
        language_preferences,
        skill_names
    } = request;

    const [showTooltip, setShowTooltip] = useState(false);

    const getTutoringTypeColor = (type) => {
        if (!type) return '';
        if (type.includes('Online (using Zoom etc)')) return 'tu-orangeclr';
        if (type.includes('At my place (home/institute)')) return 'tu-greenclr';
        if (type.includes('Travel to student')) return 'tu-blueclr';
        return '';
    };

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 4px 24px rgba(106,48,125,0.08)",
                border: "1.5px solid #f1e9f7",
                padding: "24px",
                margin: "18px 0",
                transition: "box-shadow 0.2s",
                position: "relative",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}
        >
            {/* Header: Image, Info, Price */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                <div style={{ position: "relative" }}>
                    {/* <Image
                        src={img_url + profile_pic_url || "/images/tutordetail/img-01.jpg"}
                        alt={name}
                        width={80}
                        height={80}
                        style={{
                            borderRadius: "12px",
                            objectFit: "cover",
                            border: "2px solid #f1e9f7"
                        }}
                    /> */}
                        <figure>
                        <img className='tutor-profile-image' src={img_url + profile_pic_url} alt={name} width={110} height={102} />
                        </figure>
                    {/* Video Button */}
                    {intro_video_url && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "6px",
                                left: "6px",
                                width: "32px",
                                height: "32px",
                                cursor: "pointer",
                                zIndex: 10,
                            }}
                        >
                            <a
                                href={intro_video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: "relative",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                {showTooltip && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            bottom: "110%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "#222",
                                            color: "#fff",
                                            padding: "4px 10px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            whiteSpace: "nowrap",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                            zIndex: 20,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        Watch Intro Video
                                    </span>
                                )}
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "22px",
                                        height: "22px",
                                        backgroundColor: showTooltip ? "#ffe5e5" : "#fff",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: showTooltip
                                            ? "0 4px 16px rgba(255,0,0,0.15)"
                                            : "0 2px 8px rgba(0,0,0,0.10)",
                                        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                                        transform: showTooltip
                                            ? "translate(-50%, -50%) scale(1.12)"
                                            : "translate(-50%, -50%) scale(1)",
                                    }}
                                >
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <polygon points="5,3 15,9 5,15" fill="#ff0000" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: "16px", color: "#484848" }}>{name}</div>
                    <h5 >
                        <Link href={`/tutors/${tutor_id}`}>{profile_tag_line}</Link>
                    </h5>
                    {/* <div style={{ fontSize: "13px", color: "#888" }}>
                        <i className="icon icon-map-pin"></i> {city}, {state}
                    </div> */}

                    <div style={{ margin: "10px 0 0 0" }}>
                        {/* <div style={{ fontWeight: 600, fontSize: "14px", color: "#444" }}>Requirements</div> */}
                        <div style={{
                            fontSize: "13px",
                            color: "#555",
                            display: "flex",
                            alignItems: "center",
                            gap: "18px",
                            margin: "10px 0 0 0",
                            minHeight: "22px"
                        }}>

                            <span>
                                <i className="icon icon-map-pin tu-purpleclr"></i>
                                {city}, {state}
                            </span>

                            {/* Languages with ellipsis and tooltip */}
                            {language_preferences && (
                                <span
                                    style={{
                                        display: "inline-block",
                                        maxWidth: "180px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        verticalAlign: "middle"
                                    }}
                                    title={language_preferences}
                                >
                                    <i className="icon icon-book tu-purpleclr"></i>
                                    {" Languages: "}
                                    {language_preferences}
                                </span>
                        )}
                            {/* Member Since */}
                                <span>
                                <i className="icon icon-book tu-purpleclr"></i>
                                {" Member Since: "}
                                {formatDate(created_at)}
                                </span>
                        </div>
                    </div>

                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: "#888" }}>Starting From</div>
                    <div style={{ fontWeight: 700, fontSize: "18px", color: "#ff5e14" }}>
                        ₹{fee_min}/{fee_charged_for}
                    </div>
                </div>
            </div>

            {profile_desc && (
                <div style={{ margin: "8px 0" }}>
                    <div
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "40px",
                            fontSize: "15px",
                            color: "#444",
                            marginBottom: "2px"
                        }}
                    >
                        {profile_desc}
                    </div>
                    {profile_desc.length > 80 && (
                        <Link
                            href={`/tutors/${tutor_id}`}
                            style={{
                                color: "#6A307D",
                                fontWeight: 500,
                                fontSize: "13px",
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                        >
                            Show more
                        </Link>
                    )}
                </div>
            )}

            {/* Skills as Badges */}
            {skill_names && (
                <div style={{ margin: "8px 0 0 0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {skill_names.split(",").map((skill, idx) => (
                        <span
                            key={idx}
                            style={{
                                background: "#f7f2fa",
                                color: "#6A307D",
                                borderRadius: "10px",
                                padding: "3px 12px",
                                fontSize: "13px",
                                fontWeight: 500,
                                border: "1px solid #e0d7f3",
                            }}
                        >
                            {skill.trim()}
                        </span>
                    ))}
                </div>
            )}

            {/* Requirements Section */}


            {/* Footer Buttons */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className={`icon icon-map-pin ${getTutoringTypeColor(tutoring_preferences)}`}></i>
                    <span style={{ fontSize: "13px", color: "#6A307D" }}>{formatTutoringPreferencesArray(tutoring_preferences)}</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link href="/login" className="tu-secbtn">Let's chat</Link>
                    <Link href={`/tutors/${tutor_id}`} className="tu-primbtn">View details</Link>
                </div>
            </div>
        </div>
    );
};

export default TutorCard; 