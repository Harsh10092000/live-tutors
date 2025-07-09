import { hiddenPhoneNumber, hiddenEmail } from '../common';
const Sidebar = ({tutoring_preferences, name, phone, email}) => {
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
            <div className="tu-unlockfeature text-center">
                <h6>
                    Click the button below to buy a package & unlock the contact details
                </h6>
                <a href="package.html" className="tu-primbtn tu-btngreen"><span>Unlock feature</span><i className="icon icon-lock"></i></a>
            </div>
        </aside>
    )
};

export default Sidebar;











