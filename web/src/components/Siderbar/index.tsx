// @ts-ignore
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";

import mapMarkerImg from "../../images/map-marker.svg";
import "./styles.css";
import { authLOGOUT } from "../../store/actions";
import { useDispatch } from "react-redux";

interface SiderbarProps {
  isAuthenticated?: boolean;
  dashboard?: boolean;
  pendingOrphanages?: boolean;
}

export default function Siderbar({
  isAuthenticated = false,
  dashboard = false,
  pendingOrphanages = false,
}: SiderbarProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(authLOGOUT());
  }
  return (
    <aside className="app-siderbar">
      <Link to="/">
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      {isAuthenticated ? (
        <>
          <div>
            <Link
              to="/"
              className={`tamLinkDashboard ${
                dashboard && "linkActiveDashboard"
              }`}
            >
              <HiOutlineLocationMarker
                color={`${dashboard ? "#0089A5" : "#ffff"}`}
                size={30}
              />
            </Link>
            <Link
              to="/"
              className={`tamLinkDashboard ${
                pendingOrphanages && "linkActiveDashboard"
              }`}
            >
              <FiAlertCircle
                color={`${pendingOrphanages ? "#0089A5" : "#ffff"}`}
                size={30}
              />
            </Link>
          </div>
          <footer>
            <button type="button" onClick={handleLogout}>
              <FaPowerOff size={24} color="#ffff" />
            </button>
          </footer>
        </>
      ) : (
        <footer>
          <button type="button" onClick={() => history.goBack()}>
            <FiArrowLeft size={24} color="#fff" />
          </button>
        </footer>
      )}
    </aside>
  );
}
