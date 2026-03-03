import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../navbar/Navbar';

export default function ProtectedRoute({ login }) {
  if (!login) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders child routes */}
    </>
  );
}