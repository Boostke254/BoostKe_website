import {
  Email,
  Phone,
  LocationOn,
  WhatsApp,
  Instagram,
  LinkedIn,
  Twitter,
  People,
  AccountCircle,
  Public,
  MonetizationOn,
} from "@mui/icons-material";

function Footer() {
  return (
    <footer
      aria-label="BoostKE footer section"
      itemScope
      itemType="http://schema.org/Organization"
      className="bg-gray-100 text-gray-800 text-sm"
    >
      <meta itemProp="name" content="BoostKE Infinity Limited" />
      <meta itemProp="url" content="https://boostke.co.ke" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="text-center sm:text-left text-xs flex flex-col gap-2">
          <h5 className="text-base font-semibold mb-2">BoostKE Infinity Ltd</h5>
          <hr className="mb-2 border-gray-400" />
          <p>Your Success, Our Priority</p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <LocationOn fontSize="small" />
            Meru University S.T. - Nchiru, Meru
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <Phone fontSize="small" />
            <a
              href="tel:+254708827471"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              +2547 0882 7471
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <Email fontSize="small" />
            <a
              href="mailto:info@boostke.co.ke"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              info@boostke.co.ke
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <a
              href="mailto:info@boostke.co.ke"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Join Us Today!
            </a>
          </p>
        </div>

        <div className="text-center sm:text-left text-xs flex flex-col gap-2">
          <h5 className="text-base font-semibold mb-2">QUICK LINKS</h5>
          <hr className="mb-2 border-gray-400" />
          <p>
            <a
              href="/contact"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Contact Us Form
            </a>
          </p>
          <p>
            <a
              href="https://retail.boostke.co.ke"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Sell on BoostKE
            </a>
          </p>
          <p>
            <a
              href="http://services.boostke.co.ke/"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Become a service provider
            </a>
          </p>
          <p>
            <a
              href="/rules"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Terms & conditions
            </a>
          </p>
          <p>
            <a
              href="/about"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              About Us
            </a>
          </p>
        </div>

        <div className="text-center sm:text-left text-xs flex flex-col gap-2">
          <h5 className="text-base font-semibold mb-2">CONTACT US</h5>
          <hr className="mb-2 border-gray-400" />
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <WhatsApp fontSize="small" />
            <a
              href="https://wa.link/zzlppw"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              WhatsApp
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <Instagram fontSize="small" />
            <a
              href="https://www.instagram.com/boostke254"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Instagram
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <LinkedIn fontSize="small" />
            <a
              href="https://www.linkedin.com/company/boostke"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <Twitter fontSize="small" />
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Twitter
            </a>
          </p>
        </div>

        <div className="text-center sm:text-left text-xs flex flex-col gap-2">
          <h5 className="text-base font-semibold mb-2">OUR TEAM</h5>
          <hr className="mb-2 border-gray-400" />
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <MonetizationOn fontSize="small" />
            <a
              href="mailto:info@boostke.co.ke?subject=Finance Team Inquiry"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Finance
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <AccountCircle fontSize="small" />
            <a
              href="https://ngangafrancis.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Developer
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <Public fontSize="small" />
            <a
              href="mailto:info@boostke.co.ke?subject=Marketing Team Inquiry"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Marketing & PR
            </a>
          </p>
          <p className="flex justify-center sm:justify-start items-center gap-1">
            <People fontSize="small" />
            <a
              href="mailto:meshack.ayaga@boostke.co.ke?subject=Operations Inquiry"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              Director
            </a>
          </p>
        </div>
      </div>

      <form className="text-center py-4">
        <h6 className="text-sm font-semibold">Stay updated!</h6>
        <p className="text-xs">
          Get offers and updates directly to your inbox.
        </p>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="border px-2 py-1 rounded mt-2 text-xs"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white text-xs px-3 py-1 rounded ml-2 cursor-pointer"
        >
          Subscribe
        </button>
      </form>

      <div className="bg-gray-200 text-center py-3 text-[10px]">
        <p>
          Copyright &copy; {new Date().getFullYear()} Boost KE | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
