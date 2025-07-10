'use client';


import React from 'react'
import useSlider from '@/hooks/useSlider'
import Image from 'next/image'
import Link from 'next/link';
import { img_url } from '@/app/utils';
import FeaturedTutorCard from './FeaturedTutorCard';

const FeaturedTutors = ({ data }) => {
    useSlider('#tu-featurelist', {
        perPage: 4,
        gap: 24,
        arrows: true,
        pagination: false,
        breakpoints: {
            1399: { perPage: 3 },
            991: { perPage: 2 },
            575: { perPage: 1 }
        }
    });

    return (
        <>
            <div id="tu-featurelist" className="splide tu-featurelist tu-splidedots">
                <div className="splide__track">
                    <ul className="splide__list">
                       
                            <li className="splide__slide" >
                            {data.map((item, index) => (
                                <FeaturedTutorCard item={item} index={index} />
))}
                            </li>
                        
                    </ul>
                </div>
            </div>
            <div className="tu-mainbtn">
                <Link href="/tutors" className="tu-primbtn-lg">
                    <span>Explore all instructors</span>
                    <i className="icon icon-chevron-right"></i>
                </Link>
            </div>
        </>
    )
}

export default FeaturedTutors;