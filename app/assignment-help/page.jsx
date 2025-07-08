import React from "react";
import "./page.css";
import Hero from "@/components/home/Hero";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="tu-banner">
        <div className="container">
          <div className="row align-items-center g-0 gy-5">
            <div className="col-lg-6">
              <div className="tu-banner_title">
                <h1>
                  Expert <span>#AssignmentHelp</span> for Academic Success
                </h1>
                <p>
                  Get professional assistance with your assignments, delivered
                  on time and tailored to your specific academic requirements.
                  Trusted by students worldwide.
                </p>
                <ul className="banner-list">
                  <li>Plagiarism-Free Guarantee</li>
                  <li>Timely Delivery</li>
                  <li>500+ Native Academic Experts</li>
                  <li>Free Revisions and Refund policies</li>
                  <li>24/7 support</li>
                </ul>
                <ul className="tu-banner_list">
                  <li>
                    <div className="tu-starthere">
                      <span>Get Started Today</span>
                      <Image
                        src="/images/knob_line.svg"
                        alt="Decorative line"
                        width={100}
                        height={50}
                      />
                    </div>
                    <a
                      href="get-help.html"
                      className="tu-primbtn tu-primbtn-gradient"
                    >
                      <span>Request Assignment Help</span>
                      <i className="icon icon-chevron-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="join-expert.html" className="tu-secbtn">
                      <span>Join as an Expert</span>
                      <em>Start Earning</em>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="banner-form">
                <form className="tu-themeform ">
                  <h3>Submit Work</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="tu-placeholderholder">
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            placeholder="Full Name"
                            value="Full Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="tu-placeholderholder">
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            placeholder="Your Email"
                            value="Your Email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="tu-placeholderholder">
                          <select
                            name="subject"
                            id="Subject"
                            required=""
                            className="form-control"
                          >
                            <option value="">Select Subject</option>
                            <option value="SPSS">SPSS </option>
                            <option value="Tableau">Tableau</option>
                            <option value="Weka">Weka </option>
                            <option value="Rapid Miner">Rapid Miner </option>
                            <option value="XL Miner">XL Miner</option>
                            <option value="Microsoft Excel">
                              Microsoft Excel
                            </option>
                            <option value="SAS">SAS</option>
                            <option value="JMP">JMP</option>
                            <option value="Excel">Excel</option>
                            <option value="STATA">STATA</option>
                            <option value="Minitab">Minitab</option>
                            <option value="EViews">EViews</option>
                            <option value="Gretl">Gretl</option>
                            <option value="PHStat">PHStat</option>
                            <option value="MATLAB">MATLAB</option>
                            <option value="MegaStat">MegaStat</option>
                            <option value="Probability">Probability</option>
                            <option value="Biostatistics">Biostatistics</option>
                            <option value="Econometrics">Econometrics</option>
                            <option value="R Programming">R Programming</option>
                            <option value="Applied Statistics">
                              Applied Statistics
                            </option>
                            <option value="Linear Programming">
                              Linear Programming
                            </option>
                            <option value="Business Statistics">
                              Business Statistics
                            </option>
                            <option value="Operations Research">
                              Operations Research
                            </option>
                            <option value="Quantitative Methods">
                              Quantitative Methods
                            </option>
                            <option value="Research Paper">
                              Research Paper
                            </option>
                            <option value="Mathematics">Mathematics </option>
                            <option value="Others">Others </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="tu-placeholderholder">
                          <input
                            type="date"
                            className="form-control"
                            required=""
                            placeholder="bate and time"
                            value="Date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="tu-placeholderholder">
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            placeholder="Phone no"
                            value="Phone No"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          value="Description"
                          rows="3"
                          cols="5"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control"
                          name="selct file"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <a
                      href="#"
                      className="tu-primbtn tu-primbtn-gradient w-100 p-4"
                    >
                      <span>Submit now</span>
                      <i className="icon icon-arrow-right"></i>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="how-it-works">
      <div className="container py-5 text-center">
  <h2 className="fw-bold mb-5">How to Get Help with Writing an Assignment?</h2>
  <div className="row align-items-center justify-content-center g-4">

    <div className="col-md-3">
      <div className="step-icon">
        <img src="images/fill-order-form.png" alt="Fill Order" width="50"/>
      </div>
      <div className="step-title">Fill Order Form</div>
      <div className="step-text">
        Share all task details in the order form. We will review it and select a suitable assignment helper for it.
      </div>
    </div>

  
    

  
    <div className="col-md-3">
      <div className="step-icon">
        <img src="images/secure-pay.png" alt="Secure Expert" width="50"/>
      </div>
      <div className="step-title">Secure an Expert</div>
      <div className="step-text">
        Get an estimate, pay the amount via our safe gateways and finalise the order. We will assign the expert then.
      </div>
    </div>

  


    
    <div className="col-md-3">
      <div className="step-icon">
        <img src="images/rece-timely-solution.png" alt="Receive Solution" width="50"/>
      </div>
      <div className="step-title">Receive Timely Solution</div>
      <div className="step-text">
        Get a high-quality assignment solution within the set time frame. Review the assignment quality thoroughly.
      </div>
    </div>
  </div>

  <button className="order-btn mt-4">Order Now</button>
  </div>
  </section>

      <div className="tu-main-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8">
              <div className="tu-maintitle text-center">
                <img
                  decoding="async"
                  src="https://demos.wp-guppy.com/tuturn/wp-content/plugins/tuturn/public/images/zigzag-line.svg"
                  alt="Better Learning. Better Results
