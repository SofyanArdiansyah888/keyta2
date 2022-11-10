import { createContext } from "react";
import { useState } from "react";
import { Children } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full lg:w-[calc(100%-255px)]">
          <Navbar />
          <div className="container mx-auto lg:ml-[255px]">{children}</div>
        </div>
      </div>
    </>
  );
}
