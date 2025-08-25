import Navbar from "./components/navbar";
import StickyMiniNavbar from "./components/StickyMiniNavbar";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <StickyMiniNavbar />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
