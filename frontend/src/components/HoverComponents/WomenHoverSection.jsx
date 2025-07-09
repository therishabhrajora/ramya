import { Link } from "react-router-dom";
import "../../index.css";
import "../../styles/hoverComponents/hoverSection.css";


function WomenHoverSection() {
  return (
    <div className="womenHoverSection">
       <div className="categories">
                <ul>
                    <li className="head">All Mens</li>
                    <li><Link className="Link">Stethoscope</Link></li>
                    <li><Link className="Link">Gifting</Link></li>
                    <li><Link className="Link">Multi Packs</Link></li>
                    <li>Last Chance</li>
                    <li><Link className="Link">Plus Size</Link></li>
                    <li><Link className="Link">New Arrivals</Link></li>
                </ul>
            </div>
            <div className="scrubs-fabric">
                <ul>
                    <li className="head">Scrubs</li>
                    <li><Link className="Link">active v neck</Link></li>
                    <li><Link className="Link">mandarine collar</Link></li>
                    <li><Link className="Link">longsleeve scrubs</Link></li>
                    <li><Link className="Link">shop all scrubs</Link></li>
                </ul>
                <ul>
                    <li className="head">Shop by fabric</li>
                    <li><Link className="Link">classic srubs</Link></li>
                </ul>
            </div>
            <div className="labCoat-pocket">
                <ul>
                    <li className="head">Lab Coat approns</li>
                    <li><Link className="Link">chief</Link></li>
                    <li><Link className="Link">focus</Link></li>
                    <li><Link className="Link">everyday</Link></li>
                    <li><Link className="Link">shop all scrubs</Link></li>
                </ul>
                <ul>
                    <li className="head">pockets</li>
                    <li><Link className="Link">5 pokcets</Link></li>
                    <li><Link className="Link">8 pokcets</Link></li>
                    <li><Link className="Link">10 pokcets</Link></li>
                </ul>
            </div>
            <div className="assessories-apparel">
                <ul>
                    <li className="head">Assessories</li>
                    <li><Link className="Link">scrub cap</Link></li>
                    <li><Link className="Link">stethoscope</Link></li>
                    <li><Link className="Link">Notebook</Link></li>
                    
                </ul>
                <ul>
                    <li className="head">Apparel</li>
                    <li><Link className="Link">Undersrubs</Link></li>
                    <li><Link className="Link">T-shirts</Link></li>
                </ul>
            </div>
            <div className="shopByColor">
                <ul className="section1">
                    <li className="head">shop by color</li>
                    <li><Link className="Link">navy</Link></li>
                    <li><Link className="Link">black</Link></li>
                    <li><Link className="Link">wine </Link></li>
                    <li><Link className="Link">forest green</Link></li>
                    <li><Link className="Link">heather grey</Link></li>
                    <li><Link className="Link">olive</Link></li>
                    <li><Link className="Link">charcoal</Link></li>
                </ul>
                <ul className="section2">
                    <li><Link className="Link">ciel blue</Link></li>
                    <li><Link className="Link">maroon</Link></li>
                    <li><Link className="Link">steel grey</Link></li>
                    <li><Link className="Link">rust</Link></li>
                </ul>
            </div>
    </div>
  );
}

export default WomenHoverSection;