"
                />
                <h4>Better Learning. Better Results</h4>
                <h2>Get Expert Help with Assignment Online</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-7.png"
                    alt="Offering All types of Courses"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Top Assignment Helpers</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform tu-activebox">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-1-2.png"
                    alt="Online consultation for all"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Complete Assignment Assistance</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-2-1.png"
                    alt="A great investment for future"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Plagiarism-Free Work</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-3-1.png"
                    alt="Best results guranteed"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Affordable Prices</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-4-1.png"
                    alt="Easy to connect with anyone"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Money Back Guarantee</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-4">
              <div className="tu-eduplatform">
                <figure className="tu-eduplatform_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/04/Placeholder-5-1.png"
                    alt="All verified tutors for you"
                  />
                </figure>
                <div className="tu-eduplatform_info">
                  <h5>Fast Turnarounds</h5>
                  <p>
                    Aeccusamus et iustome odio digniste simos ducimus blanditiis
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="tu-mainbtn">
            <a
              href="https://demos.wp-guppy.com/tuturn/signup/"
              className="tu-primbtn-lg"
            >
              <span>Order Now</span>
              <i className="icon icon-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="tu-success-section mt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tu-maintitle">
                <h2>
                  Stats that explain everything about <span>#Our success</span>
                </h2>
                <a
                  href="https://demos.wp-guppy.com/tuturn/how-it-work/"
                  className="tu-primbtn-lg"
                >
                  <span>See how it works</span>
                  <i class="icon icon-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-12 col-md-6 col-xxl-3">
              <div id="tu-counter" className="tu-oursuccess">
                <figure className="tu-oursuccess_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/05/Placeholder-4-100x100.png"
                    alt="Courses available for verified
and top tutors"
                  />
                </figure>
                <div className="tu-oursuccess_info">
                  <h4>
                    <span
                      data-from="0"
                      data-to="560616"
                      data-speed="8000"
                      data-refresh-interval="50"
                    >
                      560,616
                    </span>
                  </h4>
                  <p>Courses available for verified and top tutors</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-3">
              <div id="tu-counter" className="tu-oursuccess">
                <figure className="tu-oursuccess_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/05/Placeholder-1-2-100x100.png"
                    alt="Total tuition job posted on the
platform till date"
                  />
                </figure>
                <div className="tu-oursuccess_info">
                  <h4>
                    <span
                      data-from="0"
                      data-to="648482"
                      data-speed="8000"
                      data-refresh-interval="50"
                    >
                      648,482
                    </span>
                  </h4>
                  <p>Total tuition job posted on the platform till date</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-3">
              <div id="tu-counter" className="tu-oursuccess">
                <figure className="tu-oursuccess_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/05/Placeholder-2-1-100x100.png"
                    alt="User daily average time spent
on the platform"
                  />
                </figure>
                <div className="tu-oursuccess_info">
                  <h4>
                    <span
                      data-from="0"
                      data-to="20"
                      data-speed="8000"
                      data-refresh-interval="50"
                    >
                      20
                    </span>
                    + Hours
                  </h4>
                  <p>User daily average time spent on the platform</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-3">
              <div id="tu-counter" className="tu-oursuccess">
                <figure className="tu-oursuccess_img">
                  <img
                    decoding="async"
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/05/Placeholder-3-1-100x100.png"
                    alt="Active instructor and students
available on the platform"
                  />
                </figure>
                <div className="tu-oursuccess_info">
                  <h4>
                    <span
                      data-from="0"
                      data-to="7"
                      data-speed="8000"
                      data-refresh-interval="50"
                    >
                      7
                    </span>
                    + Million
                  </h4>
                  <p>
                    Active instructor and students available on the platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default page;
