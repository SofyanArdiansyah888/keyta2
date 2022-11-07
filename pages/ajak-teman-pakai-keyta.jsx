import Layout from "../components/Layout/Layout";
import Image from "next/image";

export default function GabungKomunitas() {
  return (
    <>
      <div className="w-full relative h-screen  lg:h-[calc(100vh-4rem)]  overflow-hidden text-left pt-14 px-8 font-roboto">
        <h1 className="mt-8 text-3xl font-bold">
          Untung Bareng Temanmu Bersama Keyta!
        </h1>
        <h3 className="mt-4 text-sm  max-w-4xl">
          Ajak temanmu untuk <strong>install aplikasi Keyta </strong> dengan
          link referralmu yang tersedia. Dapatkan{" "}
          <strong>
            {" "}
            5000 Keyta Points{" "}
            <span className="underline"> (Baca Syarat & Ketentuan)</span>{" "}
          </strong>{" "}
          masing-masing untukmu dan temanmu.
        </h3>
        <button className="keyta-button mt-8">
          Bagikan Link Referral Kamu
        </button>

        
          <div className="absolute bottom-0 left-0 right-0 h-[400px]  w-full">
            <Image
              src="/images/keyta_group.svg"
              alt="Gambar Dashboard"
              layout="fill"
            />
          </div>
        
      </div>
    </>
  );
}

GabungKomunitas.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
