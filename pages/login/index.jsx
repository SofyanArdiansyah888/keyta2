/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import styles from "../../styles/Login.module.css";
import { COUNTRY_CODE } from "../../app/constant";

import { useRouter } from "next/router";
import InputPhone from "../../components/Shared/InputPhone";
const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
});

export default function Login() {
  const [isReset, setIsReset] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values,
  }= useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    alert(data)
    // router.push({
    //   pathname: "login/privacy-consent",
    //   query: { ...data },
    // });
  };

  return (
    <>
      <div id={styles.login}>
        {/* JUAL ONLINE SCREEN */}
        <MaskotScreen />

        {/* FORM SCREEN */}
        <div className={styles.right_content}>
          <div className={styles.right_content_inner}>
            <img src="../images/keyta.svg" alt="Logo" />
            <h1>Masukkan Nomor HP Anda</h1>
            <h6>Kode Verifikasi akan di kirimkan ke nomor Anda</h6>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mt-12 max-w-sm">
                <InputPhone
                  isReset={isReset}
                  setIsReset = {setIsReset}
                  register={register('phone')}
                  errors={errors}
                  reset={reset}
                />
                {/* <label className="font-[600] text-[14px] ">Nomor Telepon</label>
                <div className="relative w-max">
                  <span className="mr-2 text-[11px] bg-[#F1F2F5] rounded-[4px] h-16 w-32 p-1 border-[#CED2D9]">
                    +{COUNTRY_CODE}
                  </span>
                  <input
                    type="number"
                    {...register("phone")}
                    onChange={(event) => {
                      event.target.value === "" && setIsReset(false);
                      !isReset && setIsReset(true);
                    }}
                    className={`p-2 mt-4 text-xs w-[260px] lg:w-[300px]  ${
                      errors.phone?.message
                        ? "material-input-error"
                        : "material-input"
                    }`}
                    placeholder="Masukkan Nomor Telepon"
                  />
                  {isReset && (
                    <div
                      className="absolute top-6 right-2"
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
                  )}
                  {errors.phone?.message && (
                    <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
                      {errors.phone?.message}
                    </a>
                  )}
                </div> */}
              </div>

              <button type="submit" className="keyta-button mt-24">
                Registrasi / Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
