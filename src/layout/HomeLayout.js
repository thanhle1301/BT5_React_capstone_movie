import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
