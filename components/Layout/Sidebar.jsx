import styles from "../../styles/Sidebar.module.css";
import Image from "next/image";
// import { ReactComponent as DashboardIcon } from "../../public/icons/faq.svg";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Sidebar() {
  const { pathname } = useRouter();

  const isActive = (condition) => {
    // return pathname === condition ? styles.activeList : "";
  };
  return (
    <>
      <div className="hidden lg:flex fixed shadow-xl h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 px-4">
          <div className="overflow-y-auto py-4 px-3 gray-50">
            {/* KEYTA LOGO */}
            <a
              href="/public/images/keyta.svg"
              className="flex items-center  mb-5"
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
              <ul>
                <li className={`${styles.list} ${isActive("/dashboard")}`}>
                  <Link href="dashboard">
                    <a>
                    <object
                    
                    data="/icons/dashboard_icon.svg"
                    width="20"
                    height="20"
                    
                  />
                      <span className={`${"ml-3"} `}>Dashboard</span>
                    </a>
                  </Link>
                  {/* <a>
                    
                    <object
                    
                      data="/icons/dashboard_icon.svg"
                      width="20"
                      height="20"
                      
                    />
                    <span className={`${"ml-3"} `}>Dashboard</span>
                  </a> */}
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
                  <Link href="daftar-produk">
                    <a>
                      <object
                        data="/icons/daftar_produk.svg"
                        width="20"
                        height="20"
                      >
                        {" "}
                      </object>
                      <span class="ml-3">Daftar Produk</span>
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/pesan-kurir")}`}>
                  <Link href="pesan-kurir">
                    <a>
                      <object
                        data="/icons/pesan_kurir.svg"
                        width="20"
                        height="20"
                      >
                        {" "}
                      </object>
                      <span class="ml-3">Pesan Kurir</span>
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/keyta-saldo")}`}>
                  <Link href="keyta-saldo">
                    <a>
                      <object
                        data="/icons/keyta_saldo.svg"
                        width="20"
                        height="20"
                      >
                        {" "}
                      </object>
                      <span class="ml-3">Keyta Saldo</span>
                    </a>
                  </Link>
                </li>

                <li className={`${styles.list} ${isActive("/analitik-toko")}`}>
                  <Link href="analitik-toko">
                    <a>
                      <object
                        data="/icons/analitik_toko.svg"
                        width="20"
                        height="20"
                      >
                        {" "}
                      </object>
                      <span class="ml-3">Analitik Toko</span>
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
                  <Link href="faq">
                    <a>
                      <object data="/icons/faq.svg" width="20" height="20" />
                      <span>FAQ</span>
                    </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/syarat-ketentuan")}`}
                >
                  <Link href="syarat-ketentuan">
                  <a>
                    <object
                      data="/icons/syarat_ketentuan.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>
                    <span>Syarat & Ketentuan</span>
                  </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/kebijakan-privasi")}`}
                >
                  <Link href="kebijakan-privasi">
                  <a>
                    <object
                      data="/icons/kebijakan_privasi.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>
                    <span>Kebijakan Privasi</span>
                  </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/kontak-jadwalin")}`}
                >
                  <Link href="kontak-jadwalin">
                  <a>
                    <object
                      data="/icons/kontak_jadwalin.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>
                    <span>Kontak Jadwalin</span>
                  </a>
                  </Link>
                </li>

                <li
                  className={`${styles.list} ${isActive("/video-tutorial")}`}
                >
                  <Link href="video-tutorial">
                  <a>
                    <object
                      data="/icons/video_tutorial.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>
                    <span>Video Tutorial</span>
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
