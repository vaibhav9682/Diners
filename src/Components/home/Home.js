import Navbar from "../navbar/Navbar";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import About from '../about/About';
import Work from '../work/Work';
import Testimonial from '../testimonial/Testimonials';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import { useRef } from "react"
import { Link } from "react-router-dom";

const Home = () => {

  const aboutRef = useRef();
  const contactRef = useRef();
  const testRef = useRef();
  const workRef = useRef();




  const scrollToRef = (refName) => {
    const ref = getRefByName(refName);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const getRefByName = (refName) => {
    switch (refName) {
      case "aboutRef":
        return aboutRef;
      case "workRef":
        return workRef;
      case "testRef":
        return testRef;
      case "contactRef":
        return contactRef;

      default:
        return null;
    }
  };




  return (
    <>
      <div className={`home-container `} >
        <Navbar scrollToRef={scrollToRef} />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Your Favourite Food Delivered Hot & Fresh
            </h1>
            <p className="primary-text">
              Healthy switcher chefs do all the prep work, like peeding, chopping
              & marinating, so you can cook a fresh food.
            </p>
            <Link to="/menu" className="secondary-button">
              Order Now <FiArrowRight />{" "}
            </Link>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={workRef}>
          <Work />
        </div>
        <div ref={testRef}>
          <Testimonial />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <Footer />

      </div>
    </>

  );
};

export default Home;
