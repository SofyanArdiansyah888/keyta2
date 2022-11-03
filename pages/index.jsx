/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import styles from '../styles/Navbar.module.css'
export default function Home() {
  return (
    <>
      <LandingNavbar />
      <section >
        <div className="container mx-auto px-8 mt-14">
          <div className="flex flex-col-reverse  lg:flex-row  md:px-[83px] mx-auto lg:gap-16 xl:gap-16">
            <div className="font-poppins mr-auto place-self-center">
              <h1 className="max-w-2xl mb-4 text-2xl  md:text-4xl font-extrabold tracking-tight leading-none">
                #JualanOnlineLebihPraktis
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-4 md:text-lg ">
                Rekap Transaksi penjualan mu, atur pengiriman dan balas chat pelanggan dalam 1 Aplikasi
              </p>
              <a target="blank" href="https://play.google.com/store/apps/details?id=com.keyta.keyboard">
                <img src="../images/google-play.svg" alt="Google Play Image" />
              </a>
            </div>

            {/* PHONE IMAGE */}
            <div className="flex lg:mt-0">
              <img src="../images/phone.svg" alt="Phone Image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


function LandingNavbar(){
  return (<>
        <nav className="px-4 lg:px-[83px]  py-2.5 rounded ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          {/* KEYTA LOGO  */}
          <a href="#" className="flex items-center">
            <img
              src="../images/keyta.svg"
              className="w-[117px] h-[30px]"
              alt="Keyta Logo"
            />
          </a>

          {/* BUTTON REGISTRASI */}
          <div className="flex md:order-2">
            <Link href="login" >
              <a className="keyta-button mr-2 lg:mr-0">
              Registrasi / Masuk
              </a>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex md:w-auto md:order-1 "
            id="navbar-cta"
          >
            <ul className={styles.keytaLandingUl}>
              {/* HOME */}
              <li>
                <a href="#">Home</a>
              </li>
              {/* FITUR */}
              <li>
                <a href="#">Fitur</a>
              </li>
              {/* PARTNER */}
              <li>
                <a href="#">Partner</a>
              </li>
              {/* TESTIMONI */}
              <li>
                <a href="#">Testimoni</a>
              </li>
              {/* KONTAK KAMI */}
              <li>
                <a href="#">Kontak Kami</a>
              </li>
              {/* KOMUNITAS */}
              <li>
                <a href="#">Komunitas</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
  </>)
}
