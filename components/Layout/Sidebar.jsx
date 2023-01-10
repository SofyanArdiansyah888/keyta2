import Image from "next/image";
import styles from "../../styles/Sidebar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { InputChangeContext, SidebarContext } from "../../pages/_app";
import AnalitikTokoIcon from "../../public/icons/analitik_toko.svg";
import DaftarProdukIcon from "../../public/icons/daftar_produk.svg";
import DashboardIcon from "../../public/icons/dashboard_icon.svg";
import FaqIcon from "../../public/icons/faq.svg";
import Hamburger from "../../public/icons/hamburger.svg";
import KebijakanIcon from "../../public/icons/kebijakan_privasi.svg";
import KeytaSaldoIcon from "../../public/icons/keyta_saldo.svg";
import JadwalinIcon from "../../public/icons/kontak_jadwalin.svg";
import PesanKurirIcon from "../../public/icons/pesan_kurir.svg";
import SyaratIkon from "../../public/icons/syarat_ketentuan.svg";
import VideoTutorialIcon from "../../public/icons/video_tutorial.svg";
import ConfirmModal from "../Shared/ConfirmModal";
import { profileApi } from "../../services/profile.service";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";
import { clearTokenCookie } from "../../app/cookies";
import { useDispatch } from "react-redux";
import {isMobile} from 'react-device-detect';

export default function Sidebar() {
  const { pathname } = useRouter();
  const router = useRouter();
  let { inputChange, setInputChange } = useContext(InputChangeContext);
  let { expand, setExpand } = useContext(SidebarContext);
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch()
  const isActive = (condition) => {
    // return pathname === condition ? styles.activeList : "";
  };


  return (
    <>
      <div className={`${isMobile && !expand ? 'hidden ' : 'z-40'} lg:flex fixed shadow-xl h-screen bg-white`}>
        {/* SIDEBAR */}
        <aside className={`${expand ? "w-56 lg:w-64 px-4" : "w-[100px] px-4"} `}>
          <div className="overflow-y-auto py-4 px-3 ">
            {/* KEYTA LOGO */}

            <div className="flex items-center  mb-5 ">
              <div
                onClick={() => {
                  setExpand((expand) => !expand);
                }}
                className="cursor-pointer "
              >
                <Hamburger data="/icons/hamburger.svg" width="20" height="20" />
              </div>
              {/* <Link href="/home"> */}
              <a
              className="cursor-pointer"
                onClick={() => {
                  if(getCookie('inputpengguna')){
                    setIsLogout(true);
                    setCookie("visitedlink", "/home");
                  }else{
                    router.push("/home");
                  }
                
                }}
              >
                {expand && (
                  <div className={`ml-[30px] h-6 sm:h-7 relative`}>
                    <Image
                      src="/images/keyta.svg"
                      alt="Logo Keyta"
                      height={30}
                      width={117}
                    />
                  </div>
                )}
              </a>
              {/* </Link> */}
            </div>

            {/* MENU */}
            <div className="mt-14">
              <h1 className={`${expand ? styles.header : styles.headerThin} `}>
                Menu
              </h1>
              <ul className="">
                {/* DASHBOARD ICON */}
                <li
                  className={`${!expand ? "ml-0" : ""}  ${
                    styles.list
                  } ${isActive("/home")} `}
                >
                  {/* <Link href="/"> */}
                  <a className={`${!expand ? "justify-center" : ""} `}>
                    <DashboardIcon />
                    {expand && <span>Home</span>}
                  </a>
                  {/* </Link> */}
                  {/* <DropDownMenu
                    submenus={[
                      {
                        name: "Template Pesan",
                        url: "",
                      },
                      {
                        name: "Metode Pembayaran",
                        url: "",
                      },
                      {
                        name: "Pengingat Transaksi",
                        url: "",
                      },
                      {
                        name: "Laporan Transaksi",
                        url: "",
                      },
                    ]}

                  /> */}
                </li>

                <li className={` ${styles.list} ${isActive("/daftar-produk")}`}>
                  {/* <Link href="/daftar-produk"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <DaftarProdukIcon />
                    {expand && <span>Daftar Produk</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/pesan-kurir")}`}>
                  {/* <Link href="/pesan-kurir"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <PesanKurirIcon />
                    {expand && <span>Pesan Kurir</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/keyta-saldo")}`}>
                  {/* <Link href="/keyta-saldo"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <KeytaSaldoIcon />
                    {expand && <span>Keyta Saldo</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/analitik-toko")}`}>
                  {/* <Link href="/analitik-toko"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <AnalitikTokoIcon />
                    {expand && <span>Analitik Toko</span>}
                  </a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>

            {/* BANTUAN */}
            <div className="mt-6">
              <h1 className={`${expand ? styles.header : styles.headerThin} `}>
                Bantuan
              </h1>
              <ul>
                <li className={`${styles.list} ${isActive("/faq")}`}>
                  {/* <Link href="/faq"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <FaqIcon />
                    {expand && <span>Faq</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/syarat-ketentuan")}`}
                >
                  {/* <Link href="/syarat-ketentuan"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <SyaratIkon />
                    {expand && <span>Syarat Ketentuan</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/kebijakan-privasi")}`}
                >
                  {/* <Link href="/kebijakan-privasi"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <KebijakanIcon />
                    {expand && <span>Kebijakan Privasi</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/kontak-jadwalin")}`}
                >
                  {/* <Link href="/kontak-jadwalin"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <JadwalinIcon />
                    {expand && <span>Kontak Jadwalin</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/video-tutorial")}`}>
                  {/* <Link href="/video-tutorial"> */}
                  <a
                    className={`${
                      !expand ? "justify-center" : ""
                    } cursor-default `}
                  >
                    <VideoTutorialIcon />
                    {expand && <span>Video Tutorial</span>}
                  </a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <ConfirmModal
        header={"Konfirmasi Keluar?"}
        message={
          "Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin membatalkan perubahan?"
        }
        setShowModal={setIsLogout}
        showModal={isLogout}
        buttonText={""}
        handleConfirm={(getCookie('inputpengguna')) ? () => {
          router.push(getCookie('visitedlink'))
          setIsLogout(false)
          setCookie('inputpengguna',false)
        } : ""}

      />
    </>
  );
}

// function DropDownMenu({ submenus }) {
//   return (
//     <>
//       <ul className={styles.dropdown}>
//         {submenus.map((item) => (
//           <>
//             <li className={styles.dropdownList}>{item.name}</li>
//           </>
//         ))}
//       </ul>
//     </>
//   );
// }
