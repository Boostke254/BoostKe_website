import boostke_logo from "../images/boost_logo.png";

const Error = () => {
  return (
    <main className="flex min-h-screen justify-center items-center bg-white px-4 py-2">
      <div className="text-center flex flex-col gap-4">
        <img
          src={boostke_logo}
          alt="Boostke Logo"
          className="mx-auto mb-4"
          style={{ height: "50px" }}
        />
        <p className="text-red-500 font-bold text-4xl">404</p>
        <h1 className="text-gray-900 font-bold text-5xl">Page not found</h1>
        <p className="text-gray-500 text-lg mt-3">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <a
            href="/"
            className="bg-amber-500 text-white px-6 py-2 font-semibold shadow-lg hover:bg-yellow-600 transition"
          >
            Go back Home
          </a>
          <a
            href="mailto:info@boostke.co.ke"
            className="text-amber-500 font-semibold text-lg hover:text-yellow-600 transition"
          >
            Contact support &rarr;
          </a>
        </div>
      </div>
    </main>
  );
};

export default Error;
