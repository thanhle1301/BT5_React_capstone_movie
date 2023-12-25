import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import BannerLayout from "./BannerLayout";

export default function HomeLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
