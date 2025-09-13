import { hiddenPhoneNumber, hiddenEmail } from '../common';
const Sidebar = ({tutoring_preferences, name, phone, email, can_do_assignment, total_exp_yrs, online_exp, total_online_exp_yrs}) => {
    //const tutoring_type_text = tutoring_preferences.split(",");
    const tutoring_type_text = tutoring_preferences;
    return (
        <aside className="tu-asidedetail">
            <div className="tu-asideinfo text-center">
                <h6>Hello! You can have my teaching services direct at</h6>
            </div>
            <ul className="tu-featureinclude">
                
                <li>
                    <span className="icon icon-home tu-colorgreen"> <i>At my place (home/institute)</i> </span>
                    {tutoring_type_text.includes("At my place (home/institute)") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle " style={{ color: "red" }}></em>}
                </li>
                <li>
                    <span className="icon icon-video tu-colororange"> <i>Online (using Zoom etc)</i> </span>
                    {tutoring_type_text.includes("Online (using Zoom etc)") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle" style={{ color: "red" }}></em>}
                </li>
                <li>
                    <span className="icon icon-map-pin tu-colorblue"> <i>Travel to tutor's place</i> </span>
                    {tutoring_type_text.includes("Travel to student") ? <em className="fa fa-check-circle tu-colorgreen"></em> :
                        <em className="fa fa-times-circle " style={{ color: "red" }}></em>}
                </li>
            </ul>
            <div className="tu-contactbox">
                <h6>Contact details</h6>
                <ul className="tu-listinfo">
                    {/* <li>
                        <span className="tu-bg-voilet"><i className="icon icon-user"></i></span>
                        <h6>{name}</h6>
                    </li> */}
                    <li>
                        <span className="tu-bg-maroon"><i className="icon icon-phone-call"></i></span>
                        <h6>{hiddenPhoneNumber(phone)}</h6>
                    </li>
                    <li>
                        <span className="tu-bg-maroon"><i className="icon icon-mail"></i></span>
                        <h6>{hiddenEmail(email)}</h6>
                    </li>


                    <li>
                        <span className="tu-bg-green"><i className="fab fa-whatsapp"></i></span>
                        <h6>{hiddenPhoneNumber(phone)}</h6>
                    </li>

                </ul>
            </div>
            
            {/* Experience & Assignment Section */}
            <div className="tu-experience-box" style={{
                background: "#f8f9fa",
                borderRadius: "12px",
                padding: "20px",
                margin: "20px 0",
                border: "1px solid #e9ecef"
            }}>
                <h6 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "15px",
                    textAlign: "center"
                }}>Experience & Services</h6>
                
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px solid #e9ecef"
                    }}>
                        <span style={{ fontSize: "14px", color: "#666" }}>Assignment Help:</span>
                        <span style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: can_do_assignment ? "#28a745" : "#dc3545"
                        }}>
                            {can_do_assignment ? "Available" : "Not Available"}
                           
                        </span>
                    </div>
                   
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px solid #e9ecef"
                    }}>
                        <span style={{ fontSize: "14px", color: "#666" }}>Total Experience:</span>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                            {total_exp_yrs ? `${total_exp_yrs} years` : "Not specified"}
                        </span>
                    </div>
                    
                    {online_exp === "yes" && total_online_exp_yrs && (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0"
                        }}>
                            <span style={{ fontSize: "14px", color: "#666" }}>Online Experience:</span>
                            <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                                {total_online_exp_yrs} years
                            </span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="tu-unlockfeature text-center">
                <h6>
                    Click the button below to buy a package & unlock the contact details
                </h6>
                <a href="/wallet" className="tu-primbtn tu-btngreen"><span>Unlock feature</span><i className="icon icon-lock"></i></a>
            </div>
        </aside>
    )
};

export default Sidebar;











