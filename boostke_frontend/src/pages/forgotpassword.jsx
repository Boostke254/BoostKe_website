import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "../css/fp.css";
// import back from '../images/fp_back.svg';
import Back from "@mui/icons-material/ArrowBack";
import hero from "../images/fp_hero.svg";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Forgotpassword() {
  const [alignment, setAlignment] = useState("email");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //toggle
  const navigate = useNavigate();
  const handleEmail = () => {
    navigate("/forgotpassword/");
  };

  const handlePhone = () => {
    navigate("/forgotpassword/number/");
  };

  return (
    <div className="fp_body">
      <Helmet>
        <title>Reset forgotten password - Boost KE </title>
        <meta
          name="description"
          content="Forgot password? Reset your password"
        />
      </Helmet>
      <div className="back">
        {/* <NavLink to='/login'><img src={ back }/></NavLink> */}
        <NavLink to="/login">
          <Back sx={{ fontSize: 20 }} /> Forgot password
        </NavLink>
      </div>
      <div className="fp_outlet">
        <div className="flex items-center justify-center h-[60vh] md:h-auto">
          <img
            src={hero}
            alt="forgot_password_png"
            className="h-full object-cover"
          />
        </div>
        <div className="toggle_group">
          <p>Toggle to change recovery option:</p>
          <ToggleButtonGroup
            color="warning"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="recovery_option"
          >
            <ToggleButton value="email" onClick={handleEmail}>
              Email recovery
            </ToggleButton>
            <ToggleButton value="number" onClick={handlePhone}>
              phone number
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Forgotpassword;
