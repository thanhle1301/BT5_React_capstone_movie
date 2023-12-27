import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="space-y-5">
      <Banner />
      <ListMovie />
      <TabMovie />
      <Footer />
    </div>
  );
}
