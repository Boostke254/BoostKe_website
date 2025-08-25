import { productCategories } from "../components/Categories";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/components.css";

const SearchBar = () => {
  //navbar
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Event handler for search input
  const handleSearch = (event) => {
    setValue(event.target.value);
  };

  // Event handler for category input
  const handleCat = (event) => {
    setCategory(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${value}`);
    setShowSearch(false); // Close the form after submission
  };

  // Toggle search form visibility
  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-orange-300 rounded-md hidden md:flex items-center justify-between min-w-2/5"
      >
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search item e.g 'Bag', 'Laptop'"
          className="text-xs w-4/5"
          required
        />
        <select
          id="dropdown"
          className="text-xs w-1/5"
          value={category}
          onChange={handleCat}
        >
          <option value="products">Products</option>
          <option value="services">Services</option>
          <option value="freelancers">Freelancers</option>
          <option value="innovators">Innovators</option>
          {/* {productCategories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))} */}
        </select>
        <button className="search_btn" type="submit">
          <SearchIcon />
        </button>
      </form>

      {showSearch && (
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            value={value}
            onChange={handleSearch}
            className="text-[10px] w-5/7"
            placeholder="Search product..."
            required
          />
          <select
            id="dropdown"
            className="text-[10px] w-2/7"
            value={category}
            onChange={handleCat}
          >
            <option value="products">Products</option>
            <option value="services">Services</option>
            <option value="freelancers">Freelancers</option>
            <option value="innovators">Innovators</option>
            {/* {productCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))} */}
          </select>
          <button className="search_btn" type="submit">
            <SearchIcon />
          </button>
        </form>
      )}

      <div className="search_icon" onClick={handleSearchIconClick}>
        <span>
          <SearchIcon color="warning" sx={{ fontSize: "16px" }} />
        </span>
      </div>
    </>
  );
};

export default SearchBar;
