import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import GroupPersonIcon from "../../public/icons/group_person.svg";
import GroupPersonIcon2 from "../../public/icons/group_person2.svg";
import LogoutIcon from "../../public/icons/logout.svg";
import TokoIcon from "../../public/icons/Icon_store.svg";
import PersonIcon from "../../public/icons/Icon_user.svg";
import RightIcon from "../../public/icons/right_icon.svg";
import ConfirmModal from "../Shared/ConfirmModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter()
  const { pathname } = useRouter();

  const getMenuName = () => {
    const result = pathname.split("/");
    if (result.length > 0) {
      return result[result.length - 1].replace(/-/g, " ");
    }
    return "Dashboard";
  };

  const isActive = (menuName) => {
    return pathname === menuName ? "text-keytaSecondary" : "";
  };

  const handleLogout = () => {
    router.push('/login')
  }
  return (
    <>
      <nav className="pl-8 flex flex-row items-center justify-evenly bg-white  w-full h-16  m-0  shadow-lg ">
        <div className=" container flex flex-wrap justify-between items-center mx-auto">
          {/* DASHBOARD NAME */}
          <span className="text-md lg:text-xl font-semibold capitalize ">
            {getMenuName()}
          </span>

          <div className=" relative  mr-8 lg:mr-24">
            {/* AVATAR ICON */}
            <div
              className="flex justify-center items-center space-x-4 cursor-pointer"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <Image
                  src="/images/keyta.svg"
                  height={40}
                  width={40}
                  alt="profil"
                />
              </div>
              <div className=" text-gray-900 text-md">
                <div className="cursor-pointer">Profil</div>
              </div>
              <RightIcon />
            </div>

            {/* FLOATING MENU */}
            {isMenuOpen && (
              <div
                id="profileMenu"
                className="absolute w-[270px] px-5 py-3 z-[9999] text-[#A1A9B3]  font-inter bg-white rounded-lg shadow border top-[53px] right-1"
              >
                {/* PROFILE NAME & AVATAR */}
                <Link href="/profil-pengguna">
                <div className="border-2 border-gray-300 flex gap-2 items-center py-3 px-2 rounded-lg">
                  <Image
                    src="/images/keyta.svg"
                    height={40}
                    width={40}
                    alt="profil"
                  />
                  <h2 className="font-semibold text-[13px]">Toko Sejahtera</h2>
                </div>
                </Link>

                <ul className="space-y-3 text-[13px]">
                  {/* PENGGUNA */}
                  <li className="font-medium">
                    <h6 className="my-5 text-xs">Profil</h6>
                    <Link href="/profil-pengguna">
                      <a
                        href="#"
                        className={`flex items-center ${isActive(
                          "/profil-pengguna"
                        )} mt-1 transform transition-colors duration-200 border-r-4 border-transparent hover:text-keytaSecondary`}
                      >
                        <div className="mr-5">
                          <PersonIcon />
                        </div>
                        Pengguna
                      </a>
                    </Link>
                  </li>

                  {/* TOKO */}
                  <li className="font-medium my-5">
                    <Link href="/toko/profil-toko">
                      <a
                        href="#"
                        className={`flex items-center my-6 transform ${isActive(
                          "/toko/profil-toko"
                        )} transition-colors duration-200 border-r-4 border-transparent hover:text-keytaSecondary`}
                      >
                        <div className="mr-5">
                          <TokoIcon />
                        </div>
                        Toko
                      </a>
                    </Link>
                  </li>

                  <hr className="dark:border-gray-700" />

                  {/* AJAK TEMAN */}
                  <li className="font-medium">
                    <h6 className="my-5 text-xs">Komunitas</h6>
                    <Link href="ajak-teman-pakai-keyta">
                      <a
                        href="#"
                        className={`flex items-center ${isActive(
                          "/ajak-teman-pakai-keyta"
                        )} mt-1 transform transition-colors duration-200 border-r-4 border-transparent hover:text-keytaSecondary`}
                      >
                        <div className="mr-5">
                          <GroupPersonIcon />
                        </div>
                        Ajak Temanmu Pakai Keyta
                      </a>
                    </Link>
                  </li>

                  {/* GABUNG KOMUNITAS */}
                  <li className="font-medium">
                    {/* <Link href="gabung-komunitas"> */}
                      <a
                        
                        className={`flex items-center ${isActive(
                          "/gabung-komunitas"
                        )} my-6 transform transition-colors duration-200 border-r-4 border-transparent hover:text-keytaSecondary`}
                      >
                        <div className="mr-5">
                          <GroupPersonIcon2 />
                        </div>
                        Gabung Komunitas
                      </a>
                    {/* </Link> */}
                  </li>

                  <hr className="dark:border-gray-700" />

                  {/* LOGOUT */}
                  <li className="font-medium">
                    <a
                      onClick={() => setIsLogout(true)}
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent text-red-600"
                    >
                      <div className="mr-3 text-red-600">
                        <LogoutIcon />
                      </div>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <ConfirmModal
       header = {"Konfirmasi Keluar?"}
       message = {"Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin membatalkan perubahan?"}
       setShowModal = {setIsLogout}
       showModal = {isLogout}
       buttonText = {""}
       handleConfirm = {handleLogout}
      />
    </>
  );
}
