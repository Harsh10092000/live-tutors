'use client';
import React from 'react';
import Link from 'next/link';
import {adminPhoneNumberUrl, adminWhatsappNumberURL } from '@/app/utils';
import { hiddenPhoneNumber, hiddenEmail } from '../common';

const TutorSidebar = ({ tutoring_type, name, email, phone }) => {
    const tutoring_type_text = tutoring_type.split(",");

    return (
        <aside className="tu-asidedetail">
            <div className="tu-asideinfo text-center">
                <h6>Hello! You can tutor me at</h6>
            </div>
            <ul className="tu-featureinclude">
                <li>


                    <span className="icon icon-home tu-colorgreen"> <i>At my place (home/institute)</i> </span>
                    {tutoring_type_text.includes("At my place (home/institute)") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle " style={{ color: "red" }}></em>}



                </li>
                <li>

                    <span className="icon icon-video tu-colororange"> <i>Online (using Zoom etc)</i> </span>
                    {tutoring_type_text.includes("Online (using Zoom etc)") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle" style={{ color: "red" }}></em>}



                </li>
                <li>

                    <span className="icon icon-map-pin tu-colorblue"> <i>Travel to tutor's place</i> </span>
                    {tutoring_type_text.includes("Travel to tutor") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle " style={{ color: "red" }}></em>}



                </li>
            </ul>
            <div className="tu-contactbox">
                <h6>Contact details</h6>
                <ul className="tu-listinfo">
                    <li>
                        <span className="tu-bg-voilet"><i className="icon icon-user"></i></span>
                        <h6>{name}</h6>
                    </li>
                    <li>
                        <span className="tu-bg-maroon"><i className="icon icon-phone-call"></i></span>
                        <h6>{hiddenPhoneNumber(phone)}</h6>
                    </li>
                    <li>
                        <span className="tu-bg-maroon"><i className="icon icon-mail"></i></span>
                        <h6>{hiddenEmail(email)}</h6>
                    </li>


                    <li>
                        <span className="tu-bg-green"><i className="fab fa-whatsapp"></i></span>
                        <h6>{hiddenPhoneNumber(phone)}</h6>
                    </li>

                </ul>
            </div>
            <div className="tu-unlockfeature text-center">
                <h6>
                    Need Help? Click the button below to Chat with admin
                </h6>
                <a href={adminWhatsappNumberURL} target="_blank" className="tu-primbtn tu-btngreen">
                    <span>Chat with admin</span>
                    <i className="icon icon-whatsapp" style={{color: "white"}}></i>
                </a>
            </div>
        </aside>
    );
};

export default TutorSidebar; 