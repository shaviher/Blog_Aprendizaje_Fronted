import React from "react";
import Navbar from "../../components/navs/Navbar.jsx";
import DashboardPublications from "../../components/publications/DashboardPublications.jsx";
import '../../assets/style.css';

export const DashboardPPublicationPage = () => {
    return (
      <div className="dashboard-container">
        <Navbar />
        <main className="dashboard-content">
          <DashboardPublications />
        </main>
      </div>
    );
};
export default DashboardPPublicationPage;
