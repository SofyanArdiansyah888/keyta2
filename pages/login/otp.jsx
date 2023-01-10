/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { COUNTRY_CODE } from "../../app/constant";
import { setPhoneCookie, setTokenCookie } from "../../app/cookies";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import {
  useSendMessageMutation,
  useVerifyMessageMutation,
} from "../../services/auth.service";
import { setAuthenticate } from "../../services/auth.slice";
import styles from "../../styles/Login.module.css";
import { isDesktop, isMobile } from "react-device-detect";
const schema = yup.object({
  number1: yup.number().required(),
  number2: yup.number().required(),
  number3: yup.number().required(),
  number4: yup.number().required(),
  number5: yup.number().required(),
  number6: yup.number().required(),
  number7: yup.number().required(),
});
const timer = 60;
export default function OTP() {
  const [isSMS, setIsSMS] = useState(false);
  const [countdown, setCountdown] = useState(timer);
  const [sendMessage, messageData] = useSendMessageMutation();
  const [sendVerify, verifyData] = useVerifyMessageMutation();
  const [verifyError, setVerifyError] = useState("");
  const [otpState, setOtpState] = useState({
    value: "",
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
    number7: "",
    disable: true,
  });
  const router = useRouter();

  const dispatch = useDispatch();
  let authenticate = useSelector((state) => state.authSlice?.authenticate);

  const handlePaste = (event) => {
    const text = event.clipboardData.getData("text");
    if (text.length === 7 && isDesktop) {
      setValue("number1", text[0]);
      setValue("number2", text[1]);
      setValue("number3", text[2]);
      setValue("number4", text[3]);
      setValue("number5", text[4]);
      setValue("number6", text[5]);
      setValue("number7", text[6]);
    }
  };

  useEffect(() => {
    if (router?.query?.phone && !authenticate.token) {
      sendMessage({
        type: "whatsapp",
        country_code: COUNTRY_CODE,
        phone: router.query.phone,
      });
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      let interval = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  useEffect(() => {
    if (messageData.data && messageData.isSuccess)
      dispatch(setAuthenticate(messageData.data.data));
    return () => {};
  }, [messageData.isSuccess]);

  useEffect(() => {
    if (verifyData.data && verifyData.isSuccess) {
      dispatch(setAuthenticate(verifyData.data.data));
      setPhoneCookie(authenticate?.user?.phone);
      setTokenCookie(verifyData?.data?.data?.token);

      if (authenticate?.user?.shop_id) {
        router.replace("/home");
        return;
      }
      router.replace("registration-profile");
    }
    return () => {};
  }, [verifyData.isSuccess]);

  useEffect(() => {
    if (verifyData.isError) {
      setVerifyError("Kode OTP yang Anda masukan salah");
    }
    return () => {};
  }, [verifyData.isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleVerify = async (data) => {
    setVerifyError("");
    const token = Object.values(data).reverse().toString().replaceAll(",", "");
    if (isSMS) {
      const authyId = authenticate?.authy_id_sms;
      sendVerify({
        type: "sms",
        authy_id: authyId,
        token,
      });
    } else {
      const authyId = authenticate?.authy_id;
      sendVerify({
        type: "whatsapp",
        authy_id: authyId,
        token,
      });
    }
  };

  const handleSendWhatsapp = async () => {
    const user = authenticate?.user;
    if (countdown === 0) {
      sendMessage({
        type: "whatsapp",
        country_code: COUNTRY_CODE,
        phone: user.phone,
      });
      setCountdown(timer);
    }
  };

  const handleSendSMS = async () => {
    const user = authenticate?.user;
    sendMessage({
      type: "sms",
      country_code: COUNTRY_CODE,
      phone: user.phone,
    });
    setCountdown(timer);
    setIsSMS(true);
  };

  function handleChange(value1, event) {
    if (/\d/.test(event.target.value))
      setOtpState({ [value1]: event.target.value });
    else {
      setValue(value1, "");
    }
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1 && isDesktop) {
        elmnt.target.form.elements[next].focus();
      }
      setValue(elmnt.target.name, "");
    } else {
      if (/\d/.test(elmnt.key)) {
        if (elmnt.target.name !== "number7" && getValues("number7") !== "")
          setValue(elmnt.target.name, elmnt.key);
        if (elmnt.target.name === "number7"){
          setValue(elmnt.target.name, elmnt.key);
        }

        const next = elmnt.target.tabIndex;
        if (next < 7 && isDesktop) {
          elmnt.target.form.elements[next].focus();
        }
      }
    }
  };

  const Timer = () => {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown - minutes * 60;
    function strPadLeft(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    return (
      <div disabled>
        {strPadLeft(minutes, "0", 2) + ":" + strPadLeft(seconds, "0", 2)}
      </div>
    );
  };

  return (
    <>
      <div id={styles.login}>
        {/* JUAL ONLINE SCREEN */}
        <MaskotScreen />
        <div className={styles.right_content}>
          <div className={styles.right_content_inner}>
            <img src="../images/keyta.svg" alt="Logo" />
            <h1>Verifikasi Nomor</h1>
            <h4 className="text-[14px] font-[700] my-2 text-keytaDark">
              Masukkan kode OTP
            </h4>
            <h5>
              Kode verifikasi telah kami kirim melalui{" "}
              {isSMS ? "SMS" : "Whatsapp"} ke{" "}
              <strong>+62{router?.query?.phone}</strong>
            </h5>

            <form onSubmit={handleSubmit(handleVerify)}>
              <div className="mt-12 flex flex-row gap-1">
                <input
                  type={isMobile ? "number" : "text"}
                  onPaste={handlePaste}
                  maxLength="1"
                  {...register("number1")}
                  className={`text-center w-[30px] ${
                    errors.number1 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number1", e)}
                  tabIndex="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number2")}
                  className={`text-center w-[30px] ${
                    errors.number2 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number2", e)}
                  tabIndex="2"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number3")}
                  className={`text-center w-[30px] ${
                    errors.number3 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number3", e)}
                  tabIndex="3"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number4")}
                  className={`text-center w-[30px] ${
                    errors.number4 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number4", e)}
                  tabIndex="4"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number5")}
                  className={`text-center w-[30px] ${
                    errors.number5 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number5", e)}
                  tabIndex="5"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number6")}
                  className={`text-center w-[30px] ${
                    errors.number6 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number6", e)}
                  tabIndex="6"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type={isMobile ? "number" : "text"}
                  maxLength={1}
                  {...register("number7")}
                  className={`text-center w-[30px] ${
                    errors.number7 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number7", e)}
                  tabIndex="7"
                  onKeyUp={(e) => {
                    inputfocus(e);
                    // if (/\d/.test(e.target.key)){
                    //
                    // }
                  }}
                />
              </div>
              {(errors.number1 ||
                errors.number2 ||
                errors.number3 ||
                errors.number4 ||
                errors.number5 ||
                errors.number6 ||
                errors.number7) && (
                <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
                  Kode harus diisi
                </a>
              )}

              {verifyError !== "" &&
                !(
                  errors.number1 ||
                  errors.number2 ||
                  errors.number3 ||
                  errors.number4 ||
                  errors.number5 ||
                  errors.number6 ||
                  errors.number7
                ) && (
                  <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
                    {verifyError}
                  </a>
                )}

              <div className="text-[13px] mt-8 flex">
                Belum dapat kode ?{" "}
                <span
                  onClick={isSMS ? handleSendSMS : handleSendWhatsapp}
                  className="ml-1"
                >
                  <button
                    type="button"
                    className={`underline  mr-1 ${
                      countdown > 0 ? "text-gray-300 " : "cursor-pointer"
                    } `}
                    disabled={countdown > 0}
                  >
                    Kirim Ulang Kode
                  </button>
                </span>
                <Timer />
              </div>
              {!isSMS && (
                <>
                  <div className="text-[12px] text-keytaPrimary mt-8">
                    Tidak punya Whatsapp?{" "}
                  </div>
                  <div
                    className="text-[16px] mt-2   text-keytaDarkBlue font-[600]"
                    disabled={countdown > 0}
                  >
                    <h1
                      className="cursor-pointer inline-block"
                      onClick={handleSendSMS}
                    >
                      Kirim melalui SMS
                    </h1>
                  </div>
                </>
              )}

              <button
                className="keyta-button mt-14  relative"
                disabled={verifyData.isLoading}
              >
                Verifikasi
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    verifyData.isLoading
                      ? "absolute left-4 top-[10px]"
                      : "hidden"
                  }`}
                >
                  <path
                    opacity="0.5"
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                    fill="black"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
