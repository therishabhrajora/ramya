import { IoIosCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import "../../index.css";
import "../../styles/homepage/footer.css";

function Footer() {
  return (
    <>
      <div className="contactUs baseBackgroundColor">
        <p>Our emails are like our scrubs. Focused on you!</p>
        <div className="contact-Us-Input-Container">
          <label htmlFor="email" className="contact-Us-Label">
            <input
              type="email"
              id="email"
              className="contact-Us-Input"
              placeholder="Enter Email Address"
            />
            <BsArrowRight color="rgb(197, 197, 197)" fontSize="x-large" />
          </label>
        </div>
      </div>
      <div className="footer baseBackgroundColor">
        <section>
          <li className="head">Company</li>
          <li>Brand Story</li>
          <li>Blogs</li>
          <li>SiteMap</li>
          <li>Community Story</li>
          <li>Our Store</li>
        </section>
        <section>
          <li className="head">Support</li>
          <li>FAQs</li>
          <li>Exchange and retuns</li>
          <li>Terms and conditions</li>
          <li>Privacy policy</li>
          <li>Warranty Registration</li>
        </section>
        <section>
          <li className="head">Quick Links</li>
          <li>Scrubs</li>
          <li>Ecoflex</li>
          <li>Stethoscope</li>
          <li>Lab coat Apron</li>
          <li>Gifting</li>
        </section>
        <section>
          <li className="head">Contact</li>
          <li>+91 8945617865 </li>
          <li>
            <span>
              <IoIosCall />
            </span>
            Mon-Sat(10am-6pm)
          </li>
          <li>
            <span>
              <FaWhatsapp />
            </span>
            Mon-Sun(8am-8pm)
          </li>
          <li></li>
        </section>
      </div>
    </>
  );
}

export default Footer;
