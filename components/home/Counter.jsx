import React from 'react'

const Counter = () => {
  return (
    <section>
        <div className="tu-statsholder">
            <div className="container">
                <ul id="tu-counter" className="tu-stats">
                    <li>
                        <img src="images/stats/img-01.png" alt="img" />
                        <div className="tu-stats_info">
                            <h4><span data-from="0" data-to="560616" data-speed="8000" data-refresh-interval="50">560,616</span></h4>
                            <p>Courses available for verified and top tutors</p>
                        </div>
                    </li>
                    <li>
                        <img src="images/stats/img-02.png" alt="img" />
                        <div className="tu-stats_info">
                            <h4><span data-from="0" data-to="648482" data-speed="8000" data-refresh-interval="50">648,482</span></h4>
                            <p>Total tuition job posted on the platform till date</p>
                        </div>
                    </li>
                    <li>
                        <img src="images/stats/img-03.png" alt="img" />
                        <div className="tu-stats_info">
                            <h4><span data-from="0" data-to="20" data-speed="8000" data-refresh-interval="50">20</span>+ Hours</h4>
                            <p>User daily average time spent on the platform</p>
                        </div>
                    </li>
                    <li>
                        <img src="images/stats/img-04.png" alt="img" />
                        <div className="tu-stats_info">
                            <h4><span data-from="0" data-to="7" data-speed="8000" data-refresh-interval="50">7</span>+ Million</h4>
                            <p>Active instructor and students available on the platform</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Counter