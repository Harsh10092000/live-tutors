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
                                                <li style={{width: '100%'}}>
                                                    <span>Level: {item.from_level} → {item.to_level}</span>
                                                    <div style={{background: '#eee', borderRadius: 4, height: 8, marginTop: 4}}>
                                                        <div style={{
                                                            width: `${(parseInt(item.to_level) / 10) * 100}%`,
                                                            background: '#4caf50',
                                                            height: '100%',
                                                            borderRadius: 4
                                                        }}></div>
                                                    </div>
                                                </li>
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