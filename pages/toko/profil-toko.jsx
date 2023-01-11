/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { noWhiteSpace, onlyAlphabet } from "../../app/utlis";
import Layout from "../../components/Layout/Layout";
import ConfirmModal from "../../components/Shared/ConfirmModal";
import InputPhone from "../../components/Shared/InputPhone";
import InputSelect from "../../components/Shared/InputSelect";
import InputText from "../../components/Shared/InputText";
import KategoriModal from "../../components/Shared/KategoriModal";
import Modal from "../../components/Shared/Modal";
import SumberModal from "../../components/Shared/SumberModal";
import { useProfileQuery } from "../../services/profile.service";
import { updateShop, useShopQuery } from "../../services/shop.service";
import { setUser } from "../../services/user.slice";
import { InputChangeContext } from "../_app";
// import { setShop } from "../services/shop.slice";

onlyAlphabet(yup);
noWhiteSpace(yup);
const schema = yup.object({
  // inv_phone: yup
  //   .number()
  //   .positive("Nomor Telepon tidak valid")
  //   .required("Nomor Telepon harus diisi")
  //   .typeError("Nomor Telepon tidak valid"),
  name: yup
    .string()
    .min(4, "Nama Toko minimal 4 karakter")
    .noWhiteSpace("Nama Toko Harus Diisi")
    // .onlyAlphabet("Nama Toko Hanya Boleh Dalam Alfabet")
    .required("Nama Toko harus diisi")
    .typeError("Nama Toko minimal 4 karakter"),
  inv_address: yup.string().nullable(true),
  subcategory: yup
    .string()
    .required("Subkategori harus diisi")
    .typeError("Subkategori harus diisi"),
  instalation_source: yup
    .string()
    .required("Sumber harus diisi")
    .typeError("Sumber harus diisi"),
  shop_image: yup.string().nullable(),
});

