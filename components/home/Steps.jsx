import React from 'react'

const Steps = () => {
  return (
    <section className="tu-main-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="tu-maintitle text-center">
                        <h4>Making ease for everyone</h4>
                        <h2>We made it in easy way</h2>
                        <p>accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                    </div>
                </div>
            </div>
            <div className="row tu-howit-steps gy-4">
                <div className="col-12 col-md-6 col-xl-4">
                    <div className="tu-howit-steps_content">
                        <figure><img src="images/how-it-work/img-01.jpg" alt="images" /></figure>
                        <div className="tu-howit-steps_info">
                            <span className="tu-step-tag tu-orange-bgclr">STEP 01</span>
                            <h5>Post a tuition job</h5>
                            <p>Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                    <div className="tu-howit-steps_content">
                        <figure><img src="images/how-it-work/img-02.jpg" alt="images" /></figure>
                        <div className="tu-howit-steps_info">
                            <span className="tu-step-tag tu-purple-bgclr">STEP 02</span>
                            <h5>Hire your best match</h5>
                            <p>Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-4">
                    <div className="tu-howit-steps_content">
                        <figure><img src="images/how-it-work/img-03.jpg" alt="images" /></figure>
                        <div className="tu-howit-steps_info">
                            <span className="tu-step-tag tu-green-bgclr">STEP 03</span>
                            <h5>Get it done on time</h5>
                            <p>Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Steps