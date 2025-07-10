export const dynamic = "force-dynamic";
import React from "react";
import pool from "@/lib/db";
import FeaturedTutorCard from "../common/FeaturedTutorCard";
const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT GROUP_CONCAT(tutor_skills.skill_name) as skill_names,  tutor_info.created_at, name, profile_pic_url, profile_tag_line, city, state, tutor_id, fee_min, fee_charged_for FROM tutor_info LEFT JOIN tutor_skills ON tutor_info.user_id = tutor_skills.user_id GROUP BY tutor_info.user_id order by tutor_info.id desc limit 3`;
    const [rows] = await db.query(q);
    console.log(rows);
    return { row: rows };
  } catch (err) {
    return err;
  }
};
const RelatedTutors = async () => {
    const res = await getData();
    const data = res.row;
  return (
    <>
      <div className="tu-explore-title">
          <h3>Explore related tutors</h3>
      </div>
      {/* <div className="tu-explore-content row gy-4">
          <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
              <div className="tu-featureitem">
                  <figure>
                      <Link href="/tutor-detail">
                          <Image 
                              src="/images/index/qualified/img-04.jpg" 
                              alt="image-description"
                              width={200}
                              height={200}
                          />
                      </Link>
                      <span className="tu-featuretag">FEATURED</span>
                  </figure>
                  <div className="tu-authorinfo">
                      <div className="tu-authordetail">
                          <figure>
                              <Image 
                                  src="/images/index/professionol/img-04.jpg" 
                                  alt="image-description"
                                  width={100}
                                  height={100}
                              />
                          </figure>
                          <div className="tu-authorname">
                              <h5><Link href="/tutor-detail">William Williams</Link> <i className="icon icon-check-circle tu-greenclr"></i></h5>
                              <span>Nashville, IL</span>
                          </div>
                          <ul className="tu-authorlist">
                              <li><span>Starting from:<em>₹1,198.12/hr</em></span></li>
                              <li><span>Mobile:<em>xxx-xxxxx-54</em></span></li>
                              <li><span>Whatsapp:<em>xxx-xxxxx-88</em></span></li>
                              <li><span>Qualification:<em>B.Tech/B.E.</em></span></li>
                          </ul>
                      </div>
                      <div className="tu-instructors_footer">
                          <div className="tu-rating">
                              <i className="fas fa-star"></i>
                              <h6>5.0</h6>
                              <span>(57,282)</span>
                          </div>
                          <div className="tu-instructors_footer-right">
                              <Link href="#"><i className="icon icon-heart"></i></Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
         
      </div> */}
      <div className="tu-explore-content row gy-4">
      <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
      {data.length > 0 && data.map((item, index) => (
        <FeaturedTutorCard item={item} index={index} />
      ))}
      </div>
      </div>
    </>
  );
};

export default RelatedTutors; 