import React from "react";
import Banner from "../components/Banner/Banner";
import { Outlet } from "react-router-dom";

export default function BannerLayout() {
  return (
    <div>
      <Banner />
      <Outlet />
    </div>
  );
}
