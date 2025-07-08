'use client'
import React, { useState } from 'react';

const Skills = ({ skills }) => {
    const [showSkills, setShowSkills] = useState(false);
    return (
        <div className="tu-tabswrapper">
            <div className="tu-tabstitle tab-show-icon" onClick={() => setShowSkills(!showSkills)}>
                <h4>Skills</h4>
                <i className={`icon ${showSkills ? 'icon-minus' : 'icon-plus'}`} role="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba"></i>
            </div>
            {showSkills && skills.map((item, index) => (
                <div className="accordion tu-accordionedu" id="accordionFlushExampleaa">
                    <div id="tu-edusortable" className="tu-edusortable">
                        <div className="tu-accordion-item">
                            <div className="tu-expwrapper">
                                <div className="tu-accordionedu">
                                    <div className="tu-expinfo">
                                        <div className="tu-accodion-holder">
                                                    <h5 className="collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba">{item.skill_name}</h5>
                                                    <ul className="tu-branchdetail">
                                                <li><i className="icon icon-arrow-up"></i><span>{item.from_level}</span></li>
                                                <li><i className="icon icon-arrow-down"></i><span>{item.to_level}</span></li>
                                            </ul>
                                          
                                        </div>

                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        {index !== skills.length - 1 && <div className='inside-section-divider'></div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Skills;