'use client'
import React, { useState } from 'react';

const Education = ({ education }) => {
    const [showEducation, setShowEducation] = useState(false);
    return (
        <div className="tu-tabswrapper">
                                            <div className="tu-tabstitle tab-show-icon" onClick={() => setShowEducation(!showEducation)}>
                                                <h4>Education</h4>
                                                <i className={`icon ${showEducation ? 'icon-minus' : 'icon-plus'}`} role="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba"></i>
                                            </div>
            {showEducation && education.map((item, index) => (
                <div className="accordion tu-accordionedu" id="accordionFlushExampleaa">
                    <div id="tu-edusortable" className="tu-edusortable">
                        <div className="tu-accordion-item">
                            <div className="tu-expwrapper">
                                <div className="tu-accordionedu">
                                    <div className="tu-expinfo">
                                        <div className="tu-accodion-holder">
                                            <h5 className="collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba">{item.degree_name} {item.speciality ? `, ${item.speciality}` : ''}</h5>
                                            <ul className="tu-branchdetail">
                                                <li><i className="icon icon-home"></i><span>{item.university}</span></li>
                                                {/* <li><i className="icon icon-map-pin"></i><span>{item.city}, {item.state}</span></li> */}
                                                <li><i className="icon icon-calendar"></i><span>Passed out in {item.end_year}</span></li>
                                            </ul>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            {/* <div id="flush-collapseOneba" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExampleaa">
                                <div className="tu-edubodymain">
                                    <div className="tu-accordioneduc">
                                        <p>Accusamus et iusto odio dignissie corrupti quos dolores etolestias excepo officiale deserunt mollitia animi idendication estame laborum.Accusamus etae iusto odioignissie corrupti quos dolores etolestias excepto officiale deserunt mollitia animi endication estame laborum.</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {index !== education.length - 1 && <div className='inside-section-divider'></div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Education;