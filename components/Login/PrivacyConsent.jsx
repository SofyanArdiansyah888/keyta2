/* eslint-disable @next/next/no-img-element */
import * as TERMS from "../../utils/constant";
import MaskotScreen from "./MaskotScreen";
import styles from "../../styles/Login.module.css";
export default function PrivacyConsent({isPrivacyRead,setIsPrivacyRead}) {
  const handleLanjut = () => {
    setIsPrivacyRead(true)
  }
  return (
    <>
      <div className={styles.right_content_inner}>
        <img src="../images/keyta.svg" alt="Logo" />
        <h1>Kebijakan Privasi</h1>
        <p className="text-[12px] mt-12 text-keytaGrayMedium indent-6">{TERMS.TERMS}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.INFORMASI_PRIBADI_YANG_KAMI_KUMPULKAN}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PENGGUNAAN_INFORMASI_PRIBADI_YANG_KAMI_KUMPULKAN}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PEMBERIAN_INFORMASI_PRIBADI_YANG_KAMI_KUMPULKAN}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PENYIMPANAN_INFORMASI_PRIBADI}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.AKSES_DAN_KOREKSI_INFORMASI_PRIBADI}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.TEMPAT_KAMI_MENYIMPAN_INFORMASI_PRIBADI_ANDA}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.KEAMANAN_INFORMASI_PRIBADI_ANDA}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PERUBAHAN_ATAS_KEBIJAKAN_PRIVASI_INI}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PENGAKUAN_DAN_PERSETUJUAN}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.DATA_ANONIM}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.PLATFORM_PIHAK_KETIGA}</p>
        <p className="text-[12px] mt-4 text-keytaGrayMedium indent-6">{TERMS.CARA_HUBUNGI_KAMI}</p>
        <div className="flex items-center mt-12">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 accent-keytaPrimary "
          />
          <label
            htmlFor="link-checkbox"
            className="ml-2 my-2 text-[11px] font-bold text-gray-900 dark:text-gray-300"
          >
            Saya setuju dengan Kebijakan Privasi Keyta
          </label>
        </div>
        <button type="submit" className="keyta-button mt-12" onClick={handleLanjut}>
          Lanjut
        </button>
      </div>
    </>
  );
}
