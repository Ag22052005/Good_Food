import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export const Navlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};