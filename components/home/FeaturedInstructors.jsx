export const dynamic = "force-dynamic";
import React from "react";
import pool from "@/lib/db";
import FeaturedTutors from "../common/FeaturedTutors";
import Image from "next/image";
const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT GROUP_CONCAT(tutor_skills.skill_name) as skill_names, tutor_info.created_at, name, profile_pic_url, profile_tag_line, city, state, tutor_id, fee_min, fee_charged_for FROM tutor_info LEFT JOIN tutor_skills ON tutor_info.user_id = tutor_skills.user_id GROUP BY tutor_info.user_id order by tutor_info.id desc limit 3`;
    const [rows] = await db.query(q);


    return { row: rows };
  } catch (err) {
    return err;
  }
};

const page = async () => {

  const res = await getData();
  const data = res.row;

  console.log("data : " , data);

  return (
    <div className="container">
      <title>Live Tutors - View All Tutoring Requests</title>
      <meta
        name="description"
        content="Discover your perfect tutoring request with Live Tutors. Explore a curated selection of tutoring requests tailored to your needs."
      />
      <meta name="author" content="Live Tutors" />
      <link rel="canonical" href="#" />
      
{/* 
      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.url}`}>
            {item.url}
          </a>
        ))}
      </div> */}
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
      <FeaturedTutors data={data}  />
      </div>
      </section>
    </div>
  );
};

export default page;
