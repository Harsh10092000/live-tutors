'use client'
import React, { useState } from 'react';

const Description = ({ profile_desc }) => {
    const [showDescription, setShowDescription] = useState(false);
    return (
        <div className="tu-tabswrapper">
            <div className="tu-tabstitle tab-show-icon" onClick={() => setShowDescription(!showDescription)}>
                <h4>A brief description</h4>
                <i className={`icon ${showDescription ? 'icon-minus' : 'icon-plus'}`} role="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOneba" aria-expanded="true" aria-controls="flush-collapseOneba"></i>
            </div>
            {showDescription && (
                <div className="tu-description">
                    <p>
                        {profile_desc}
                    </p>
                </div>
            )}
        </div>


    )
}

export default Description;