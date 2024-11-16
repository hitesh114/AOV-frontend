import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
/* ********************************************************************************************************************** */
/* Search and filter */
const Formcontrol = ({ searchTerm, handleSearchChange, filterValue, handleFilterChange, data}) => {
  const navigate = useNavigate();
  const [filterData, setfilterData] = useState([]);
  useEffect(() => {
    if (filterValue === "All") {
      setfilterData(data);
    } else {
      const filteredData = data.filter(offer => offer.category === filterValue);
      setfilterData(filteredData);
    }
  }, [filterValue, data]);
  /* **************************************************************************************************************** */
  return (
    <div>
        <div className="container-fluid d-flex gap-5 my-1 ">
          
          {/* Search Table */}
            <input
              className="form-control me-2 d-flex w-50"
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search"
            />

          {/* Fliter Table */}
           <select
            className="btn btn-secondary dropdown-toggle mx-1 me-auto mb-2 mb-lg-0"
            value={filterValue}
            onChange={handleFilterChange}
            aria-expanded="false"
          >
            <option value="All">All</option>
          </select>
          
          {/* Create New Offer */}
          <button className="btn btn-primary" onClick={() => navigate("/create-offer")}>Create New Offers</button>
        </div>
    </div>
  );
};
export default Formcontrol;
