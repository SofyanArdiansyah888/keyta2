import Image from "next/image";

export default function PaymentCard() {
  return (
    <>
      <div className="h-auto shadow-lg flex flex-col gap-3  mt-4 border-[1px] bg-white border-gray-200 rounded-xl px-4 py-6">
        <div className="flex flex-row justify-between">
          <span className="text-[11px] text-gray-400">
            10 Feb 2021 09:50:57
          </span>
          <button className="bg-[#F5B22D] px-2 py-1 rounded-lg text-white w-[90px] text-[10px]">
            Pending
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-semibold">Amanda Tamini</div>
          <div className="flex flex-row gap-2 justify-between">
            <Image height={20} width={20} alt="Logo Whatsapp" src="/icons/whatsapp.svg" priority />
            <div className="text-sm">085211818888</div>
          </div>
        </div>
        <div className="flex text-[11px] text-gray-400">3 Produk</div>
        <div className="flex flex-row justify-between">
          <div className="font-semibold">Rp. 355.000</div>
          <div className="flex flex-row gap-4 justify-between">
            <Image width={75} height={25} alt="Logo Bank 1" src="/icons/grab.svg" priority />
            <Image width={75} height={25} alt="Logo Bank 2" src="/icons/bca.svg" priority />
          </div>
        </div>
      </div>
    </>
  );
}
