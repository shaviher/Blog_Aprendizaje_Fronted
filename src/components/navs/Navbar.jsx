import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/style.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    navigate(`/publications?category=${category}`);
  };

  const handleCourseChange = (course) => {
    navigate(`/publications?course=${course}`);
  };

  const handleGeneralNavigation = () => {
    navigate(`/publications`);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-nav">
            <div className="nav-button dropdown">
              <span>Filter by Category</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => handleCategoryChange('CODE')}>Code</li>
                  <li onClick={() => handleCategoryChange('INFOGRAPHIC')}>Infographic</li>
                  <li onClick={() => handleCategoryChange('CONCEPT MAP')}>Concept Map</li>
                  <li onClick={() => handleCategoryChange('MENTAL MAP')}>Mind Map</li>
                </ul>
              </div>
            </div>

            {/* Filter by Course */}
            <div className="nav-button dropdown">
              <span>Filter by Course</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => handleCourseChange('WORKSHOP')}>Workshop</li>
                  <li onClick={() => handleCourseChange('TECHNOLOGY')}>Technology</li>
                  <li onClick={() => handleCourseChange('SUPERVISED PRACTICE')}>Supervised Practice</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
