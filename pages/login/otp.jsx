/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { COUNTRY_CODE } from "../../app/constant";
import { setPhoneCookie, setTokenCookie } from "../../app/cookies";
import { disableBack } from "../../app/utlis";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import {
  useSendMessageMutation,
  useVerifyMessageMutation,
} from "../../services/auth.service";
import { setAuthenticate } from "../../services/auth.slice";
import styles from "../../styles/Login.module.css";
const schema = yup.object({
  number1: yup.number().required().typeError(),
  number2: yup.number().required().typeError(),
  number3: yup.number().required().typeError(),
  number4: yup.number().required().typeError(),
  number5: yup.number().required().typeError(),
  number6: yup.number().required().typeError(),
  number7: yup.number().required().typeError(),
});

export default function OTP() {
  const timer = Date.now() + 60000;
  const [isSMS, setIsSMS] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
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

  useEffect(() => {
    // if(!authenticate?.user){
    //   router.push('/login')
    // }

    if (router?.query?.phone)
      sendMessage({
        type: "whatsapp",
        country_code: COUNTRY_CODE,
        phone: router.query.phone,
      });

    disableBack();
    return () => {};
  }, []);

  useEffect(() => {
    if (messageData.data && messageData.isSuccess)
      dispatch(setAuthenticate(messageData.data.data));
    return () => {};
  }, [messageData.isSuccess]);

  useEffect(() => {
    if (verifyData.data && verifyData.isSuccess) {
      dispatch(setAuthenticate(verifyData.data.data));
      setPhoneCookie(authenticate?.user?.phone);
      if (authenticate?.user?.shop_id) {
        setTokenCookie(verifyData.data.data.token);
        router.push("/dashboard");
        return;
      }
      router.push("registration-profile");
    }
    return () => {};
  }, [verifyData.isSuccess]);

  useEffect(() => {
    if (verifyData.isError) {
      setVerifyError(verifyData.error.data.meta.message);
    }
    return () => {};
  }, [verifyData.isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleVerify = async (data) => {
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
    sendMessage({
      type: "whatsapp",
      country_code: COUNTRY_CODE,
      phone: user.phone,
    });
    setCountdown(timer);
    setIsCountdown(true);
  };

  const handleSendSMS = async () => {
    const user = authenticate?.user;
    sendMessage({
      type: "sms",
      country_code: COUNTRY_CODE,
      phone: user.phone,
    });
    setCountdown(timer);
    setIsCountdown(true);
    setIsSMS(true);
  };

  // const handleChange = (event, inputName) => {
  //   setVerifyError("");
  //   if (event.target.value !== "")
  //     document.querySelector(`input[name=${inputName}]`).focus();
  // };

  function handleChange(value1, event) {
    setOtpState({ [value1]: event.target.value });
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 7) {
        elmnt.target.form.elements[next].focus();
      }
    }
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
              <strong>+62{router?.query?.phone?.substring(1)}</strong>
            </h5>

            <form onSubmit={handleSubmit(handleVerify)}>
              <div className="mt-12 flex flex-row gap-1">
                <input
                  type="text"
                  maxLength="1"
                  {...register("number1")}
                  className={`text-center w-[30px] ${
                    errors.number1 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  // onChange={(event) => handleChange(event, "number2")}
                  onChange={(e) => handleChange("number1", e)}
                  tabIndex="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
                  maxLength={1}
                  {...register("number7")}
                  className={`text-center w-[30px] ${
                    errors.number7 || verifyError
                      ? "material-input-error"
                      : "material-input"
                  }`}
                  onChange={(e) => handleChange("number7", e)}
                  tabIndex="7"
                  onKeyUp={(e) => inputfocus(e)}
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

              {verifyError !== "" && (
                <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
                  {verifyError}
                </a>
              )}

              <div className="text-[13px] mt-8">
                Belum dapat kode ?{" "}
                <span onClick={isSMS ? handleSendSMS : handleSendWhatsapp}>
                  <a
                    className={`underline  mr-1 ${
                      isCountdown ? "text-gray-300 " : "cursor-pointer"
                    } `}
                    disabled={isCountdown}
                  >
                    Kirim Ulang Kode
                  </a>
                </span>
                {/* <Countdown date={Date.now() + 10000} /> */}
                <Countdown
                  date={countdown}
                  renderer={({ hours, minutes, seconds, completed }) => {
                    let second = String(seconds).padStart(2, "0");
                    let minute = String(minutes).padStart(2, "0");
                    if (completed) {
                      setIsCountdown(false);
                      // Render a completed state
                      return "";
                    } else {
                      setIsCountdown(true);
                      // Render a countdown
                      return (
                        <span>
                          {minute}:{second}
                        </span>
                      );
                    }
                  }}
                />
              </div>
              {!isSMS && (
                <>
                  <div className="text-[12px] text-keytaPrimary mt-8">
                    Tidak punya Whatsapp?{" "}
                  </div>
                  <div
                    className="text-[16px] mt-2 cursor-pointer text-keytaDarkBlue font-[600]"
                    onClick={handleSendSMS}
                    disabled={isCountdown}
                  >
                    Kirim melalui SMS
                  </div>
                </>
              )}

              <button type="submit" className="keyta-button mt-12">
                Verifikasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
