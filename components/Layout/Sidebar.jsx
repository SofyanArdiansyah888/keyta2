import styles from "../../styles/Sidebar.module.css";
import Image from "next/image";

import DashboardIcon from "../../public/icons/dashboard_icon.svg";
import DaftarProdukIcon from "../../public/icons/daftar_produk.svg";
import PesanKurirIcon from "../../public/icons/pesan_kurir.svg";
import KeytaSaldoIcon from "../../public/icons/keyta_saldo.svg";
import AnalitikTokoIcon from "../../public/icons/analitik_toko.svg";
import FaqIcon from "../../public/icons/faq.svg";
import SyaratIkon from "../../public/icons/syarat_ketentuan.svg";
import KebijakanIcon from "../../public/icons/kebijakan_privasi.svg";
import JadwalinIcon from "../../public/icons/kontak_jadwalin.svg";
import VideoTutorialIcon from "../../public/icons/video_tutorial.svg";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Sidebar() {
  const { pathname } = useRouter();

  const isActive = (condition) => {
    return pathname === condition ? styles.activeList : "";
  };
  return (
    <>
      <div className="hidden lg:flex fixed shadow-xl h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 px-4">
          <div className="overflow-y-auto py-4 px-3 gray-50 ">
            {/* KEYTA LOGO */}
            <a
              href="/public/images/keyta.svg"
              className="flex items-center  mb-5 "
            >
              <object data="/icons/hamburger.svg" width="20" height="20" />
              <div className="ml-[30px] h-6 sm:h-7 relative">
                <Image
                  src="/images/keyta.svg"
                  alt="Logo Keyta"
                  height={30}
                  width={117}
                />
              </div>
            </a>

            {/* MENU */}
            <div className="mt-14">
              <h1 className={styles.header}>Menu</h1>
              <ul className="">
                {/* DASHBOARD ICON */}
                <li className={`${styles.list} ${isActive("/dashboard")} `}>
                  <Link href="/dashboard">
                    <a>
                      <DashboardIcon />
                      Dashboard
                    </a>
                  </Link>
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
                  <Link href="/daftar-produk">
                    <a className="">
                      <DaftarProdukIcon className="mr-4" />
                      Daftar Produk
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/pesan-kurir")}`}>
                  <Link href="/pesan-kurir">
                    <a>
                      <PesanKurirIcon />
                      Pesan Kurir
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/keyta-saldo")}`}>
                  <Link href="/keyta-saldo">
                    <a>
                      <KeytaSaldoIcon />
                      Keyta Saldo
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/analitik-toko")}`}>
                  <Link href="/analitik-toko">
                    <a>
                      <AnalitikTokoIcon />
                      Analitik Toko
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* BANTUAN */}
            <div className="mt-6">
              <h1 className={styles.header}>Bantuan</h1>
              <ul>
                <li className={`${styles.list} ${isActive("/faq")}`}>
                  <Link href="/faq">
                    <a>
                      <FaqIcon />
                      Faq
                    </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/syarat-ketentuan")}`}
                >
                  <Link href="/syarat-ketentuan">
                    <a>
                      <SyaratIkon />
                      Syarat Ketentuan
                    </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/kebijakan-privasi")}`}
                >
                  <Link href="/kebijakan-privasi">
                    <a>
                      <KebijakanIcon />
                      Kebijakan Privasi
                    </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/kontak-jadwalin")}`}
                >
                  <Link href="/kontak-jadwalin">
                    <a>
                      <JadwalinIcon />
                      Kontak Jadwalin
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/video-tutorial")}`}>
                  <Link href="/video-tutorial">
                    <a>
                      <VideoTutorialIcon />
                      Video Tutorial
                    </a>
                  </Link>
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
