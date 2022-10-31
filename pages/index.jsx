/* eslint-disable @next/next/no-img-element */
import Navbar from '../components/Landing/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
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
              <a href="#">
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

