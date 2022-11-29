import { useContext } from "react";
import { SidebarContext } from "../../pages/_app";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
export default function ComingSoonLayout() {
  let {expand, setExpand} = useContext(SidebarContext);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={`w-full   ${expand? "lg:w-[calc(100%-255px)]" : "lg:w-[calc(100%-100px)]"} `}>
          <Navbar />
          <div className={`container mx-auto ${expand? "lg:w-[calc(100%-255px)]" : "lg:w-[calc(100%-100px)]"}`}>
            <div className="w-full text-center">
              <img
                className="mx-auto mt-12"
                src="/images/keyta.svg"
                alt="Logo keyta"
              />
              <h1 className="mt-8 text-2xl font-bold">
                Website Keyta Akan Segera Hadir!
              </h1>
              <h3 className="mt-2 text-md">
                Kami akan menghubungi Anda saat website Keyta siap digunakan.
              </h3>
              <h4 className="mt-8 text-sm">
                Pantau Instagram kami untuk informasi berikutnya!
              </h4>
              <div className=" mx-auto text-center">
                <a
                  href="https://www.instagram.com/keyta.id/"
                  target="blank"
                  className="z-50 "
                >
                  <img
                    className="mx-auto mt-4"
                    src="../images/instagram.svg"
                    alt="Instagram Image"
                  />
                </a>
              </div>
              <div className="absolute bottom-0 -z-50 ">
                <img
                  src="/images/dashboard_background.svg"
                  alt="Gambar Dashboard"
                  className="h-[300px]  w-screen  bg-center object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
