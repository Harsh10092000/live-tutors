'use client'
import React, { useState } from 'react';

const Experience = ({ experience }) => {
    const [showExperience, setShowExperience] = useState(false);
    return (
        <div className="tu-tabswrapper">
            <div className="tu-tabstitle tab-show-icon" onClick={() => setShowExperience(!showExperience)}>
                <h4>Experience</h4>
                <i className={`icon ${showExperience ? 'icon-minus' : 'icon-plus'}`} role="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba"></i>
            </div>
            {showExperience && experience.map((item, index) => (
                <div className="accordion tu-accordionedu" id="accordionFlushExampleaa">
                    <div id="tu-edusortable" className="tu-edusortable">
                        <div className="tu-accordion-item">
                            <div className="tu-expwrapper">
                                <div className="tu-accordionedu">
                                    <div className="tu-expinfo">
                                        <div className="tu-accodion-holder">
                                                    <h5 className="collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba">{item.role}</h5>
                                                    <ul className="tu-branchdetail">
                                                <li><i className="icon icon-briefcase"></i><span>{item.company}</span></li>
                                                <li><i className="icon icon-association"></i><span>{item.association}</span></li>
                                                <li><i className="icon icon-calendar"></i><span>{item.start_month} {item.start_year} - {item.end_month} {item.end_year}</span></li>
                                            </ul>
                                            <div className="tu-edubodymain">
														<div className="tu-accordioneduc">
															<p>{item.description}</p>
														</div>
													</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        {index !== experience.length - 1 && <div className='inside-section-divider'></div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Experience;