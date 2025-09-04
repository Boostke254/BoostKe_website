import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="terms_conditions">
      <Helmet>
        <title>Boost KE :: Terms and Conditions</title>
        <meta
          name="description"
          content="Review the terms and conditions for using Boost KE."
        />
        <meta
          name="keywords"
          content="Boost KE, terms, conditions, user agreement, marketplace"
        />
        <meta property="og:title" content="Boost KE :: Terms and Conditions" />
        <meta
          property="og:description"
          content="Review the terms and conditions for using Boost KE."
        />
        <meta property="og:url" content="https://boostke.co.ke/rules" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>
      <button
        onClick={handleGoBack}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <h1>
          <HomeIcon sx={{ fontSize: 30 }} />
          Boost KE
        </h1>
      </button>

      <Paper elevation={3}>
        <div className="terms">
          <h2>TERMS OF USE ACCEPTANCE OF THE TERMS</h2>
          These Terms of Use (the “Terms”) constitute a binding and enforceable
          legal contract between Boost KE, its affiliated companies (together,
          the “Administrator”, “we”, “us”) and you. Please read these Terms
          carefully.
          <br />
          Your access and use of the Boost.co.ke website and mobile
          applications, as well as any service, content, and data available via
          them (together, the “Service” or the “Platform”) are governed by these
          Terms.
          <br />
          If you do not agree with any part of these Terms, or if you are not
          eligible or authorized to be bound by the Terms, then do not access or
          use the Service.
          <br />
          Please also review our Privacy Policy. The terms of the Privacy Policy
          and other supplemental terms, rules, policies, or documents that may
          be posted on the Platform from time to time are hereby expressly
          incorporated herein by reference. We reserve the right, in our sole
          discretion, to make changes or modifications to these Terms at any
          time and for any reason with or without prior notice.
          <br />
          <br />
          <h3>Acceptance of Terms</h3>
          By accessing or using our website, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and Conditions. If
          you do not agree to these terms, please refrain from using our
          services. Your continued use of our website following any changes or
          modifications to these terms constitutes your acceptance of those
          changes.
          <br />
          <br />
          <h3>Scope of Services</h3>
          Our platform offers a variety of services tailored to meet the needs
          of our diverse user base. Whether you are a seller looking to
          advertise your products, a buyer searching for unique items, or an
          individual seeking your dream home, Boostke.co.ke is here to assist
          you every step of the way.
          <br />
          <br />
          <h3>User Responsibilities</h3>
          As a user of our platform, you are responsible for ensuring the
          accuracy of any information you provide and for complying with all
          applicable laws and regulations. You agree to use our website and
          services in a manner consistent with these terms and conditions and
          with any additional guidelines or policies provided by Boostke.co.ke.
          <br />
          <br />
          <p className="text-center">
            Thank you for choosing Boostke.co.ke! We look forward to serving you
            and providing you with an exceptional experience.
          </p>
          <h3>Definitions</h3>
          Company: Refers to your company name or legal entity operating the
          website.
          <br />
          Website: Refers to your company&apos;s website or any associated web
          pages, including mobile applications if applicable.
          <br />
          User or Users: Refers to anyone who accesses or uses the website.
          <br />
          Content: Refers to any text, images, videos, or other materials
          available on the website.
          <br />
          Intellectual Property: Refers to copyrights, trademarks, patents,
          trade secrets, and any other intellectual property rights owned or
          licensed by the company.
          <br />
          Privacy Policy: Refers to the document outlining how user data is
          collected, used, and protected by the company.
          <br />
          User Account: Refers to an account created by a user on the website,
          if applicable.
          <br />
          Transaction: Refers to any purchase, sale, or exchange of goods or
          services facilitated through the website.
          <br />
          Service: Refers to any products, services, or features provided by the
          company through the website.
          <br />
          Terms and Conditions: Refers to the agreement governing the use of the
          website and the relationship between the company and users.
          <br />
          Termination: Refers to the ending of the agreement between the company
          and a user, either by the user or the company.
          <br />
          Dispute Resolution: Refers to the process for resolving disputes
          between the company and users, such as arbitration or mediation.
          <br />
          Modification: Refers to any changes or updates made to the terms and
          conditions by the company.
          <br />
          Effective Date: Refers to the date when the terms and conditions come
          into effect.
          <br />
          Governing Law: Refers to the jurisdiction whose laws govern the terms
          and conditions and any disputes arising from them.
          <br />
          <br />
          <h3>User Agreement for Boostke.co.ke</h3>This User Agreement
          (&apos;Agreement&apos;) is a legal agreement between you
          (&apos;User&apos; or &apos;you&apos;) and Boostke.co.ke
          (&apos;Boostke&apos; or &apos;we&apos; or &apos;our&apos;), governing
          your use of the Boostke.co.ke website and any related services offered
          by Boostke. By accessing or using the Boostke.co.ke website or any of
          its services, you agree to be bound by the terms and conditions of
          this Agreement. If you do not agree with any part of this Agreement,
          you may not use the website or its services.
          <br />
          <h3>Services Provided</h3>
          Advertisement Services: Boostke.co.ke allows users to post
          advertisements for various products and services.
          <br />
          Online Marketplace: Users can buy and sell new or used products
          through the Boostke.co.ke platform.
          <br />
          House Hunting Services: Boostke.co.ke provides tools and resources to
          help users find rental or sale properties.
          <br />
          <br />
          <h3>User Responsibilities</h3>
          Provide accurate and up-to-date information when creating an account
          or posting advertisements.
          <br />
          Comply with all applicable laws and regulations when using the website
          and its services.
          <br />
          Respect the intellectual property rights of others and not infringe
          upon copyrights, trademarks, or other proprietary rights.
          <br />
          <br />
          <h3>Prohibited Activities</h3>
          Posting illegal, deceptive, or fraudulent content.
          <br />
          Engaging in any form of spamming, phishing, or other unauthorized
          solicitation.
          <br />
          Violating the privacy rights of others or collecting personal
          information without consent.
          <br />
          Interfering with the operation of the website or attempting to gain
          unauthorized access to any part of the website or its systems.
          <br />
          <br />
          <h3>Advertisement Guidelines</h3>
          Provide accurate descriptions and images of the products or services
          being advertised.
          <br />
          Comply with all applicable laws and regulations regarding the sale and
          promotion of goods and services.
          <br />
          Not post advertisements for prohibited items, including but not
          limited to illegal drugs, weapons, or counterfeit goods.
          <br />
          <br />
          <h3>Dispute Resolution</h3>
          Any disputes arising from your use of Boostke.co.ke shall be resolved
          in accordance with the laws of Kenya. You agree to attempt to resolve
          any disputes with Boostke.co.ke amicably before pursuing legal action.
          <br />
          <h3>Limitation of Liability</h3>
          Boostke.co.ke shall not be liable for any damages, losses, or
          liabilities arising from your use of the website or its services,
          including but not limited to direct, indirect, incidental, or
          consequential damages.
          <br />
          <h3>Modification of Terms</h3>
          Boostke.co.ke reserves the right to modify or update this Agreement at
          any time without prior notice. Any changes to the Agreement will be
          effective immediately upon posting on the website. It is your
          responsibility to review the Agreement periodically for updates.
          <br />
          <h3>Termination</h3>
          Boostke.co.ke reserves the right to terminate or suspend your access
          to the website and its services at any time for any reason without
          prior notice.
          <br />
        </div>
      </Paper>
    </div>
  );
};

export default TermsAndConditions;
