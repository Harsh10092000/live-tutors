export const dynamic = "force-dynamic";
import pool from '@/lib/db';
import React from 'react';
import TutorProfile from '@/components/jobDetailJob/TutorProfile';
import TutorSidebar from '@/components/jobDetailJob/TutorSidebar';
import JoinCommunity from '@/components/jobDetailJob/JoinCommunity';
import RelatedTutors from '@/components/jobDetailJob/RelatedTutors';
import TutorTabs from '@/components/jobDetailJob/TutorTabs';

  
  const getData = async (slug) => {
    try {
      const db = await pool;
      const q = "SELECT GROUP_CONCAT(tutor_skills.skill_name) AS skill_names, tutor_info.name, tutor_info.profile_tag_line, tutor_info.profile_pic_url, tutor_info.city, tutor_info.state, tutor_info.gender, tutor_info.tutoring_preferences, tutor_info.travel_distance, tutor_info.fee_min, tutor_info.fee_charged_for, tutor_info.created_at, tutor_info.intro_video_url, tutor_info.language_preferences, tutor_info.tutor_id FROM tutor_info JOIN tutor_skills ON tutor_info.user_id = tutor_skills.user_id GROUP BY tutor_info.user_id ORDER BY tutor_info.id DESC;";
      const [rows] = await db.query(q, slug);
      return {
        row: rows[0],
      };
    } catch (err) {
      console.log("err : ", err);
      return err;
    }
  };

const TutorDetailPage = async ({ params }) => {
    const { slug } = params;
  if (!slug) {
    return <div>Invalid Url</div>;
  }

  

  //const arrproId = slug.split("-");
  //const proId1 = arrproId[arrproId.length - 1];

  const {
    row: jobdata,
  } = await getData(slug);

  return (
    <main className="tu-main tu-bgmain">
        <section className="tu-main-section">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-xl-8 col-xxl-9">
                        <TutorProfile jobdata={jobdata} />
                        <TutorTabs jobdata={jobdata} />
                        <JoinCommunity />
                        <RelatedTutors />
                    </div>
                    <div className="col-xl-4 col-xxl-3">
                      { jobdata && <TutorSidebar tutoring_type={jobdata.tutoring_type} name={jobdata.name} email={jobdata.email} phone={jobdata.phone} /> }
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
};

export default TutorDetailPage;