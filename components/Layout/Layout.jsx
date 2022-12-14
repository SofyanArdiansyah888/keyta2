import { useContext } from "react";
import { SidebarContext } from "../../pages/_app";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  let {expand, setExpand} = useContext(SidebarContext);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={`w-full  ${expand? "lg:w-[calc(100%-255px)]" : "lg:w-[calc(100%-100px)]"} `}>
          <Navbar />
          <div className={`mt-[100px] container  ${expand? "lg:w-[calc(100%-255px)]" : "lg:w-[calc(100%-100px)]"}
          ${expand? "lg:ml-[255px]" : "lg:ml-[100px]"}
          `}>{children}</div>
        </div>
      </div>
    </>
  );
}
