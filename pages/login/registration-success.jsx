/* eslint-disable @next/next/no-img-element */
import * as yup from "yup";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import styles from "../../styles/Login.module.css";

import { useRouter } from "next/router";
import { disableBack } from "../../app/utlis";
import { useEffect } from "react";
const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
});

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    disableBack();
  },[])


  return (
    <>
      <div id={styles.login}>
        {/* JUAL ONLINE SCREEN */}
        <MaskotScreen />

        <div className={styles.right_content}>
          <div className={styles.right_content_inner}>
            <img src="../images/keyta.svg" alt="Logo" />
            <img src="../icons/checkbox_keyta.svg" className="my-24" alt="Gambar Checkbox" />
            <h1>Selamat, Anda telah berhasil <br/> membuat akun keyta </h1>
            
            <h6 className="mt-2">Klik <strong> Lanjut </strong> untuk memulai berjualan di keyta</h6>
            <button className="keyta-button w-2/3 rounded-xl mt-16" onClick={() => {
              router.push("/home");
            }}>Lanjut</button>
          </div>
        </div>
      </div>
    </>
  );
}
