import React from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";

export default function spinner() {
  let isLoading = useSelector((state) => state.spinnerReducer.isLoading);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RingLoader color="#36d7b7" size={150} speedMultiplier={1} />
    </div>
  ) : (
    <></>
  );
}
