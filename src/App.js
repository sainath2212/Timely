import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const isAuthPage = location.pathname === '/auth';

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      {isAuthPage ? (
        <>
        <Auth />
        <ToastContainer/>
        </>
      ) : (
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currenMonth} />
          </div>
          <ToastContainer/>
        </div>
      )}
    </React.Fragment>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
