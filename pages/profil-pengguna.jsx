import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { COUNTRY_CODE } from "../app/constant";
import { useState } from "react";
import InputPhone from "../components/shared/InputPhone";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
});
export default function ProfilPengguna() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <div className="max-w-md mx-auto mt-12">
        {/* NAMA PENGGUNA  */}
        <div>
          <label className="font-[600] text-[14px] w-full ">
            Nama Pengguna
          </label>
          <div className="relative w-full ">
            <input
              type="number"
              //   {...register("phone")}
              //   onChange={(event) => {
              //     event.target.value === "" && setIsReset(false);
              //     !isReset && setIsReset(true);
              //   }}
              className={`p-2 mt-4 text-xs w-full material-input  `}
              placeholder="Masukkan Nama Pengguna"
            />
            {/* ${
                  errors.phone?.message
                    ? "material-input-error"
                    : "material-input"
                } */}
            <div
              className="absolute top-6 right-0"
              onClick={() => {
                reset({ phone: "" });
                setIsReset(false);
              }}
            >
              <Image
                src="/images/icon_close.svg"
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

        {/* NOMOR TELEPON  */}
        <div className="mt-4">
          <InputPhone
            isReset={isReset}
            setIsReset={setIsReset}
            register={register("phone")}
            errors={errors}
            reset={reset}
          />
        </div>

        <button
          className="keyta-button mt-14 rounded-xl w-full"
          onClick={() => setIsOpen(true)}
        >
          SIMPAN
        </button>
      </div>

      <>
        <div className="hidden justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-xl font-bold">Konfirmasi Keluar ?</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 pb-12 flex-auto">
                <p className=" text-slate-500 text-sm leading-relaxed">
                  Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin
                  membatalkan perubahan?
                </p>
              </div>
              {/*footer*/}
              <div className="flex flex-row gap-6 items-center  p-5">
                <button
                  className="flex-1 keyta-button bg-gray-100 rounded-lg"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Iya
                </button>
                <button
                  className="flex-1 keyta-button rounded-lg"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}

ProfilPengguna.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
