import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../component/authentication/useCurrentUser";
import SideBar from "../component/dashboard/SideBar";

import DashboardMainContent from "../component/dashboard/DashboardMainContent";
import DashboardHeader from "../component/dashboard/DashboardHeader";
import AdminSignInInfoPopup from "../ui/AdminSignInInfoPopup";

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoading,
    user: {
      email_confirmed_at,
      last_sign_in_at,
      user_metadata: { isAdmin } = {},
    } = {},
  } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isAdmin) return navigate("/");
  }, [isAuthenticated, isAdmin, navigate, isLoading]);

  return (
    <div className="grid min-h-screen grid-cols-[18rem_1fr] overflow-hidden bg-dashboardBg font-primary">
      <SideBar />
      <div className=" relative bg-gray-100 dark:bg-dashboardBg2">
        <DashboardHeader />
        <DashboardMainContent isLoading={isLoading} />
        <AdminSignInInfoPopup
          lastSignIn={last_sign_in_at}
          emailConfirmDate={email_confirmed_at}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
