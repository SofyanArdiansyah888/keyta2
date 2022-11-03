/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout/Layout";

export default function ComingSoon() {
  return (
    <>
          {/* CONTENT */}
          <div className="w-full text-center">
              <img className="mx-auto mt-12" src="/images/keyta.svg" alt="Logo keyta" />
              <h1 className="mt-8 text-2xl font-bold">Website Keyta Akan Segera Hadir!</h1>
              <h3 className="mt-2 text-md">Kami akan menghubungi Anda saat website Keyta siap digunakan.</h3>
              <h4 className="mt-8 tex-sm">Pantau Instagram kami untuk informasi berikutnya!</h4>
              <img className="mx-auto mt-4" src="../images/google-play.svg" alt="Google Play Image" />
              <div className="absolute bottom-0">
                <img
                  src="/images/dashboard_background.svg"
                  alt="Gambar Dashboard"
                  className="h-[300px]  w-screen"
                />
              </div>
            
          </div>
    </>
  );
}

ComingSoon.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
