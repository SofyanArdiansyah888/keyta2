/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { checkPhoneExist } from "../../app/cookies";
import InputPhone from "../../components/Shared/InputPhone";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import styles from "../../styles/Login.module.css";
const schema = yup.object({
  phone: yup.string().required("Nomor Telepon harus diisi"),
  // .typeError("Nomor Telepon tidak valid"),
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
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    let phone = data.phone
    if(data.phone[0] !== "8") {setError('phone',{
      message:'Angka pertama harus 8'
    })
    return;
  }

    // IF PHONE NOT EXIST THEN MUST READ PRIVACY CONSENT FIRST
    if (checkPhoneExist(data.phone)) {
      router.push(`/login/otp?phone=${phone}`);
    } else {
      router.push({
        pathname: "login/privacy-consent",
        query: { 
          phone
         },
      });
    }
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
            <form
              onSubmit={handleSubmit(handleLogin)}
              onKeyDown={(e) => (e) => {
                if (e.code === "Enter") e.preventDefault();
              }}
            >
              <div className="mt-12 max-w-sm">
                <InputPhone
                  isReset={isReset}
                  setIsReset={setIsReset}
                  register={register("phone")}
                  errors={errors}
                  reset={reset}
                  setValue={setValue}
                />
              </div>

              <button className="keyta-button mt-24">Registrasi / Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
