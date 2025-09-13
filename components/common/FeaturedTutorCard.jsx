import Link from "next/link";
import Image from "next/image";
import { img_url } from "@/app/utils";
import { formatDate } from "../common";

const FeaturedTutorCard = ({item, index}) => {
    return (
        <div className="tu-featureitem" key={item.id || index}>
        <figure>
            <Link href={`/tutors/${item.tutor_id || ''}`}>
                <Image
                    width={200}
                    height={200}
                    src={item.profile_pic_url ? img_url + item.profile_pic_url : "/images/index/qualified/img-01.jpg"}
                    alt={item.name || "Tutor"}
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                />
            </Link>
            <span className="tu-featuretag">FEATURED</span>
        </figure>
        <div className="tu-authorinfo">
            <div className="tu-authordetail">
                <figure>
                    <Image
                        width={50}
                        height={50}
                        src={item.profile_pic_url ? img_url + item.profile_pic_url : "/images/index/professionol/img-01.jpg"}
                        alt={item.name || "Tutor"}
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                </figure>
                <div className="tu-authorname">
                    <h5>
                        <Link href={`/tutors/${item.tutor_id || ''}`}>{item.name}</Link>
                        <i className="icon icon-check-circle tu-greenclr" />
                    </h5>
                    <span>{item.city}, {item.state}</span>
                </div>
                {item.profile_tag_line && (
                    <div style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "8px",
                        fontStyle: "italic",
                        lineHeight: "1.4"
                    }}>
                        "{item.profile_tag_line}"
                    </div>
                )}
                {item.skill_names && (
                    <div style={{ marginTop: "8px" }}>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px"
                        }}>
                            {item.skill_names.split(',').slice(0, 2).map((skill, idx) => (
                                <span key={idx} style={{
                                    background: "#f0f7ff",
                                    color: "#0066cc",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    fontSize: "11px",
                                    fontWeight: "500"
                                }}>
                                    {skill.trim()}
                                </span>
                            ))}
                            {item.skill_names.split(',').length > 2 && (
                                <span style={{
                                    background: "#f8f9fa",
                                    color: "#666",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    fontSize: "11px"
                                }}>
                                    +{item.skill_names.split(',').length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                <ul className="tu-authorlist">
                    <li><span>From<em>₹{item.fee_min || 'N/A'}/{item.fee_charged_for || 'hr'}</em></span></li>
                </ul>
            </div>
            <div className="tu-instructors_footer" style={{padding: '5px 15px' }}>
                <div style={{ fontSize: "12px", color: "#999" ,  paddingTop: '6px' }}>
                    Member since 
                    <span style={{fontWeight: "bold", display: "block", lineHeight: '5px'}}>{formatDate(item.created_at)}</span>
                </div>
                <div className="tu-rating">
                    <Link href={`/tutors/${item.tutor_id || ''}`} className="view-profile-btn">
                        <span>View Profile</span>
                        <i className="icon icon-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
};

export default FeaturedTutorCard;