/* eslint-disable @next/next/no-img-element */
import MaskotScreen from "../components/Login/MaskotScreen";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import PrivacyConsent from "../components/Login/PrivacyConsent";
import api from "../utils/api";
import OTP from "../components/Login/OTP";
import styles from "../styles/Login.module.css";
import RegistrationProfile from "../components/Login/RegistrationProfile";
import { COUNTRY_CODE } from "../utils/constant";
import Image from "next/image";

const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [isUserHasShop, setIsUserHasShop] = useState(false);
  const [isPrivacyRead, setIsPrivacyRead] = useState(false);
  const [isOTPVerify, setIsOTPVerify] = useState(false);
  const [authData, setAuthData] = useState();
  const [isReset, setIsReset] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      // setIsLogin(true)
      // setIsUserHasShop(false);
      // setIsPrivacyRead(true);
      // setIsOTPVerify(true);
      const result = await api.post("v2/sign_with_wa_number", {
        country_code: COUNTRY_CODE,
        ...data,
      });

  
      setIsLogin(true);
      // IF USER ALREADY REGISTERED
      if (result.data.user.shop_id) {
        setIsUserHasShop(true);
      }
      setAuthData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div id={styles.login}>
        {/* JUAL ONLINE SCREEN */}
        <MaskotScreen />

        {/* FORM SCREEN */}
        <div className={styles.right_content}>
          {!isLogin && (
            <div className={styles.right_content_inner}>
              <img src="../images/keyta.svg" alt="Logo" />
              <h1>Masukkan Nomor HP Anda</h1>
              <h6>Kode Verifikasi akan di kirimkan ke nomor Anda</h6>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control mt-12">
                  <label className="font-[600] text-[14px] ">
                    Nomor Telepon
                  </label>
                  <div className="relative w-max">
                    <span className="mr-2 text-[11px] bg-[#F1F2F5] rounded-[4px] h-16 w-32">
                      +{COUNTRY_CODE}
                    </span>
                    <input
                      type="number"
                      {...register("phone")}
                      onChange={(event) => {
                        event.target.value === "" && setIsReset(false)
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
                  </div>
                </div>

                <button type="submit" className="keyta-button mt-24">
                  Registrasi / Login
                </button>
              </form>
            </div>
          )}
          {isLogin && !isUserHasShop && !isPrivacyRead && (
            <PrivacyConsent
              isPrivacyRead={isPrivacyRead}
              setIsPrivacyRead={setIsPrivacyRead}
            />
          )}

          {isLogin && isUserHasShop && (
            <OTP
              authData={authData}
              setAuthData={setAuthData}
              setIsOTPVerify={setIsOTPVerify}
            />
          )}

          {isLogin && !isUserHasShop && isPrivacyRead && !isOTPVerify && (
            <OTP
              authData={authData}
              setAuthData={setAuthData}
              setIsOTPVerify={setIsOTPVerify}
            />
          )}
        
          {isOTPVerify && !isUserHasShop && (
            <RegistrationProfile {...authData} />
          )}
        </div>
      </div>
    </>
  );
}
