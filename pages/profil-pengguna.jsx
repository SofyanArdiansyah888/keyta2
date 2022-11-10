import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { COUNTRY_CODE } from "../app/constant";
import { useState } from "react";
import InputPhone from "../components/Shared/InputPhone";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

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
  // let authenticate = useSelector((state) => state.authSlice?.authenticate);
  // console.log(authenticate)
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
          Simpan
        </button>
      </div>


    </>
  );
}

ProfilPengguna.getLayout = function getLayout(page) {
  
  return <Layout>{page}</Layout>;
};
