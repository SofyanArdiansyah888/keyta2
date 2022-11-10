/* eslint-disable @next/next/no-img-element */
import { Option, Select } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { COUNTRY_CODE } from "../../app/constant";
import Layout from "../../components/Layout/Layout";
import KategoriModal from "../../components/Shared/KategoriModal";
import Modal from "../../components/Shared/Modal";
import SumberModal from "../../components/Shared/SumberModal";
export default function ProfilToko() {
  const [showModal, setShowModal] = useState(false)
  let authenticate = useSelector((state) => state.authSlice?.authenticate);
  return (
    <>
      {/* CONTENT */}
      <div className="w-full text-center p-8 font-roboto">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4 text-left max-w-md">
            <div className="flex justify-end">
              <div>
                <h2 className="font-semibold">Logo Toko</h2>
                <p className="text-xs">Upload degan formar JPG, JPEG, PNG</p>
                <button className="mt-24 text-[#023E8A] font-semibold">
                  Ubah Logo
                </button>
              </div>
            </div>
            {/* NAMA TOKO  */}
            <div>
              <label className="font-[600] text-[14px] ">Nama Toko</label>
              <div className="relative ">
                <input
                  type="text"
                  //   {...register("nama_toko")}
                  //   onChange={(event) => {
                  //     event.target.value === "" && setIsReset(false);
                  //     !isReset && setIsReset(true);
                  //   }}
                  className={`p-2 text-xs w-full  material-input  `}
                  placeholder="Masukkan Nama Toko"
                />
                {/* ${
                  errors.nama_toko?.message
                    ? "material-input-error"
                    : "material-input"
                } */}
                <div
                  className="absolute top-2 right-0"
                  onClick={() => {
                    reset({ nama_toko: "" });
                    setIsReset(false);
                  }}
                >
                  <Image
                    src="/icons/icon_close.svg"
                    height="18"
                    width="18"
                    alt="Logo"
                  />
                </div>

                {/* {errors.nama_toko?.message && (
                      <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
                        {errors.nama_toko?.message}
                      </a>
                    )} */}
              </div>
            </div>

            {/* ALAMAT TOKO  */}
            <div>
              <label className="font-[600] text-[14px] ">Alamat Toko</label>
              <div className="relative  ">
                <input
                  type="text"
                  //   {...register("alamat_toko")}
                  //   onChange={(event) => {
                  //     event.target.value === "" && setIsReset(false);
                  //     !isReset && setIsReset(true);
                  //   }}
                  className={`p-2  text-xs w-full  material-input  `}
                  placeholder="Masukkan Alamat Toko"
                />
                {/* ${
                  errors.alamat_toko?.message
                    ? "material-input-error"
                    : "material-input"
                } */}
                <div
                  className="absolute top-2 right-0"
                  onClick={() => {
                    reset({ alamat_toko: "" });
                    setIsReset(false);
                  }}
                >
                  <Image
                    src="/icons/icon_close.svg"
                    height="18"
                    width="18"
                    alt="Logo"
                  />
                </div>

                {/* {errors.alamat_toko?.message && (
                      <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
                        {errors.alamat_toko?.message}
                      </a>
                    )} */}
              </div>
            </div>

            {/* NOMOR TELEPON  */}
            <div>
              <label className="font-[600] text-[14px] ">Nomor Telepon</label>
              <div className="relative  ">
                <span className="text-[11px] bg-[#F1F2F5] border-[#CED2D9] rounded-[4px]  absolute left-0 top-2 p-1  ">
                  +{COUNTRY_CODE}
                </span>
                <input
                  type="number"
                  //   {...register("phone")}
                  //   onChange={(event) => {
                  //     event.target.value === "" && setIsReset(false);
                  //     !isReset && setIsReset(true);
                  //   }}
                  className={`p-2  ml-8 text-xs w-[93%] material-input  `}
                  placeholder="Masukkan Nomor Telepon"
                />
                {/* ${
                  errors.phone?.message
                    ? "material-input-error"
                    : "material-input"
                } */}
                <div
                  className="absolute top-2 right-0"
                  onClick={() => {
                    reset({ phone: "" });
                    setIsReset(false);
                  }}
                >
                  <Image
                    src="/icons/icon_close.svg"
                    height="18"
                    width="18"
                    alt="Logo"
                  />
                </div>

                {/* {errors.phone?.message && (
                      <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
                        {errors.phone?.message}
                      </a>
                    )} */}
              </div>
            </div>

            {/* YELLOW BOX  */}
            <div className="yellow-box flex  my-4 py-2 pr-24 pl-4">
              <span className="mr-2">
                <Image
                  src="/icons/info.svg"
                  alt="Info"
                  height={30}
                  width={30}
                />
              </span>
              <div className="text-sm text-[#42454D]">
                Nomor Telepon Toko akan digunakan untuk fitur E-invoice dan
                Katalog Produk
              </div>
            </div>

            {/* DARIMANA ANDA MENGETAHUI KEYTA  */}
            <div className="material-select ">
              <Select
                variant="static"
                label="Kategori Penjualan"
                placeholder="Pilih kategori penjualan anda"
              >
                <Option>Iklan di facebook</Option>
                <Option>Twitter</Option>
                <Option>Instagram</Option>
              </Select>
            </div>

            {/* DARIMANA ANDA MENGETAHUI KEYTA  */}
            <div className="material-select ">
              <Select variant="static" label="Darimana Anda Mengetahui Keyta ?">
                <Option>Iklan di facebook</Option>
                <Option>Twitter</Option>
                <Option>Instagram</Option>
              </Select>
            </div>

            <div className=" mt-12">
              <button className="keyta-button w-full rounded-xl" onClick={() => setShowModal(true)}>Simpan</button>
            </div>
          </div>

          {/* FITUR PREMIUM AKTIF */}
          <div className="flex-1">
            <div className=" mx-auto max-w-sm">
              <h1 className="text-left text-xl mb-4 font-semibold">Fitur Premium Aktif</h1>
              <div className="rouded-card px-4 pt-4 pb-6 ">
                <div className="relative">
                  <div className="absolute top-3">
                    <Image
                      src="/icons/info.svg"
                      alt="Info"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="text-left ml-12">
                    <h3>Katalog Produk</h3>
                    <h4>Berlaku sampai 3 feb 2021</h4>
                    <div className="flex gap-8 mt-4 text-center">
                      <button className="keyta-button rounded-lg">
                        Perpanjang
                      </button>
                      <button className="text-keytaDarkBlue w-full">Upgrade</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* TIDAK BERLANGGANAN */}
              {/* <div className="rouded-card pt-[30px] bg-gray-400 min-h-[100px] text- font-semibold ">
                Tidak Berlangganan
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <SumberModal
      header="Anda Belum Isi Data"
      message="Lengkapi Profil Toko Anda, agar Keyta bisa memberikan layanan terbaik untuk Anda."
      buttonText="Lanjut"
      showModal={showModal}
      setShowModal = {setShowModal}
      handleButton = {() => setShowModal(false)}
      />
    </>
  );
}

ProfilToko.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
