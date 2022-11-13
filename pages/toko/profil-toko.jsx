/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import { Option, Select } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Layout from "../../components/Layout/Layout";
import InputPhone from "../../components/Shared/InputPhone";
import InputSelect from "../../components/Shared/InputSelect";
import InputText from "../../components/Shared/InputText";
import SumberModal from "../../components/Shared/SumberModal";
import KategoriModal from "../../components/Shared/KategoriModal";
import {
  useShopQuery,
  useUpdateShopMutation,
} from "../../services/shop.service";
import { useDispatch } from "react-redux";
// import { setShop } from "../services/shop.slice";
const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),

  name: yup.string().required("Nama Pengguna harus diisi"),
});

export default function ProfilToko() {
  const [showSumberModal, setShowSumberModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data, isLoading, isSuccess } = useShopQuery();
  const [updateToko, updateData] = useUpdateShopMutation();
  const [isNameReset, setIsNameReset] = useState(false);
  const [isAdressReset, setIsAdressReset] = useState(false);
  const [isPhoneReset, setIsPhoneReset] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data)
    if (data && isSuccess) {
      
      // dispatch(setShop({ ...data.data }));
      setValue("name", data?.data?.name);
      setValue("address", data?.data?.address);
      setValue("phone", data?.data?.phone);
      setValue("category", data?.data?.category);
      
    }
    return () => {};
  }, [isSuccess]);

  return (
    <>
      {/* CONTENT */}
      <div className="w-full text-center p-8 font-roboto">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4 text-left max-w-md">
            <div className="flex justify-between">
              {/* PHOTO PROFIL */}
              <div className="rounded-full mx-auto w-[160px] bg-gray-200 text-center pt-10">
                <Image
                  src="/icons/photo.svg"
                  alt="Info"
                  height={70}
                  width={70}
                />
              </div>

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
              <InputText
                errorMessage={errors?.name?.message}
                reset={reset}
                name="name"
                label="Nama Toko"
                register={register("name")}
                placeholder="Masukkan Nama Toko"
                isReset={isNameReset}
                setIsReset={setIsNameReset}
              />
            </div>

            {/* ALAMAT TOKO  */}
            <div>
              <InputText
                errorMessage={errors?.address?.message}
                reset={reset}
                name="address"
                label="Alamat Toko"
                register={register("address")}
                placeholder="Masukkan Alamat Toko"
                isReset={isAdressReset}
                setIsReset={setIsAdressReset}
              />
            </div>

            {/* NOMOR TELEPON  */}
            <div>
              <InputPhone
                isReset={isPhoneReset}
                setIsReset={setIsPhoneReset}
                register={register("phone")}
                errors={[]}
                reset={reset}
                disabled={false}
              />
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
            <div>
              <InputSelect
                name="category"
                label="Kategori Penjualan"
                register={register("category")}
                placeholder="Pilih Kategori Penjualan Anda"
                errorMessage={""}
              />
            </div>

            {/* DARIMANA ANDA MENGETAHUI KEYTA  */}
            <div>
              <InputSelect
                name="sumber"
                label="Dari Mana Anda Mengetahui Keyta?"
                register={register("sumber")}
                placeholder="Pilih Sumber Anda Mengetahui Keyta?"
                errorMessage={""}
                setModalOpen={setShowSumberModal}
              />
            </div>

            <div className=" mt-12">
              <button
                className="keyta-button w-full rounded-xl"
                onClick={() => setShowModal(true)}
              >
                Simpan
              </button>
            </div>
          </div>

          {/* FITUR PREMIUM AKTIF */}
          <div className="flex-1">
            <div className=" mx-auto max-w-sm">
              <h1 className="text-left text-xl mb-4 font-semibold">
                Fitur Premium Aktif
              </h1>
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
                      <button className="text-keytaDarkBlue w-full">
                        Upgrade
                      </button>
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
        showModal={showSumberModal}
        setShowModal={setShowSumberModal}
        handleButton={() => setShowModal(false)}
      />
      <KategoriModal
        header="Anda Belum Isi Data"
        message="Lengkapi Profil Toko Anda, agar Keyta bisa memberikan layanan terbaik untuk Anda."
        buttonText="Lanjut"
        showModal={showCategoryModal}
        setShowModal={setShowCategoryModal}
        handleButton={() => setShowModal(false)}
      />
    </>
  );
}

ProfilToko.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