export default function ProfilToko() {
  // MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [showSumberModal, setShowSumberModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  // API STATE
  const { data, isFetching, isSuccess, refetch } = useShopQuery();
  const [isUpdate, setIsUpdate] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isNameReset, setIsNameReset] = useState(false);
  const [isAdressReset, setIsAdressReset] = useState(false);
  const [isPhoneReset, setIsPhoneReset] = useState(false);
  let { inputChange, setInputChange } = useContext(InputChangeContext);
  const router = useRouter();
  const [imageTokoPreview, setImageTokoPreview] = useState();

  const { refetch: refetchProfile } = useProfileQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    router.beforePopState(({ url }) => {
      setCookie("visitedlink", url);
      if (inputChange) {
        setIsLogout(true);
      } else return true;
    });
  }, [inputChange]);

  const watchAll = watch(['inv_address','inv_phone','instalation_source','category','name']);
  
  useEffect(() => {
    const {
      category,
      instalation_source,
      inv_address,
      inv_phone,
      name,
      shop_image,
    } = watchAll;
    let temp = data?.data;
    
    if (name !== temp?.name) {
      setInputChange(true);
    } else if (inv_address !== temp?.inv_address) {
      setInputChange(true);
    } else if (inv_phone !== temp?.inv_phone) {
      setInputChange(true);
    } else if(instalation_source !== temp?.instalation_source){
      setInputChange(true)
    } else if(category !== temp?.category){
      setInputChange(true)
    } else {
      setInputChange(false);
    }

    

   
  }, [watchAll]);

  useEffect(() => {
    if (data && isSuccess) {
      let temp = data?.data;
      setValue("name", temp?.name);
      setValue("inv_address", temp?.inv_address);
      let phone = temp?.inv_phone;
      if (phone) {
        if (phone[0] === "0") {
          phone = phone?.substring(1);
        }
      }

      setValue("inv_phone", phone);

      let temps = JSON.parse(temp?.category);
      let tempe = temps ? [...temps] : [];

      tempe = tempe.map((item) => item.subcategory);

      // setValue("subcategory", temps);
      setValue("subcategory", tempe.flat(1).join(", "));
      setValue("category", temp?.category);
      setValue("instalation_source", temp?.instalation_source);
      setImageTokoPreview(temp?.image_file_name);
      if (!(temp?.address || temp?.inv_phone || temp?.subcategory))
        setShowModal(true);
    }
    return () => {};
  }, [isFetching]);

  const handleUpdateToko = async (temp) => {
    const form = document.querySelector("form");
    const data = new FormData(form);
    data.set("category", temp.category);
    setIsUpdate(true);
    await updateShop(data);
    await refetch();
    await refetchProfile();

    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
    setIsUpdate(false);
  };

  return (
    <>
      {/* CONTENT */}
      <div className="w-full text-center p-8 font-roboto">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <form
            onSubmit={handleSubmit(handleUpdateToko)}
            encType="multipart/form-data"
          >
            <div className="flex-1 flex flex-col gap-4 text-left max-w-md relative">
              <div className="flex justify-between">
                {/* PHOTO PROFIL */}
                {imageTokoPreview ? (
                  <Image
                    src={imageTokoPreview ?? "/icons/photo.svg"}
                    alt="Info"
                    height={160}
                    width={160}
                    className="rounded-full"
                  />
                ) : (
                  <div className="rounded-full mx-auto  w-[160px] bg-gray-200 text-center pt-9">
                    <Image
                      src="/icons/photo.svg"
                      alt="Info"
                      height={90}
                      width={90}
                      className="rounded-full"
                    />
                  </div>
                )}

                <div>
                  <h2 className="font-semibold">Logo Toko</h2>
                  <p className="text-xs">Upload degan formar JPG, JPEG, PNG</p>
                  <div className="mt-24 text-[#023E8A] font-semibold">
                    <label for="files" className="btn cursor-pointer">
                      Ubah Logo
                    </label>
                    <input
                      id="files"
                      className="hidden"
                      type="file"
                      name="shop_image"
                      accept="image/png,image/jpg,image/jpeg"
                      {...register("shop_image")}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        // setValue("shop_image", file);
                        setImageTokoPreview(URL.createObjectURL(file));
                        setInputChange(true)
                      }}
                    />
                  </div>
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
                  setValue={setValue}
                />

              
              </div>

              {/* ALAMAT TOKO  */}
              <div>
                <InputText
                  errorMessage={errors?.inv_address?.message}
                  reset={reset}
                  name="inv_address"
                  label="Alamat Toko"
                  register={register("inv_address")}
                  placeholder="Masukkan Alamat Toko"
                  isReset={isAdressReset}
                  setIsReset={setIsAdressReset}
                  setValue={setValue}
                />
              </div>

              {/* NOMOR TELEPON  */}
              <div>
                <InputPhone
                  isReset={isPhoneReset}
                  setIsReset={setIsPhoneReset}
                  register={register("inv_phone")}
                  errors={errors}
                  reset={reset}
                  disabled={false}
                  setValue={setValue}
                  watch={watch}
                  setError={setError}
                  name="inv_phone"
                />
              </div>

              {/* YELLOW BOX  */}
              <div className="yellow-box flex  my-4 py-2 pr-12 pl-4">
                <span className="mr-4">
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
                  name="subcategory"
                  label="Kategori Penjualan"
                  register={register("subcategory")}
                  placeholder="Pilih Kategori Penjualan Anda"
                  errorMessage={errors?.subcategory?.message}
                  setModalOpen={setShowCategoryModal}
                />
              </div>

              {/* DARIMANA ANDA MENGETAHUI KEYTA  */}
              <div>
                <InputSelect
                  name="instalation_source"
                  label="Dari Mana Anda Mengetahui Keyta?"
                  register={register("instalation_source")}
                  placeholder="Pilih Sumber Anda Mengetahui Keyta?"
                  errorMessage={errors?.instalation_source?.message}
                  setModalOpen={setShowSumberModal}
                />
                <input type="hidden" {...register("category")} />
              </div>

              {updateSuccess && (
                <div
                  className="keyta-button rounded-xl w-12 text-xs opacity-80 mt-3 mx-auto cursor-pointer absolute bottom-16 left-0 right-0 m-auto"
                  onClick={() => setUpdateSuccess(false)}
                >
                  Berhasil disimpan
                </div>
              )}

              <button
                className="keyta-button mt-14 rounded-xl w-full relative"
                disabled={isUpdate}
              >
                Simpan
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    isUpdate ? "absolute left-4 top-[10px]" : "hidden"
                  }`}
                >
                  <path
                    opacity="0.5"
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* FITUR PREMIUM AKTIF */}
          {/* <div className="flex-1">
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
                      <button className="keyta-button rounded-lg opacity-80 cursor-default">
                        Perpanjang
                      </button>
                      <button className="text-keytaDarkBlue w-full opacity-80 cursor-default">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rouded-card pt-[30px] bg-gray-400 min-h-[100px] text- font-semibold ">
                Tidak Berlangganan
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <SumberModal
        showModal={showSumberModal}
        setShowModal={setShowSumberModal}
        setProfilValue={setValue}
        getValues={getValues}
      />
      <KategoriModal
        showModal={showCategoryModal}
        setShowModal={setShowCategoryModal}
        setProfilValue={setValue}
        getValues={getValues}
      />
      <Modal
        header="Anda Belum Isi Data"
        message="Lengkapi Profil Toko Anda, agar Keyta bisa memberikan layanan terbaik untuk Anda."
        setShowModal={setShowModal}
        showModal={showModal}
        buttonText="Lanjut"
        handleButton={() => setShowModal(false)}
      />
      <ConfirmModal
        header={"Konfirmasi Keluar?"}
        message={
          "Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin membatalkan perubahan?"
        }
        setShowModal={setIsLogout}
        showModal={isLogout}
        buttonText={""}
        handleConfirm={
          getCookie("inputpengguna")
            ? () => {
                router.push(getCookie("visitedlink"));
                setIsLogout(false);
                setCookie("inputpengguna", false);
              }
            : () => {
                router.push(getCookie("visitedlink"));
                setCookie("inputpengguna", false);
              }
        }
      />
    </>
  );
}

ProfilToko.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
