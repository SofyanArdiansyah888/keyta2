/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import PaymentCard from "../components/Shared/PaymentCard";

export default function Toko() {
  const tabMenus = [
    "Expedisi",
    "Metode Pembayaran",
    "Cetak Label",
    "Tanggal",
    "Tanggal Pre Order",
    "Tanggal Payment Link",
    "Other Menu",
  ];
  return (
    <>
      {/* CONTENT */}
      <div className="w-full text-center">
        {/* TOPBAR  */}
        <div className=" flex flex-row gap-4 border-b-gray-200 border-b-[1px] px-8 py-4">
          {tabMenus.map((item) => (
            <>
              <div className="btn-outline-gray"> {item} </div>
            </>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8 font-roboto">
          {[1, 2, 3].map(() => (
            <>
              <div>
                {/* HEADER GRID */}
                <div className="flex flex-row justify-between">
                  <div>
                    Pending{" "}
                    <span className="rounded-full ml-2 px-3 py-1  bg-keytaSecondary  items-center justify-center font-semibold">
                      {" "}
                      4{" "}
                    </span>
                  </div>
                  <Image
                    height={20}
                    width={20}
                    alt="Gambar list"
                    src="/icons/vertical-list.svg"
                    priority
                  />
                </div>

                {[1, 2, 3, 4, 5].map(() => (
                  <>
                    <PaymentCard />
                  </>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

Toko.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
