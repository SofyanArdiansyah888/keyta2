import Layout from "../components/Layout/Layout";
import PaymentCard from "../components/Shared/PaymentCard";

export default function Pengguna() {
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
      <div className=" mx-20 my-12 px-10 py-12  text-center rouded-card">
        <div className=" flex flex-row gap-12 mb-4">
          {[1, 2, 3, 4, 5].map(() => (
            <>
              <div className="relative rounded-2xl py-1 pl-4 pr-2 bg-[#FFF7E8] min-w-[120px] text-left">
                Pending{" "}
                <span className="rounded-full bg-keytaSecondary px-3 py-[3px] absolute right-0 top-0">
                  6
                </span>
              </div>
            </>
          ))}
        </div>
        {/* TABMENU */}
        <div className=" flex flex-row gap-4 border-b-gray-200 border-b-[1px]  py-4">
          {tabMenus.map((item) => (
            <>
              {" "}
              <div className="btn-outline-gray text-sm">{item}</div>
            </>
          ))}
        </div>
        <div>
          {[1, 2, 3, 4, 5].map(() => (
            <>
              <PaymentCard />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

Pengguna.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
