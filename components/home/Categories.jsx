'use client';

import React from 'react'
import useSlider from '@/hooks/useSlider'
import Image from 'next/image'

const Categories = () => {
  useSlider('#tu-categoriesslider', {
    perPage: 4,
    gap: 24,
    arrows: false,
    pagination: true,
    breakpoints: {
      1399: {
        perPage: 4,
      },
      991: {
        perPage: 3,
      },
      575: {
        perPage: 2,
      }
    }
  });

  return (
    <section className="tu-main-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="tu-maintitle text-center">
                        <Image src="/images/zigzag-line.svg" alt="zigzag line" width={100} height={20} />
                        <h4>Let's make a quick start today</h4>
                        <h2>Choose from the top visited categories you may like</h2>
                        <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                    </div>
                </div>
            </div>
            <div id="tu-categoriesslider" className="splide tu-categoriesslider tu-splidedots">
                <div className="splide__track">
                    <ul className="splide__list">
                        <li className="splide__slide">
                            <a className="tu-categories_content" href="search-listing-two.html">
                                <Image src="/images/index/categories/img-09.jpg" alt="Music learning" width={200} height={150} />
                                <div className="tu-categories_title">
                                    <h6>Music learning</h6>
                                    <span>6,301 Listings</span>
                                </div>
                            </a>
                        </li>
                        <li className="splide__slide">
                            <a className="tu-categories_content" href="search-listing-two.html">
                                <Image src="/images/index/categories/img-10.jpg" alt="Computer & hardware" width={200} height={150} />
                                <div className="tu-categories_title">
                                    <h6>Computer &amp; hardware</h6>
                                    <span>4,329 Listings</span>
                                </div>
                            </a>
                        </li>
                        <li className="splide__slide">
                            <a className="tu-categories_content" href="search-listing-two.html">
                                <Image src="/images/index/categories/img-11.jpg" alt="Beauty learning" width={200} height={150} />
                                <div className="tu-categories_title">
                                    <h6>Beauty learning</h6>
                                    <span>6,406 Listings</span>
                                </div>
                            </a>
                        </li>
                        <li className="splide__slide">
                            <a className="tu-categories_content" href="search-listing-two.html">
                                <Image src="/images/index/categories/img-12.jpg" alt="IT & development" width={200} height={150} />
                                <div className="tu-categories_title">
                                    <h6>IT &amp; development</h6>
                                    <span>5,925 Listings</span>
                                </div>
                            </a>
                        </li>
                        <li className="splide__slide">
                            <a className="tu-categories_content" href="search-listing-two.html">
                                <Image src="/images/index/categories/img-13.jpg" alt="Islamic education" width={200} height={150} />
                                <div className="tu-categories_title">
                                    <h6>Islamic education</h6>
                                    <span>4,157 Listings</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tu-mainbtn">
                <a href="search-listing-two.html" className="tu-primbtn-lg"><span>Explore All categories</span><i className="icon icon-chevron-right"></i></a>
            </div>
        </div>
    </section>
  )
}

export default Categories