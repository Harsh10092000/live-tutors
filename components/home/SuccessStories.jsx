'use client';

import React from 'react'
import useSlider from '@/hooks/useSlider'
import Image from 'next/image'

const SuccessStories = () => {
  useSlider('#tu-sucesstorslider', {
    perPage: 1,
    gap: 24,
    arrows: true,
    pagination: false,
    breakpoints: {
      1199: {
        perPage: 1,
      },
      767: {
        perPage: 1,
      }
    }
  });

  return (
    <section id="tu-sucesstorsection">
      <div className="tu-success-stories">
        <div className="container">
          <div className="tu-sucesstor_pattren">
            <Image 
              src="/images/index/success_stories/pattren.svg" 
              alt="Pattern background"
              width={400}
              height={400}
            />
          </div>
          <div className="row tu-sucesstorslider_title">
            <div className="col-lg-8">
              <div className="tu-maintitle">
                <h2>See how our visitors & members made their <span>#Success Stories</span></h2>
              </div>
            </div>
          </div>
          <div id="tu-sucesstorslider" className="splide tu-sucesstorslider tu-splidearrow">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <div className="tu-sucesstor">
                    <div className="tu-sucesstor_img">
                      <figure>
                        <Image 
                          src="/images/index/success_stories/img-01.jpg" 
                          alt="Success story student"
                          width={700}
                          height={600}
                        />
                        <figcaption>
                          <Image 
                            src="/images/index/success_stories/comma.svg" 
                            alt="Quote symbol"
                            width={50}
                            height={50}
                          />
                        </figcaption>
                      </figure>
                    </div>
                    <div className="tu-sucesstor_title">
                      <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                      <blockquote>" Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. "</blockquote>
                      <h4>
                        Leonard Sullivan
                        <span>2nd Standard, Manchester UK</span>
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="tu-sucesstor">
                    <div className="tu-sucesstor_img">
                      <figure>
                        <Image 
                          src="/images/index/success_stories/img-02.jpg" 
                          alt="Success story student"
                          width={700}
                          height={600}
                        />
                        <figcaption>
                          <Image 
                            src="/images/index/success_stories/comma.svg" 
                            alt="Quote symbol"
                            width={50}
                            height={50}
                          />
                        </figcaption>
                      </figure>
                    </div>
                    <div className="tu-sucesstor_title">
                      <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                      <blockquote>" Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. "</blockquote>
                      <h4>
                        Deanna Griffin
                        <span>2nd Standard, Manchester UK</span>
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="tu-sucesstor">
                    <div className="tu-sucesstor_img">
                      <figure>
                        <Image 
                          src="/images/index/success_stories/img-03.jpg" 
                          alt="Success story student"
                          width={700}
                          height={600}
                        />
                        <figcaption>
                          <Image 
                            src="/images/index/success_stories/comma.svg" 
                            alt="Quote symbol"
                            width={50}
                            height={50}
                          />
                        </figcaption>
                      </figure>
                    </div>
                    <div className="tu-sucesstor_title">
                      <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                      <blockquote>" Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. "</blockquote>
                      <h4>
                        Bruce Mccarthy
                        <span>2nd Standard, Manchester UK</span>
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="tu-sucesstor">
                    <div className="tu-sucesstor_img">
                      <figure>
                        <Image 
                          src="/images/index/success_stories/img-04.jpg" 
                          alt="Success story student"
                          width={700}
                          height={600}
                        />
                        <figcaption>
                          <Image 
                            src="/images/index/success_stories/comma.svg" 
                            alt="Quote symbol"
                            width={50}
                            height={50}
                          />
                        </figcaption>
                      </figure>
                    </div>
                    <div className="tu-sucesstor_title">
                      <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                      <blockquote>" Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. "</blockquote>
                      <h4>
                        Evelyn Mccoy
                        <span>2nd Standard, Manchester UK</span>
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="tu-sucesstor">
                    <div className="tu-sucesstor_img">
                      <figure>
                        <Image 
                          src="/images/index/success_stories/img-05.jpg" 
                          alt="Success story student"
                          width={700}
                          height={600}
                        />
                        <figcaption>
                          <Image 
                            src="/images/index/success_stories/comma.svg" 
                            alt="Quote symbol"
                            width={50}
                            height={50}
                          />
                        </figcaption>
                      </figure>
                    </div>
                    <div className="tu-sucesstor_title">
                      <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                      <blockquote>" Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. "</blockquote>
                      <h4>
                        Frederick Hicks
                        <span>2nd Standard, Manchester UK</span>
                      </h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessStories