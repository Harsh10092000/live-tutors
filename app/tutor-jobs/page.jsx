export const dynamic = "force-dynamic";
import React from "react";
import pool from "@/lib/db";
import Page1 from "./page1";

const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT * FROM tutor_requests order by id desc`;
    const q1 =
      "SELECT COUNT(*) as total from tutor_requests";
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
