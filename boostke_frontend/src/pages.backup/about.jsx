import "../css/about.css";
import { Helmet } from "react-helmet";
import logo from "../images/logo.png";
import mission from "../images/mission.png";
import { Divider } from "@mui/material";

function About() {
  return (
    <div className="about_us">
      <Helmet>
        <title>About Us | Boost KE</title>
        <meta
          name="description"
          content="Learn more about Boost KE, our mission, and the services we offer to make your life easier."
        />
        <meta
          name="keywords"
          content="Boost KE, about us, mission, services, Kenya marketplace, Boost Kenya, boostke"
        />
        <meta property="og:title" content="About Us | Boost KE" />
        <meta
          property="og:description"
          content="Learn more about Boost KE, our mission, and the services we offer to make your life easier."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:alt" content="BoostKE Logo" />
        <meta property="og:url" content="https://boostke.co.ke/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>
      <h1 className="text-center py-8 text-2xl md:text-6xl bg-gray-50 font-semibold text-gray-800">
        Learn About Us
      </h1>
      <Divider />
      <div className="banner flex items-center justify-center mt-10">
        <img src={logo} alt="boost_logo" />
      </div>
      <div className="about text-center">
        <p>
          Boot KE is a pioneering platform dedicated to simplifying the lives of
          our users by offering a comprehensive range ofservices.
        </p>
        <div className="mission">
          <div>
            <img src={mission} alt="Our Mission" />
          </div>
          <p>
            “To facilitate seamless connections between individuals seeking
            rental properties, buyers and sellers of new and used products, and
            advertisers looking to showcase their offerings”
          </p>
        </div>
        <p>
          At Boost KE, we pride ourselves on being a one-stop destination where
          users can fulfill their diverse needs effortlessly. Whether you are
          searching for your dream rental home, looking to buy or sell an item,
          or aiming to promote your merchandise effectively, Boost KE is your
          trusted partner every step of the way.
        </p>
        <p>
          <b>What Sets Us Apart:</b>
          <br />
          What truly sets us apart is our commitment to consolidating various
          services under one convenient platform. Unlike conventional approaches
          that require users to navigate multiple platforms for different needs.
          Boost KE offers unified solution, streamlining the entire process.
        </p>
        <p>
          With Boost KE, users experience unparalleled convenience, efficiency,
          and reliability, and reliability. Our user-friendly interface and
          robust features eempower individuals to achieve their objectives with
          ease, making us the preffered choice for all their housing, buying,
          selling, and advertising needs.
        </p>

        <ol className="text-start fs-5">
          <p>
            <b>Our Services:</b>
          </p>
          <li>House Hunting</li>
          <li>Business & Events Marketing</li>
          <li>Business Branding</li>
          <li>Mobile Shop Rentals</li>
          <li>Web & Graphics Design</li>
          <li>E-Commerce Platform</li>
        </ol>
        <div className="team">
          <h5></h5>
          <div></div>
        </div>
        <p>
          Join Boost KE today and discover the simplicity of finding everything
          you need, all in one place. Your journey to hassle-free shopping!
        </p>
      </div>
    </div>
  );
}

export default About;
