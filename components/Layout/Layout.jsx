import { Children } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({children}) {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="container mx-auto lg:ml-[255px]">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}
