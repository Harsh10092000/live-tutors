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
      // const q = "SELECT * from tutor_requests where url = ? ";
      const q = "SELECT tutor_requests.id as job_id , tutor_requests.*, users.* from tutor_requests left join users on tutor_requests.user_id = users.id where tutor_requests.url = ?";
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
                      { jobdata && (
                        <TutorSidebar 
                          tutoring_type={jobdata.tutoring_type} 
                          name={jobdata.name} 
                          email={jobdata.email} 
                          phone={jobdata.phone}
                          user_id={jobdata.user_id}
                        />
                      ) }
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
};

export default TutorDetailPage;