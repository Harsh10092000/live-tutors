export const dynamic = "force-dynamic";
import React from "react";
import pool from "@/lib/db";
import Page1 from "./page1";

const getData = async () => {
  try {
    const db = await pool;
    // const q = `SELECT * FROM tutor_requests order by id desc`;
    //const q = `SELECT tutor_skills.skill_name, tutor_info.name, tutor_info.profile_tag_line, tutor_info.profile_pic_url, tutor_info.city, tutor_info.state, tutor_info.gender, tutor_info.tutoring_preferences, tutor_info.travel_distance, tutor_info.fee_min, tutor_info.fee_charged_for, tutor_info.created_at, tutor_info.intro_video_url, tutor_info.language_preferences, tutor_info.tutor_id FROM tutor_info join tutor_skills on tutor_info.user_id = tutor_skills.user_id order by tutor_info.id desc`;
    const q = "SELECT GROUP_CONCAT(tutor_skills.skill_name) AS skill_names, tutor_info.profile_desc,  tutor_info.name, tutor_info.profile_tag_line, tutor_info.profile_pic_url, tutor_info.city, tutor_info.state, tutor_info.gender, tutor_info.tutoring_preferences, tutor_info.travel_distance, tutor_info.fee_min, tutor_info.fee_charged_for, tutor_info.created_at, tutor_info.intro_video_url, tutor_info.language_preferences, tutor_info.tutor_id FROM tutor_info JOIN tutor_skills ON tutor_info.user_id = tutor_skills.user_id GROUP BY tutor_info.user_id ORDER BY tutor_info.id DESC;";
    const q1 =
      "SELECT COUNT(*) as total from tutor_info";
    const [rows] = await db.query(q);
    const [total] = await db.query(q1);

    return { row: rows, total: total };
  } catch (err) {
    return err;
  }
};

const page = async ({ searchParams }) => {

  
  let currentPage = searchParams["page"] || 1;
  const res = await getData(currentPage);
  const data = res.row;
  const recordsPerPage = 12;
  return (
    <div className="container">
      <title>Live Tutors - View All Tutoring Requests</title>
      <meta
        name="description"
        content="Discover your perfect tutoring request with Live Tutors. Explore a curated selection of tutoring requests tailored to your needs."
      />
      <meta name="author" content="Live Tutors" />
      <link rel="canonical" href="#" />
      

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.url}`}>
            {item.url}
          </a>
        ))}
      </div>

      <Page1 data={data}  recordsPerPage={recordsPerPage} currentPage={currentPage}/>
    </div>
  );
};

export default page;
