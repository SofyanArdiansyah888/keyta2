import Image from "next/image";
import styles from "../../styles/Sidebar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SidebarContext } from "../../pages/_app";
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

export default function Sidebar() {
  const { pathname } = useRouter();
  let {expand, setExpand} = useContext(SidebarContext);
  
  const isActive = (condition) => {
    // return pathname === condition ? styles.activeList : "";
  };

  return (
    <>
      <div className="hidden lg:flex fixed shadow-xl h-screen bg-white">
        {/* SIDEBAR */}
        <aside className={`${expand ? "w-64 px-4" : "w-[100px] px-4"} `}>
          <div className="overflow-y-auto py-4 px-3 ">
            {/* KEYTA LOGO */}
            <Link href="/home">
              <a
                href="/public/images/keyta.svg"
                className="flex items-center  mb-5 "
              >
                <div
                  onClick={() => {
                    setExpand((expand) => !expand);
                  }}
                >
                  <Hamburger data="/icons/hamburger.svg" width="20" height="20" />
                </div>

                {expand && <div
                  className={`ml-[30px] h-6 sm:h-7 relative`}
                >
                  <Image
                    src="/images/keyta.svg"
                    alt="Logo Keyta"
                    height={30}
                    width={117}
                  />
                </div>}
              </a>
            </Link>

            {/* MENU */}
            <div className="mt-14">
              <h1 className={`${expand ? styles.header : styles.headerThin } `}>Menu</h1>
              <ul className="">
                {/* DASHBOARD ICON */}
                <li className={`${!expand ? "ml-0" : ""}  ${styles.list} ${isActive("/home")} `}>
                  {/* <Link href="/"> */}
                  <a className="mx-auto">
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
                  <a className="cursor-default">
                    <DaftarProdukIcon  />
                    {expand && <span>Daftar Produk</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/pesan-kurir")}`}>
                  {/* <Link href="/pesan-kurir"> */}
                  <a className="cursor-default">
                    <PesanKurirIcon />
                    {expand && <span>Pesan Kurir</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/keyta-saldo")}`}>
                  {/* <Link href="/keyta-saldo"> */}
                  <a className="cursor-default">
                    <KeytaSaldoIcon />
                    {expand && <span>Keyta Saldo</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/analitik-toko")}`}>
                  {/* <Link href="/analitik-toko"> */}
                  <a className="cursor-default">
                    <AnalitikTokoIcon />
                    {expand && <span>Analitik Toko</span>}
                  </a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>

            {/* BANTUAN */}
            <div className="mt-6">
              <h1 className={`${expand ? styles.header : styles.headerThin } `}>Bantuan</h1>
              <ul>
                <li className={`${styles.list} ${isActive("/faq")}`}>
                  {/* <Link href="/faq"> */}
                  <a className="cursor-default">
                    <FaqIcon />
                    {expand && <span>Faq</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/syarat-ketentuan")}`}
                >
                  {/* <Link href="/syarat-ketentuan"> */}
                  <a className="cursor-default">
                    <SyaratIkon />
                    {expand && <span>Syarat Ketentuan</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/kebijakan-privasi")}`}
                >
                  {/* <Link href="/kebijakan-privasi"> */}
                  <a className="cursor-default">
                    <KebijakanIcon />
                    {expand && <span>Kebijakan Privasi</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li
                  className={`${styles.list} ${isActive("/kontak-jadwalin")}`}
                >
                  {/* <Link href="/kontak-jadwalin"> */}
                  <a className="cursor-default">
                    <JadwalinIcon />
                    {expand && <span>Kontak Jadwalin</span>}
                  </a>
                  {/* </Link> */}
                </li>

                <li className={`${styles.list} ${isActive("/video-tutorial")}`}>
                  {/* <Link href="/video-tutorial"> */}
                  <a className="cursor-default">
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
    </>
  );
}

// function DropDownMenu({ submenus }) {
//   console.log(submenus);
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
