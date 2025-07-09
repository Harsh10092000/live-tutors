'use server'

import React from 'react'
import pool from '@/lib/db'
import ProfileHeader from '@/components/tutorDetail/ProfileHeader'
import Sidebar from '@/components/tutorDetail/Sidebar'
import Description from '@/components/tutorDetail/Descrption'
import Education from '@/components/tutorDetail/Education'
import Skills from '@/components/tutorDetail/Skills'
import Experience from '@/components/tutorDetail/Experience'

const getData = async (tutorId) => {
    try {
        const db = await pool;
        const q = "SELECT * from tutor_info where tutor_id = ?";
        const [rows] = await db.query(q, tutorId);

        const user_id = rows[0].user_id;

        const q1 = "SELECT * from tutor_experience WHERE user_id = ?";
        const [experience] = await db.query(q1, user_id);

        const q2 = "SELECT * from tutor_education WHERE user_id = ?";
        const [education] = await db.query(q2, user_id);

        const q3 = "SELECT * from tutor_skills WHERE user_id = ?";
        const [skills] = await db.query(q3, user_id);


        return {
            row: rows[0],
            experience: experience,
            education: education,
            skills: skills
        };
    } catch (err) {
        console.log("err : ", err);
        return err;
    }
};





const page = async ({ params }) => {
    const { slug } = await params;
    console.log("slug : ", slug);
    const data = await getData(slug);
    console.log("data : ", data);
    return (
        <main className="tu-main tu-bgmain">
            <section className="tu-main-section">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-8 col-xxl-9">
                            <ProfileHeader slug={slug} name={data.row.name} profile_tag_line={data.row.profile_tag_line} profile_pic_url={data.row.profile_pic_url} language_preferences={data.row.language_preferences} city={data.row.city} state={data.row.state} gender={data.row.gender} tutoring_preferences={data.row.tutoring_preferences} travel_distance={data.row.travel_distance} min_fee={data.row.fee_min} max_fee={data.row.fee_max} fee_charged_for={data.row.fee_charged_for} created_at={data.row.created_at} phone={data.row.phone} intro_video_url={data.row.intro_video_url} />
                            <div className="tu-detailstabs">
                                <ul className="nav nav-tabs tu-nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i className="icon icon-home"></i><span>Introduction</span></button>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="icon icon-message-circle"></i><span>Reviews</span></button>
                                    </li> */}
                                </ul>
                                <div className="tab-content tu-tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <Description profile_desc={data.row.profile_desc} />
                                         <Experience experience={data.experience} />
                                        <Education education={data.education} />
                                        <Skills skills={data.skills} />
                                    </div>

                                </div>
                                {/* <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="tu-tabswrapper">
                                        <div className="tu-boxtitle">
                                            <h4>Reviews (4,448)</h4>
                                        </div>
                                        <div className="tu-commentarea">
                                            <div className="tu-commentlist">
                                                <figure>
                                                    <img src="images/tutordetail/review/img-01.png" alt="images" />
                                                </figure>
                                                <div className="tu-coomentareaauth">
                                                    <div className="tu-commentright">
                                                        <div className="tu-commentauthor">
                                                            <h6><span>Ronnie Montgomery</span>02 sec ago</h6>
                                                            <div className="tu-listing-location tu-ratingstars">
                                                                <span>5.0</span>
                                                                <span className="tu-stars tu-sm-stars">
                                                                    <span></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tu-description">
                                                        <p>Elit amet ut dui nam enim consectetur arcu amet varius. Viverra ac nisl quam nec justo,
                                                            posuere suspendisse consequat. Sit aliquam purus mattis libero, pellentesque tellus sed amet pretium.
                                                            Porttitor massa lectus dolor at enim. Ultricies varius diam elementum quis id eleifend. Eu vulputate urna, nulla dignissim ultrices.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tu-commentlist">
                                                <figure>
                                                    <img src="images/tutordetail/review/img-02.png" alt="images" />
                                                </figure>
                                                <div className="tu-coomentareaauth">
                                                    <div className="tu-commentright">
                                                        <div className="tu-commentauthor">
                                                            <h6><span>Margaret Hansen</span> 05 days ago</h6>
                                                            <div className="tu-listing-location tu-ratingstars">
                                                                <span>4.0</span>
                                                                <span className="tu-stars tu-sm-stars tu-fourstar">
                                                                    <span></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tu-description">
                                                        <p>Hac lacus nulla tristique lectus lectus enim. Est eget penatibus et in tempus. Cursus habitant at mauris arcu sed pellentesque viverra massa. Facilisis tristique bibendum dictum amet posuere. Facilisis quis nisi facilisis orci nulla. Hac nullam ut tortor eget.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tu-commentlist">
                                                <figure>
                                                    <img src="images/tutordetail/review/img-03.png" alt="images" />
                                                </figure>
                                                <div className="tu-coomentareaauth">
                                                    <div className="tu-commentright">
                                                        <div className="tu-commentauthor">
                                                            <h6><span>Yvonne Snyder</span> 01 year ago</h6>
                                                            <div className="tu-listing-location tu-ratingstars">
                                                                <span>4.0</span>
                                                                <span className="tu-stars tu-sm-stars tu-fourstar">
                                                                    <span></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tu-description">
                                                        <p>Ipsum quisque risus nisl sed tortor nulla. Scelerisque neque, velit dui eget. Mi, viverra sagittis est sapien blandit. Sit mi erat turpis integer accumsan. Mi, quis eget tincidunt dictum. Lorem maecenas a faucibus mattis laoreet quis.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tu-commentlist">
                                                <figure>
                                                    <img src="images/tutordetail/review/img-04.jpg" alt="images" />
                                                </figure>
                                                <div className="tu-coomentareaauth">
                                                    <div className="tu-commentright">
                                                        <div className="tu-commentauthor">
                                                            <h6><span>Bradley Gallagher</span> 01 mon ago</h6>
                                                            <div className="tu-listing-location tu-ratingstars">
                                                                <span>5.0</span>
                                                                <span className="tu-stars tu-sm-stars">
                                                                    <span></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tu-description">
                                                        <p>Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris neimit utnaeliquip ex ea commodo consequat volupte ateian essemae cillume.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tu-commentlist" style={{ display: 'none' }}>
                                                <figure>
                                                    <img src="images/tutordetail/review/img-02.png" alt="images" />
                                                </figure>
                                                <div className="tu-coomentareaauth">
                                                    <div className="tu-commentright">
                                                        <div className="tu-commentauthor">
                                                            <h6><span>Ronnie Montgomery</span>02 sec ago</h6>
                                                            <div className="tu-listing-location tu-ratingstars">
                                                                <span>5.0</span>
                                                                <span className="tu-stars tu-sm-stars">
                                                                    <span></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tu-description">
                                                        <p>Elit amet ut dui nam enim consectetur arcu amet varius. Viverra ac nisl quam nec justo,
                                                            posuere suspendisse consequat. Sit aliquam purus mattis libero, pellentesque tellus sed amet pretium.
                                                            Porttitor massa lectus dolor at enim. Ultricies varius diam elementum quis id eleifend. Eu vulputate urna, nulla dignissim ultrices.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="show-more">
                                                <a href="javascript:void(0);" className="tu-readmorebtn tu-show_more">Show all</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tu-tabswrapper">
                                        <div className="tu-boxtitle">
                                            <h4>Add your review</h4>
                                        </div>
                                        <form className="tu-themeform" id="tu-reviews-form">
                                            <fieldset>
                                                <div className="tu-themeform__wrap">
                                                    <div className="form-group-wrap">
                                                        <div className="form-group">
                                                            <div className="tu-reviews">
                                                                <label className="tu-label">Give rating to your review</label>
                                                                <div className="tu-my-ratingholder">
                                                                    <h6>Good experience</h6>
                                                                    <div id="tu-addreview" className="tu-addreview"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group tu-message-text">
                                                            <label className="tu-label">Review details</label>
                                                            <div className="tu-placeholderholder">
                                                                <textarea className="form-control tu-textarea" id="tu-reviews-content" name="reviews_content" required placeholder="Enter description" maxLength="500"></textarea>
                                                                <div className="tu-placeholder">
                                                                    <span>Enter description</span>
                                                                </div>
                                                            </div>
                                                            <div className="tu-input-counter">
                                                                <span>Characters left:</span>
                                                                <b className="tu_current_comment">500</b>
                                                                /                                        <em className="tu_maximum_comment"> 500</em>
                                                            </div>
                                                        </div>

                                                        <div className="form-group tu-formspacebtw">
                                                            <div className="tu-check">
                                                                <input type="hidden" name="termsconditions" value="" />
                                                                <input type="checkbox" id="termsconditions" name="termsconditions" />
                                                                <label htmlFor="termsconditions"><span>I have read and agree to all <a href="javascript:void(0);">Terms &amp; conditions</a></span></label>
                                                            </div>
                                                            <a href="tutor-detail.html" className="tu-primbtn-lg tu-submit-reviews" data-profile_id=""><span>Submit</span><i className="icon icon-chevron-right"></i></a>
                                                            <input type="hidden" name="profile_id" value="584" />
                                                            <input type="hidden" name="user_id" value="691" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3">
                            <Sidebar tutoring_preferences={data.row.tutoring_preferences} name={data.row.name} phone={data.row.phone} email={data.row.email} />
                        </div>
                    </div>

                </div>

            </section>
        </main>
    )
}

export default page