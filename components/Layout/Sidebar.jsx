import styles from "../../styles/Sidebar.module.css";
export default function Sidebar() {
  return (
    <>
      <div className="fixed shadow-xl h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 px-4">
          <div className="overflow-y-auto py-4 px-3 gray-50">
            {/* KEYTA LOGO */}
            <a
              href="/public/images/keyta.svg"
              className="flex items-center  mb-5"
            >
              <object data="/icons/hamburger.svg" width="20" height="20" />
              <img
                src="/images/keyta.svg"
                className="ml-[30px] h-6 sm:h-7"
                alt="Flowbite Logo"
              />
            </a>

            {/* MENU */}
            <div className="mt-14">
              <h1 className={styles.header}>Menu</h1>
              <ul>
                <li className={styles.list}>
                  <a>
                    <object
                      data="/icons/dashboard_icon.svg"
                      width="20"
                      height="20"
                    />
                    <span class="ml-3">Dashboard</span>
                  </a>
                </li>

                <li className={styles.list}>
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
                </li>

                <li className={styles.list}>
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
                </li>

                <li className={styles.list}>
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
                </li>

                <li className={styles.list}>
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
                </li>
              </ul>
            </div>

            {/* BANTUAN */}
            <div className="mt-6">
              <h1 className={styles.header}>Bantuan</h1>
              <ul>
                <li className={styles.list}>
                  <a>
                    <object data="/icons/faq.svg" width="20" height="20" />
                    <span>FAQ</span>
                  </a>
                </li>

                <li className={styles.list}>
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
                </li>

                <li className={styles.list}>
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
                </li>

                <li className={styles.list}>
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
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
