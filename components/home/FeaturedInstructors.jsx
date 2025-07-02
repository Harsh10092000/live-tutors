'use client';

import React from 'react'
import useSlider from '@/hooks/useSlider'
import Image from 'next/image'

const FeaturedInstructors = () => {
  useSlider('#tu-featurelist', {
    perPage: 4,
    gap: 24,
    arrows: true,
    pagination: false,
    breakpoints: {
      1399: {
        perPage: 3,
      },
      991: {
        perPage: 2,
      },
      575: {
        perPage: 1,
      }
    }
  });

  return (
    <section className="tu-main-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tu-maintitle text-center">
              <Image src="/images/zigzag-line.svg" alt="img" width={100} height={20} />
                            <h4>Our featured instructors</h4>
                            <h2>Every instructor is professional and highly qualified</h2>
                            <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                        </div>
                    </div>
                </div>
        <div id="tu-featurelist" className="splide tu-featurelist tu-splidedots">
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <div className="tu-featureitem">
                                    <figure>
                    <a href="tutor-detail.html">
                      <Image width={200} height={200} src="/images/index/qualified/img-01.jpg" alt="image-description" />
                    </a>
                    <span className="tu-featuretag">FEATURED</span>
                                    </figure>
                  <div className="tu-authorinfo">
                    <div className="tu-authordetail">
                                            <figure>
                        <Image width={50} height={50} src="/images/index/professionol/img-01.jpg" alt="image-description"/>
                                            </figure>
                      <div className="tu-authorname">
                        <h5>
                          <a href="tutor-detail.html">Dwayne Garrett</a>
                          <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i>
                        </h5>
                                                <span>Arlington, TN</span>
                                            </div>
                      <ul className="tu-authorlist">
                        <li><span>Starting from:<em>$893.30/hr</em></span></li>
                        <li><span>Mobile:<em>xxx-xxxxx-33</em></span></li>
                        <li><span>Whatsapp:<em>xxx-xxxxx-11</em></span></li>
                        <li><span>Qualification:<em>B.Tech/B.E.</em></span></li>
                                            </ul>
                                        </div>
                    <div className="tu-instructors_footer">
                      <div className="tu-rating">
                        <i className="fas fa-star"></i>
                                                <h6>5.0</h6>
                                                <span>(66,951)</span>
                                            </div>
                      <div className="tu-instructors_footer-right">
                        <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
              <li className="splide__slide">
                <div className="tu-featureitem">
                                    <figure>
                    <a href="tutor-detail.html">
                      <Image width={200} height={200} src="/images/index/qualified/img-02.jpg" alt="image-description" />
                    </a>
                    <span className="tu-featuretag">FEATURED</span>
                                    </figure>
                  <div className="tu-authorinfo">
                    <div className="tu-authordetail">
                                            <figure>
                        <Image width={50} height={50} src="/images/index/professionol/img-02.jpg" alt="image-description" />
                                            </figure>
                      <div className="tu-authorname">
                        <h5>
                          <a href="tutor-detail.html">Gwendolyn Parker</a>
                          <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i>
                        </h5>
                                                <span>Las Vegas, TN</span>
                                            </div>
                      <ul className="tu-authorlist">
                        <li><span>Starting from:<em>$1,385.10/hr</em></span></li>
                        <li><span>Mobile:<em>xxx-xxxxx-11</em></span></li>
                        <li><span>Whatsapp:<em>xxx-xxxxx-80</em></span></li>
                        <li><span>Qualification:<em>B.Tech/B.E.</em></span></li>
                                            </ul>
                                        </div>
                    <div className="tu-instructors_footer">
                      <div className="tu-rating">
                        <i className="fas fa-star"></i>
                                                <h6>5.0</h6>
                                                <span>(38,494)</span>
                                            </div>
                      <div className="tu-instructors_footer-right">
                        <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
              <li className="splide__slide">
                <div className="tu-featureitem">
                                    <figure>
                    <a href="tutor-detail.html">
                      <Image width={200} height={200} src="/images/index/qualified/img-03.jpg" alt="image-description" />
                    </a>
                    <span className="tu-featuretag">FEATURED</span>
                                    </figure>
                  <div className="tu-authorinfo">
                    <div className="tu-authordetail">
                                            <figure>
                        <Image width={50} height={50} src="/images/index/professionol/img-03.jpg" alt="image-description" />
                                            </figure>
                      <div className="tu-authorname">
                        <h5>
                          <a href="tutor-detail.html">Glen Burns</a>
                          <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i>
                        </h5>
                                                <span>Chicago, OH</span>
                                            </div>
                      <ul className="tu-authorlist">
                        <li><span>Starting from:<em>$1,336.83/hr</em></span></li>
                        <li><span>Mobile:<em>xxx-xxxxx-11</em></span></li>
                        <li><span>Whatsapp:<em>xxx-xxxxx-46</em></span></li>
                        <li><span>Qualification:<em>B.Tech/B.E.</em></span></li>
                                            </ul>
                                        </div>
                    <div className="tu-instructors_footer">
                      <div className="tu-rating">
                        <i className="fas fa-star"></i>
                                                <h6>5.0</h6>
                                                <span>(47,044)</span>
                                            </div>
                      <div className="tu-instructors_footer-right">
                        <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
              <li className="splide__slide">
                <div className="tu-featureitem">
                                    <figure>
                    <a href="tutor-detail.html">
                      <Image width={200} height={200} src="/images/index/qualified/img-04.jpg" alt="image-description" />
                    </a>
                    <span className="tu-featuretag">FEATURED</span>
                                    </figure>
                  <div className="tu-authorinfo">
                    <div className="tu-authordetail">
                                            <figure>
                        <Image width={50} height={50} src="/images/index/professionol/img-04.jpg" alt="image-description" />
                                            </figure>
                      <div className="tu-authorname">
                        <h5>
                          <a href="tutor-detail.html">William Williams</a>
                          <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i>
                        </h5>
                                                <span>Nashville, IL</span>
                                            </div>
                      <ul className="tu-authorlist">
                        <li><span>Starting from:<em>$1,198.12/hr</em></span></li>
                        <li><span>Mobile:<em>xxx-xxxxx-54</em></span></li>
                        <li><span>Whatsapp:<em>xxx-xxxxx-88</em></span></li>
                        <li><span>Qualification:<em>B.Tech/B.E.</em></span></li>
                                            </ul>
                                        </div>
                    <div className="tu-instructors_footer">
                      <div className="tu-rating">
                        <i className="fas fa-star"></i>
                                                <h6>5.0</h6>
                        <span>(47,044)</span>
                                            </div>
                      <div className="tu-instructors_footer-right">
                        <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        <div className="tu-mainbtn">
          <a href="search-listing.html" className="tu-primbtn-lg"><span>Explore all instructors</span><i className="icon icon-chevron-right"></i></a>
                </div>
            </div>
        </section>
  )
}

export default FeaturedInstructors